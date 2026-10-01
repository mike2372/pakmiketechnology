import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutData, FulfillmentMethod } from '../types';
import { createToyyibPayBill, redirectToToyyibPay } from '../services/toyyibPayService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (data: CheckoutData) => void;
}

const DIRECT_INSTALLER_POSTCODES = [
  '12000',
  '12100',
  '12200',
  '12300',
  '12700',
  '12710',
  '12720',
  '12900',
  '13000',
  '13009',
  '13020',
  '13050',
  '13400',
  '13409',
  '13600',
  '13700',
  '13800',
  '14000',
  '14400',
  '14007',
  '14009',
  '14020',
  '14100',
  '14110',
  '14120',
  '14200',
  '14300',
  '14310',
  '14320',
];

const INSTALLATION_PRODUCT_IDS = [
  'ds-k1t323-existing-terminal-upgrading',
  'ds-k1t323-full-installation',
];

const FULFILLMENT_OPTIONS_DEFAULT = [
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

const FULFILLMENT_OPTIONS_INSTALLATION = [
  {
    id: 'direct_installer' as FulfillmentMethod,
    name: 'Direct Installer Delivery',
    description: 'Waived for installation packages — included in price',
    price: 0.00,
  },
];

const TIME_SLOT_OPTIONS: Array<{ id: 'morning' | 'afternoon'; name: string; window: string }> = [
  { id: 'morning', name: 'Morning', window: '9:00 AM – 1:00 PM' },
  { id: 'afternoon', name: 'Afternoon', window: '2:00 PM – 6:00 PM' },
];

const pad2 = (n: number) => n.toString().padStart(2, '0');
const toISODate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const getMinInstallationDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return toISODate(d);
};

