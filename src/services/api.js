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
