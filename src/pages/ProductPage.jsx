import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/api'
import { getProductImageUrl } from '../utils/imageUrl'

function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(slug)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Produto não encontrado</p>
      </div>
    )
  }

  const photo = product.images?.[0] || ''
  const price = product.min_price_valid || product.prices?.[0]?.price || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="text-primary-600 hover:underline mb-4 inline-block">
          ← Voltar
        </Link>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={getProductImageUrl(photo, 'large')}
                alt={product.name}
                className="w-full h-80 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              
              <p className="text-3xl text-primary-600 font-bold mb-6">
                R$ {price.toFixed(2)}
              </p>

              {product.description && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Descrição</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
