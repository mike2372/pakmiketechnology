import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { checkoutData, cartItems, amount } = req.body;

    if (!checkoutData || !cartItems || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { name, email, phone, address, fulfillmentMethod, postcode } = checkoutData;

    if (!name || !email || !address) {
      return res.status(400).json({ error: 'Missing customer details' });
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const secretKey = process.env.TOYYIBPAY_SECRET_KEY;
    const categoryCode = process.env.TOYYIBPAY_CATEGORY_CODE;
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!secretKey || !categoryCode) {
      console.error('Missing ToyyibPay credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // ToyyibPay amount MUST be in cents (e.g., RM10 = 1000)
    const billAmount = Math.round(numericAmount * 100).toString();

    // Generate a unique order reference
    const orderRef = `ORD-${Date.now()}`;
    const description = `Order Payment - ${orderRef}`;

    const formData = new URLSearchParams();
    formData.append('userSecretKey', secretKey);
    formData.append('categoryCode', categoryCode);
    formData.append('billName', description);
    formData.append('billDescription', description);
    formData.append('billPriceSetting', '1');
    formData.append('billPayorInfo', '1');
    formData.append('billAmount', billAmount);
    
    // Pass the domain dynamically (support localhost or production)
    const origin = req.headers.origin || `https://${req.headers.host}`;
    
    // Redirect URL back to the frontend with query parameters
    formData.append('billReturnUrl', `${origin}/?status_id=1&orderRef=${orderRef}`);
    
    // Webhook URL that ToyyibPay will hit asynchronously
    formData.append('billCallbackUrl', `${origin}/api/payment/callback`);
    formData.append('billExternalReferenceNo', orderRef);
    formData.append('billTo', name);
    formData.append('billEmail', email);
    formData.append('billPhone', phone || '');
    formData.append('billSplitPayment', '0');
    formData.append('billSplitPaymentArgs', '');
    formData.append('billPaymentChannel', '2');
    formData.append('billContentEmail', 'Thank you for your purchase from Pak Mike Technology!');
    formData.append('billChargeToCustomer', '0');

    // Create the Bill in ToyyibPay
    const toyyibPayUrl = 'https://toyyibpay.com/index.php/api/createBill';
    
    const response = await fetch(toyyibPayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ToyyibPay API error:', errorText);
      return res.status(500).json({ error: 'Payment gateway error' });
    }

    const responseData = await response.json();

    if (!responseData || !Array.isArray(responseData) || responseData.length === 0) {
      console.error('Invalid ToyyibPay response:', responseData);
      return res.status(500).json({ error: 'Invalid payment gateway response' });
    }

    const billData = responseData[0];
    const billCode = billData.BillCode;

    if (!billCode) {
      console.error('BillCode not found in response:', billData);
      return res.status(500).json({ error: 'Failed to generate payment code' });
    }

    // Attempt to send a "Pending Order" email using Resend
    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);
        
        let cartHtml = '<ul>';
        cartItems.forEach((item: any) => {
          cartHtml += `<li>${item.quantity}x ${item.name} (RM ${(item.price * item.quantity).toFixed(2)})</li>`;
        });
        cartHtml += '</ul>';

        await resend.emails.send({
          from: 'onboarding@resend.dev', // Use standard resend dev email or custom domain
          to: adminEmail,
          subject: `Pending Order Created: ${orderRef}`,
          html: `
            <h2>New Order Pending Payment</h2>
            <p><strong>Order Ref:</strong> ${orderRef}</p>
            <p><strong>BillCode:</strong> ${billCode}</p>
            <p><strong>Total Amount:</strong> RM ${numericAmount.toFixed(2)}</p>
            
            <h3>Customer Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Postcode:</strong> ${postcode || 'N/A'}</p>
            <p><strong>Fulfillment Method:</strong> ${fulfillmentMethod}</p>

            <h3>Cart Items:</h3>
            ${cartHtml}
            
            <p><em>Note: This order is pending payment. You will receive another email when ToyyibPay confirms the payment.</em></p>
          `
        });
      } catch (emailError) {
        // We log the error but don't fail the checkout just because email failed
        console.error('Failed to send pending order email:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY or ADMIN_EMAIL is missing. Skipping email notification.');
    }

    return res.status(200).json({ 
      success: true, 
      billCode,
      paymentUrl: `https://toyyibpay.com/${billCode}`
    });

  } catch (error) {
    console.error('Error creating ToyyibPay bill:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}