"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#201c1a]/95 backdrop-blur-sm border-b border-[#403c3a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/precision-peptides-monogram.png"
                  alt="Precision Peptides"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-serif font-medium text-[#ebe7e4]">PRECISION PEPTIDES</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                Home
              </Link>
              <Link href="/shop" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                Shop
              </Link>
              <Link href="/explore" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                Explore Peptides
              </Link>
              <Link href="/faq" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                FAQ
              </Link>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-[#403c3a] text-[#ebe7e4]"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d2c6b8] text-[#201c1a] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#ebe7e4] hover:bg-[#403c3a]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-[#403c3a] pt-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                  Home
                </Link>
                <Link href="/shop" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                  Shop
                </Link>
                <Link href="/explore" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                  Explore Peptides
                </Link>
                <Link href="/faq" className="text-[#ebe7e4] hover:text-[#d2c6b8] transition-colors font-medium">
                  FAQ
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
