import React, { useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { CheckoutModal } from './CheckoutModal';
import { useCart } from '../context/CartContext';
import { ShoppingCart, X } from 'lucide-react';
import { CheckoutData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const ShopSection: React.FC = () => {
  const { cart, getCartSubtotal, getCartItemCount, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = async (data: CheckoutData) => {
    console.log('Checkout data:', data);
    // Additional processing if needed
  };

  return (
    <>
      {/* Fixed Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 z-50 p-4 bg-white text-cyan-600 rounded-full hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl border-2 border-cyan-600"
      >
        <ShoppingCart className="w-6 h-6" />
        {getCartItemCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
            {getCartItemCount()}
          </span>
        )}
      </button>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Security Shop</h2>
          <p className="text-gray-600">Professional security and electrical solutions for your home and business</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ProductGrid />
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">Shopping Cart ({getCartItemCount()})</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">RM{item.price.toFixed(2)}</p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            )}
                            <p className="text-sm font-medium text-cyan-600 mt-1">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">
                              RM{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Subtotal:</span>
                      <span>RM{getCartSubtotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear your cart?')) {
                          clearCart();
                        }
                      }}
                      className="w-full text-gray-600 py-2 hover:text-red-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  );
};