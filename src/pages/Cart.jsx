import { useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

// Cart page renders current cart state and allows removing items.
const Cart = () => {
  const { cart, removeFromCart } = useCart()

  // Memoize totals so we only recompute when cart contents actually change.
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )
  const hasItems = useMemo(() => cart.length > 0, [cart])

  const handleRemove = useCallback(
    (productId) => {
      removeFromCart(productId)
    },
    [removeFromCart],
  )

  return (
    <section className="page cart">
      <h1>Your Cart</h1>

      {!hasItems ? (
        <p className="status">Your cart is empty—discover something you love!</p>
      ) : (
        <>
          <ul className="cart-list">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h3>{item.name}</h3>
                    <p className="cart-item__meta">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="cart-summary">
            <p>Total</p>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
