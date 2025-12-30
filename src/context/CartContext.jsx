import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

// Provides cart state (items + actions) to the component tree.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Memoize handlers so components consuming the context don't re-render unnecessarily.
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prevCart, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }, [])

  // Memoize the value object so it only changes when underlying data/handlers change.
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
    }),
    [cart, addToCart, removeFromCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Convenience hook to access the cart context safely.
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
