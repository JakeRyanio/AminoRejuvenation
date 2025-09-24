import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart/cart-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartPopupWrapper } from "@/components/cart/cart-popup-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aminorejuvenation.com'),
  title: "Amino Rejuvenation | Premium Health & Wellness Solutions",
  description: "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
  keywords: "health wellness, amino acids, rejuvenation, wellness solutions, health products, premium supplements, wellness journey",
  generator: 'v0.dev',
  icons: {
    apple: '/images/transparent-logo.png',
    icon: '/images/transparent-logo.png',
  },
  openGraph: {
    title: "Amino Rejuvenation | Premium Health & Wellness Solutions",
    description: "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
    url: "https://aminorejuvenation.com",
    siteName: "Amino Rejuvenation",
    type: "website",
    images: [
      {
        url: "/images/transparent-logo.png",
        width: 1200,
        height: 630,
        alt: "Amino Rejuvenation - Premium Health & Wellness Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Amino Rejuvenation | Premium Health & Wellness Solutions",
    description: "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
    images: ["/images/transparent-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // You'll need to add this
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Amino Rejuvenation",
              "url": "https://aminorejuvenation.com",
              "logo": "https://aminorejuvenation.com/images/transparent-logo.png",
              "description": "Premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
                "email": "aminorejuvenation@gmail.com"
              },
              "sameAs": []
            })
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Amino Rejuvenation",
              "url": "https://aminorejuvenation.com",
              "description": "Premium health and wellness solutions for optimal well-being",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aminorejuvenation.com/shop?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-brand-50 text-brand-900 min-h-screen`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartPopupWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