const isSunday = (isoDate: string): boolean => {
  if (!isoDate) return false;
  const [y, m, day] = isoDate.split('-').map(Number);
  const d = new Date(y, m - 1, day);
  return d.getDay() === 0;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, getCartSubtotal, clearCart } = useCart();

  const hasInstallationProduct = cart.some(item =>
    INSTALLATION_PRODUCT_IDS.includes(item.id)
  );

  const fulfillmentOptions = hasInstallationProduct
    ? FULFILLMENT_OPTIONS_INSTALLATION
    : FULFILLMENT_OPTIONS_DEFAULT;

  const defaultFulfillmentMethod: FulfillmentMethod =
    fulfillmentOptions[0]?.id ?? 'standard_courier';

  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    fulfillmentMethod: defaultFulfillmentMethod,
    postcode: '',
    installationDate: '',
    installationTimeSlot: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postcodeError, setPostcodeError] = useState('');
  const [installationError, setInstallationError] = useState('');

  if (!isOpen) return null;

  const activeFulfillmentMethod = fulfillmentOptions.some(
    opt => opt.id === formData.fulfillmentMethod
  )
    ? formData.fulfillmentMethod
    : defaultFulfillmentMethod;

  const minInstallationDate = getMinInstallationDate();

  const installationFieldRequired = hasInstallationProduct;

  const validatePostcode = (postcode: string): boolean => {
    if (activeFulfillmentMethod !== 'direct_installer') return true;
    return DIRECT_INSTALLER_POSTCODES.includes(postcode);
  };

  const validateInstallation = (): { ok: boolean; error?: string } => {
    const { installationDate, installationTimeSlot } = formData;
    if (!installationFieldRequired) return { ok: true };
    if (!installationDate) return { ok: false, error: '⚠️ Please pick your preferred installation date.' };
    if (installationDate < minInstallationDate) {
      return { ok: false, error: '⚠️ Earliest available installation is 2 working days from today. Please pick a later date.' };
    }
    if (isSunday(installationDate)) {
      return { ok: false, error: '⚠️ No installations available on Sundays. Please pick a different date.' };
    }
    if (!installationTimeSlot) {
      return { ok: false, error: '⚠️ Please select a time slot (Morning or Afternoon).' };
    }
    return { ok: true };
  };

  const calculateTotal = () => {
    const subtotal = getCartSubtotal();
    const selectedFulfillment = fulfillmentOptions.find(opt => opt.id === activeFulfillmentMethod);
    const fulfillmentFee = selectedFulfillment?.price || 0;
    return subtotal + fulfillmentFee;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'postcode' || name === 'fulfillmentMethod') {
      setPostcodeError('');
    }
    if (name === 'installationDate' || name === 'installationTimeSlot') {
      setInstallationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeFulfillmentMethod === 'direct_installer') {
      if (!validatePostcode(formData.postcode || '')) {
        setPostcodeError('⚠️ Sorry! Postcode outside our designated installation/delivery area.');
        return;
      }
    }

    const installCheck = validateInstallation();
    if (!installCheck.ok) {
      setInstallationError(installCheck.error || '⚠️ Please complete the installation details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const checkoutPayload: CheckoutData = {
        ...formData,
        fulfillmentMethod: activeFulfillmentMethod,
      };

      const total = calculateTotal();
      const paymentResponse = await createToyyibPayBill(
        checkoutPayload,
        cart,
        total
      );

      if (!paymentResponse.success) {
        console.error('Payment creation failed:', paymentResponse.error);
        alert(`Payment failed: ${paymentResponse.error}`);
        return;
      }

      await onCheckout(checkoutPayload);
      
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
    (activeFulfillmentMethod === 'direct_installer' && !validatePostcode(formData.postcode || '')) ||
    (installationFieldRequired && !validateInstallation().ok);

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
              <span>{fulfillmentOptions.find(opt => opt.id === activeFulfillmentMethod)?.name}</span>
              <span>RM{(fulfillmentOptions.find(opt => opt.id === activeFulfillmentMethod)?.price || 0).toFixed(2)}</span>
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
                {fulfillmentOptions.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      activeFulfillmentMethod === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillmentMethod"
                      value={option.id}
                      checked={activeFulfillmentMethod === option.id}
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
              {activeFulfillmentMethod === 'direct_installer' && (
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

            {/* Installation Date & Time Slot - always visible, optional for DIY / required for installs */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <span>📅</span>
                Pick Your Installation Date
                {!installationFieldRequired && (
                  <span className="text-xs font-normal text-gray-400 ml-1">(optional for DIY)</span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1`}>
                    Preferred Date
                    {installationFieldRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type="date"
                    name="installationDate"
                    min={minInstallationDate}
                    value={formData.installationDate || ''}
                    onChange={handleInputChange}
                    required={installationFieldRequired}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      installationError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Slot
                    {installationFieldRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOT_OPTIONS.map(slot => (
                      <label
                        key={slot.id}
                        className={`flex flex-col items-start p-2.5 border rounded-lg cursor-pointer transition-colors ${
                          formData.installationTimeSlot === slot.id
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="installationTimeSlot"
                          value={slot.id}
                          checked={formData.installationTimeSlot === slot.id}
                          onChange={handleInputChange}
                          className="sr-only"
                          disabled={isSubmitting}
                        />
                        <span className="font-semibold text-sm">{slot.name}</span>
                        <span className="text-xs text-gray-500">{slot.window}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="text-xs text-gray-500 space-y-0.5 list-disc pl-5">
                <li>Earliest available date = <strong className="text-gray-700">2 days</strong> from today (minimum lead time).</li>
                <li>No installations available on <strong className="text-gray-700">Sundays</strong>.</li>
                {installationFieldRequired ? (
                  <li>Both <strong className="text-gray-700">date + time slot</strong> are required before payment.</li>
                ) : (
                  <li>Optional for DIY products — leave blank if you don't need installation help.</li>
                )}
              </ul>

              {installationError && (
                <p className="text-red-500 text-sm mt-1">{installationError}</p>
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