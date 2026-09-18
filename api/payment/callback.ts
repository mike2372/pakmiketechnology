import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ToyyibPay sends POST callbacks
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ToyyibPay typically sends these fields in the callback body
    const { refno, status, reason, billcode, order_id, amount } = req.body;

    console.log(`Payment callback received for BillCode: ${billcode}, Status: ${status}`);

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    // Status 1 means successful payment
    if (status === '1' && resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: adminEmail,
          subject: `✅ Payment Successful: ${order_id || billcode}`,
          html: `
            <h2>Payment Successful!</h2>
            <p>ToyyibPay has confirmed a successful payment.</p>
            <ul>
              <li><strong>BillCode:</strong> ${billcode}</li>
              <li><strong>Order Ref (External No):</strong> ${order_id || 'N/A'}</li>
              <li><strong>Transaction Ref (RefNo):</strong> ${refno || 'N/A'}</li>
              <li><strong>Amount Paid:</strong> RM ${amount ? (parseFloat(amount)).toFixed(2) : 'N/A'}</li>
            </ul>
            <p>Please cross-reference this with your "Pending Order" emails to fulfill the order.</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send success callback email:', emailError);
      }
    } else {
      console.log(`Payment callback skipped email. Status: ${status}`);
    }

    // Acknowledge receipt of the webhook to ToyyibPay
    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error handling payment callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
