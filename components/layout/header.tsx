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
      <header className="sticky top-0 z-50 bg-brand-50/95 backdrop-blur-sm border-b border-brand-200 dark:bg-brand-900/90 dark:border-brand-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/transparent-logo.png"
                  alt="Amino Rejuvenation"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-serif font-medium text-brand-800 dark:text-brand-50">AMINO REJUVENATION</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                Home
              </Link>
              <Link href="/shop" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                Shop
              </Link>
              <Link href="/explore" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                Explore Products
              </Link>
              <Link href="/faq" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                FAQ
              </Link>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-brand-100 text-brand-700 dark:hover:bg-brand-800 dark:text-brand-100"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-400 text-brand-50 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-brand-700 hover:bg-brand-100 dark:text-brand-100 dark:hover:bg-brand-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-brand-200 pt-4 dark:border-brand-700">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                  Home
                </Link>
                <Link href="/shop" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                  Shop
                </Link>
                <Link href="/explore" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
                  Explore Products
                </Link>
                <Link href="/faq" className="text-brand-700 hover:text-brand-500 dark:text-brand-200 dark:hover:text-brand-50 transition-colors font-medium">
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
