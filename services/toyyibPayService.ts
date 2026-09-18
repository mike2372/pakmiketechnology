import { CheckoutData, CartItem } from '../types';

interface ToyyibPayResponse {
  success: boolean;
  billCode?: string;
  paymentUrl?: string;
  error?: string;
}

export const createToyyibPayBill = async (
  checkoutData: CheckoutData,
  cartItems: CartItem[],
  totalAmount: number
): Promise<ToyyibPayResponse> => {
  try {
    const response = await fetch('/api/create-toyyibpay-bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkoutData,
        cartItems,
        amount: totalAmount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to create payment bill',
      };
    }

    const data = await response.json();
    return {
      success: true,
      billCode: data.billCode,
      paymentUrl: data.paymentUrl,
    };
  } catch (error) {
    console.error('Error calling ToyyibPay service:', error);
    return {
      success: false,
      error: 'Network error occurred',
    };
  }
};

export const redirectToToyyibPay = (billCode: string) => {
  // Redirect to production ToyyibPay payment page
  window.location.href = `https://toyyibpay.com/${billCode}`;
};