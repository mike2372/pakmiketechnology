import React from 'react';

interface PaymentSuccessProps {
  orderRef: string | null;
  onContinueShopping: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderRef, onContinueShopping }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your purchase from Pak Mike Technology.</p>
        </div>

        {orderRef && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Order Reference</p>
            <p className="font-mono font-medium text-gray-900">{orderRef}</p>
          </div>
        )}

        <div className="text-sm text-gray-500">
          We have received your order and will process it shortly. You can contact our support if you have any questions.
        </div>

        <button
          onClick={onContinueShopping}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
