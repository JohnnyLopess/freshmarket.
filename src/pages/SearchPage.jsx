import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchProducts } from '../services/api'
import { getProductImageUrl } from '../utils/imageUrl'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      if (!query) {
        setProducts([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await searchProducts(query)
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Buscando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {products.length > 0 
            ? `Resultados para "${query}" (${products.length})`
            : `Nenhum resultado para "${query}"`
          }
        </h1>

        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const photo = product.images?.[0] || ''
              const price = product.min_price_valid || product.prices?.[0]?.price || 0

              return (
                <Link
                  key={product.id}
                  to={`/produto/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={getProductImageUrl(photo, 'medium')}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-primary-600 font-bold">
                    R$ {price.toFixed(2)}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
