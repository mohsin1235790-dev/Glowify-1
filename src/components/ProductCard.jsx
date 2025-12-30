import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProductCard.css'

// Displays a single product summary that links to the detail view.
const ProductCard = ({ product }) => {
  const { name, price, image, slug } = product
  const MotionLink = motion(Link)

  return (
    <MotionLink
      to={`/product/${slug}`}
      className="product-card"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="product-card__image-wrapper">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3>{name}</h3>
        <p className="product-card__price">${price}</p>
      </div>
    </MotionLink>
  )
}

export default ProductCard
