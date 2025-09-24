import type { Product } from './products-data'

// Utility functions for product operations
export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  if (category === 'All') return products
  return products.filter(product => product.category === category)
}

export function searchProducts(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm.trim()) return products
  
  const term = searchTerm.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.overview.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  )
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-high':
      return [...products].sort((a, b) => b.price - a.price)
    case 'rating':
      return [...products].sort((a, b) => b.reviews.rating - a.reviews.rating)
    case 'name':
    default:
      // Custom sorting: by peptide name first, then by dosage
      return [...products].sort((a, b) => {
        const getPeptideName = (name: string) => name.split(' (')[0]
        const getDosage = (name: string) => {
          const match = name.match(/\((\d+(?:\.\d+)?)(mg|ml|IU|mcg)?\)/)
          if (match) {
            return parseFloat(match[1])
          }
          return 0
        }

        const peptideA = getPeptideName(a.name)
        const peptideB = getPeptideName(b.name)

        if (peptideA !== peptideB) {
          return peptideA.localeCompare(peptideB)
        }

        return getDosage(a.name) - getDosage(b.name)
      })
  }
}

export function getFeaturedProducts(products: Product[], limit: number = 6): Product[] {
  return products
    .filter(product => product.reviews.rating >= 4.5)
    .sort((a, b) => b.reviews.rating - a.reviews.rating)
    .slice(0, limit)
}

export function getRelatedProducts(products: Product[], currentProduct: Product, limit: number = 4): Product[] {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      product.category === currentProduct.category
    )
    .slice(0, limit)
}

export function formatProductPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function getProductSlug(product: Product): string {
  return product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function validateProductData(product: Partial<Product>): boolean {
  return !!(
    product.id &&
    product.name &&
    product.price &&
    product.price > 0 &&
    product.category &&
    product.image
  )
}
