import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from './CheckoutModal';
import { CheckoutData, Product } from '../types';

export const CartExample: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartSubtotal, getCartItemCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = async (data: CheckoutData) => {
    console.log('Checkout data:', data);
    // You can add additional processing here if needed
    // The payment redirect is handled in CheckoutModal
  };

  // Example items for testing
  const sampleProducts: Product[] = [
    { id: '1', name: 'Security Camera System', price: 299.00, description: '4-camera HD system' },
    { id: '2', name: 'Smart Door Lock', price: 150.00, description: 'Biometric lock' },
    { id: '3', name: 'Motion Sensor', price: 45.00, description: 'PIR sensor' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart Example</h1>
      
      {/* Sample Products */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sample Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="font-bold mb-3">RM{product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Display */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Shopping Cart ({getCartItemCount()} items)
        </h2>
        
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="border rounded-lg p-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">RM{item.price.toFixed(2)}</p>
                  {item.description && <p className="text-gray-500 text-xs">{item.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal:</span>
                <span>RM{getCartSubtotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};