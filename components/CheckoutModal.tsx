import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutData, FulfillmentMethod } from '../types';
import { createToyyibPayBill, redirectToToyyibPay } from '../services/toyyibPayService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (data: CheckoutData) => void;
}

const DIRECT_INSTALLER_POSTCODES = ['14100', '14000', '11900', '13600'];

const FULFILLMENT_OPTIONS = [
  {
    id: 'standard_courier' as FulfillmentMethod,
    name: 'Standard Courier Shipping',
    description: 'Nationwide delivery',
    price: 15.00,
  },
  {
    id: 'self_pickup' as FulfillmentMethod,
    name: 'Self-Pickup',
    description: 'Free collection from Penang HQ',
    price: 0.00,
  },
  {
    id: 'direct_installer' as FulfillmentMethod,
    name: 'Direct Installer Delivery',
    description: 'Premium drop-off service',
    price: 30.00,
  },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, getCartSubtotal, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    fulfillmentMethod: 'standard_courier',
    postcode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postcodeError, setPostcodeError] = useState('');

  if (!isOpen) return null;

  const validatePostcode = (postcode: string): boolean => {
    if (formData.fulfillmentMethod !== 'direct_installer') return true;
    return DIRECT_INSTALLER_POSTCODES.includes(postcode);
  };

  const calculateTotal = () => {
    const subtotal = getCartSubtotal();
    const selectedFulfillment = FULFILLMENT_OPTIONS.find(opt => opt.id === formData.fulfillmentMethod);
    const fulfillmentFee = selectedFulfillment?.price || 0;
    return subtotal + fulfillmentFee;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'postcode' || name === 'fulfillmentMethod') {
      setPostcodeError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.fulfillmentMethod === 'direct_installer') {
      if (!validatePostcode(formData.postcode || '')) {
        setPostcodeError('⚠️ Sorry! Postcode outside our designated installation/delivery area. Please choose standard courier or self-pickup.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Create ToyyibPay bill
      const total = calculateTotal();
      const paymentResponse = await createToyyibPayBill(
        formData,
        cart,
        total
      );

      if (!paymentResponse.success) {
        console.error('Payment creation failed:', paymentResponse.error);
        alert(`Payment failed: ${paymentResponse.error}`);
        return;
      }

      // Call the original checkout handler for any additional processing
      await onCheckout(formData);
      
      // Redirect to ToyyibPay
      if (paymentResponse.billCode) {
        redirectToToyyibPay(paymentResponse.billCode);
      }
      
      clearCart();
      onClose();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCheckoutDisabled = isSubmitting || 
    (formData.fulfillmentMethod === 'direct_installer' && !validatePostcode(formData.postcode || ''));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          {/* Cart Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span>RM{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 font-semibold">
              <span>Subtotal</span>
              <span>RM{getCartSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>{FULFILLMENT_OPTIONS.find(opt => opt.id === formData.fulfillmentMethod)?.name}</span>
              <span>RM{(FULFILLMENT_OPTIONS.find(opt => opt.id === formData.fulfillmentMethod)?.price || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-bold border-t">
              <span>Total</span>
              <span>RM{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Personal Information</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Fulfillment Method */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Fulfillment Method</h3>
              <div className="space-y-3">
                {FULFILLMENT_OPTIONS.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.fulfillmentMethod === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillmentMethod"
                      value={option.id}
                      checked={formData.fulfillmentMethod === option.id}
                      onChange={handleInputChange}
                      className="mr-3"
                      disabled={isSubmitting}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                    <div className="font-semibold">
                      {option.price === 0 ? 'FREE' : `RM${option.price.toFixed(2)}`}
                    </div>
                  </label>
                ))}
              </div>

              {/* Postcode validation for Direct Installer Delivery */}
              {formData.fulfillmentMethod === 'direct_installer' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Postcode *</label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="5-digit postcode (e.g., 14100)"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      postcodeError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {postcodeError && (
                    <p className="text-red-500 text-sm mt-1">{postcodeError}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Available postcodes: {DIRECT_INSTALLER_POSTCODES.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCheckoutDisabled}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isCheckoutDisabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Processing...' : `Pay RM${calculateTotal().toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};