import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { useCart } from '@/contexts/CartContext'

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()
  return { props: { products } }
}

export default function Home({ products }) {
  const { addToCart } = useCart()

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"
    >
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </motion.div>
  )
}