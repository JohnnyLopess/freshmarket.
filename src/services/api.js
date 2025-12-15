const BASE_URL = 'https://api.instabuy.com.br/apiv3'
const SUBDOMAIN = 'supermercado'

export async function getLayout() {
  const response = await fetch(`${BASE_URL}/layout?subdomain=${SUBDOMAIN}`)
  const data = await response.json()
  
  if (data.status === 'error') {
    throw new Error(data.message || 'Erro ao carregar layout')
  }
  
  return data.data
}

export async function getProduct(slug) {
  const response = await fetch(`${BASE_URL}/item?subdomain=${SUBDOMAIN}&slug=${slug}`)
  const data = await response.json()
  
  if (data.status === 'error') {
    throw new Error(data.message || 'Erro ao carregar produto')
  }
  
  return data.data?.[0] || null
}

export async function searchProducts(query) {
  const layout = await getLayout()
  const searchTerm = query.toLowerCase()
  
  const allProducts = [
    ...(layout.promo || []),
    ...(layout.collection_items || []).flatMap(c => c.items || [])
  ]
  
  const filtered = allProducts.filter(product => 
    product.name?.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm)
  )
  
  const uniqueProducts = filtered.reduce((acc, product) => {
    if (!acc.find(p => p.id === product.id)) {
      acc.push(product)
    }
    return acc
  }, [])
  
  return uniqueProducts
}
