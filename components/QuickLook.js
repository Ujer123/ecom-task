// components/QuickLook.js
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

export default function QuickLook({ product, onClose }) {
  // close on Escape
  useEffect(() => {
    const handleKeyDown = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={e => {
          // only close if the click target *is* the backdrop
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 relative"
          onClick={e => e.stopPropagation()}   // prevent backdrop-click when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 text-2xl"
          >
            &times;
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Image
                src={product.images?.[currentImage] || product.image}
                alt={product.title}
                width={600}
                height={600}
                className="rounded-lg object-contain h-64"
                priority
              />
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-16 h-16 rounded border-2 transition-colors ${
                      i === currentImage 
                        ? 'border-blue-500' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${i + 1}`}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="overflow-y-auto max-h-[70vh]">
              <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>
              <div className="text-xl font-bold mb-4">${product.price}</div>
              <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
