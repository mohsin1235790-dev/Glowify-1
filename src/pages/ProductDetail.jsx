import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const productsUrl = new URL('../data/products.json', import.meta.url)

// Displays detailed information for a single product resolved by slug.
const ProductDetail = () => {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [justAdded, setJustAdded] = useState(false)
  const addTimerRef = useRef(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(productsUrl)
        if (!response.ok) {
          throw new Error('Unable to load product details.')
        }
        const data = await response.json()
        const matchedProduct = data.find((item) => item.slug === slug)

        if (!matchedProduct) {
          setError('Product not found.')
        } else {
          setProduct(matchedProduct)
        }
      } catch (err) {
        setError(err.message || 'Unexpected error loading product.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  // Reset the add-to-cart feedback when the product changes.
  useEffect(() => {
    setJustAdded(false)
    if (addTimerRef.current) {
      clearTimeout(addTimerRef.current)
    }
  }, [slug])

  useEffect(() => {
    return () => {
      if (addTimerRef.current) {
        clearTimeout(addTimerRef.current)
      }
    }
  }, [])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product)
    setJustAdded(true)
    if (addTimerRef.current) {
      clearTimeout(addTimerRef.current)
    }
    addTimerRef.current = setTimeout(() => setJustAdded(false), 1500)
  }, [addToCart, product])

  return (
    <section className="page product-detail">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      {loading && <p className="status">Loading product...</p>}
      {!loading && error && <p className="status status--error">{error}</p>}

      {!loading && !error && product && (
        <article className="product-detail__content">
          <div className="product-detail__image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail__info">
            <h1>{product.name}</h1>
            <p className="product-detail__price">${product.price}</p>
            <p>{product.description}</p>
            <button
              className="button button--primary"
              onClick={handleAddToCart}
              disabled={justAdded}
            >
              {justAdded ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </article>
      )}
    </section>
  )
}

export default ProductDetail
