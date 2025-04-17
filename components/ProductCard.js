// components/ProductCard.js
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Image from 'next/image';
import QuickLook from './QuickLook';
import { useState, useEffect } from 'react';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.id === product.id);
  const [showQuickLook, setShowQuickLook] = useState(false);

  useEffect(() => {
    if (showQuickLook) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showQuickLook]);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg relative"
    >
      <Image 
        width={200}
        height={200}
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain"
      />
      <h3 className="text-lg font-bold mt-2 truncate">{product.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
      
        {showQuickLook && (
        <QuickLook
          product={product}
          onClose={() => setShowQuickLook(false)}
        />
      )}
      
      {cartItem ? (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            -
          </button>
          <span className="px-4">{cartItem.quantity}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )}
       <button
        onClick={() => setShowQuickLook(true)}
        className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Quick view"
      >
        👀 Quick Look
      </button>
    </motion.div>
  );
}