export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [{
  id: 'flux-one',
  name: 'Flux One',
  description: 'The daily operating system for teams that move fast.',
  priceInCents: 12900,
}]

export function getProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id)
}
