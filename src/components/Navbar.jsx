import { Link } from 'react-router-dom'
import './Navbar.css'

// Simple reusable navigation bar.
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">Glowify</div>
      <nav className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

export default Navbar
