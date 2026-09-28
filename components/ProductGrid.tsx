import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../constants';
import { motion } from 'motion/react';

export const ProductGrid: React.FC = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    const qty = getQuantity(product.id);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    }, qty);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-400 text-4xl">📦</span>
                </div>
              )}
              
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300"
                whileHover={{ opacity: 1 }}
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                {product.description}
              </p>
              
              {/* Price and Quantity Selector */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Price</span>
                  <span className="text-2xl font-bold text-cyan-600">
                    RM{product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={getQuantity(product.id) <= 1}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-800 text-sm select-none">
                    {getQuantity(product.id)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded transition-colors font-bold text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddToCart(product)}
                className="w-full mt-4 bg-cyan-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-cyan-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-between"
              >
                <span>Add to Cart</span>
                <span className="text-xs bg-cyan-700 px-2 py-1 rounded font-semibold">
                  RM{(product.price * getQuantity(product.id)).toFixed(2)}
                </span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};