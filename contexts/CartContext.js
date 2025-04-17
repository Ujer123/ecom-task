// contexts/CartContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { user } = useAuth()

  // Load cart from localStorage
  useEffect(() => {
    const cartKey = user ? `cart-${user.id}` : 'cart'
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || []
    setCart(savedCart)
  }, [user])

  // Save cart to localStorage
  useEffect(() => {
    const cartKey = user ? `cart-${user.id}` : 'cart'
    localStorage.setItem(cartKey, JSON.stringify(cart))
  }, [cart, user])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        )
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    setCart(prev => {
      if (newQuantity <= 0) {
        return prev.filter(item => item.id !== productId)
      }
      return prev.map(item => 
        item.id === productId ? {...item, quantity: newQuantity} : item
      )
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)