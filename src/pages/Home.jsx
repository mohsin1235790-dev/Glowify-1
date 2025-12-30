import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

// URL helper so Vite can serve the local JSON file during fetch calls.
const productsUrl = new URL('../data/products.json', import.meta.url)

// Home page responsible for fetching and rendering featured products.
const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(productsUrl)
        if (!response.ok) {
          throw new Error('Unable to load products right now.')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Unexpected error loading products.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="page home">
      <header className="home__intro">
        <p className="eyebrow">New • AW Collection</p>
        <h1>Discover glow-forward essentials crafted for modern routines.</h1>
        <p className="lede">
          Curated textures and fragrances to elevate every ritual—shop our
          favorite picks below.
        </p>
      </header>

      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status status--error">{error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
