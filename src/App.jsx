import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import About from './pages/About'
import './App.css'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <main className="app-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// Core application shell containing navigation and page routing.
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
