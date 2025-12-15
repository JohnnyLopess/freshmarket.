import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLayout } from '../services/api'
import { getBannerUrl, getProductImageUrl } from '../utils/imageUrl'

function HomePage() {
  const [layout, setLayout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchLayout() {
      try {
        const data = await getLayout()
        setLayout(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLayout()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
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

  const banners = layout?.banners || []
  const promoProducts = layout?.promo || []
  const collections = layout?.collection_items || []

  const renderProductCard = (product) => {
    const photo = product.images?.[0] || ''
    const price = product.min_price_valid || product.prices?.[0]?.price || 0
    
    return (
      <Link
        key={product.id}
        to={`/produto/${product.slug}`}
        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex-shrink-0 w-48"
      >
        <img
          src={getProductImageUrl(photo, 'medium')}
          alt={product.name}
          className="w-full h-32 object-contain mb-4"
        />
        <h3 className="font-medium text-sm line-clamp-2 mb-2">
          {product.name}
        </h3>
        <p className="text-primary-600 font-bold">
          R$ {price.toFixed(2)}
        </p>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {banners.length > 0 && (
        <section className="mb-8">
          <div className="overflow-x-auto flex gap-4 p-4">
            {banners.filter(b => b.is_desktop).map((banner) => (
              <img
                key={banner.id}
                src={getBannerUrl(banner.image)}
                alt={banner.title || 'Banner'}
                className="w-full max-w-4xl h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>
      )}

      {promoProducts.length > 0 && (
        <section className="px-4 pb-8">
          <h2 className="text-2xl font-bold mb-4">🔥 Promoções</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {promoProducts.map(renderProductCard)}
          </div>
        </section>
      )}

      {collections.map((collection) => (
        <section key={collection.id} className="px-4 pb-8">
          <h2 className="text-xl font-bold mb-4">{collection.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {collection.items?.map(renderProductCard)}
          </div>
        </section>
      ))}
    </div>
  )
}

export default HomePage
