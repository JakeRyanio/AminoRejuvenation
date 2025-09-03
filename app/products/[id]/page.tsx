import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/products/product-detail"
import { products } from "@/lib/products-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
