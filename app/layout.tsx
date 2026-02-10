import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const siteUrl = "https://kallittofashions.com"

export const metadata: Metadata = {
  title: {
    default: "Kallittos | Curated Thrift & New Denim \u2013 Jeans & Jackets",
    template: "%s | Kallittos Fashions",
  },
  description:
    "Kallittos Fashions \u2013 Shop curated thrift & brand-new mom jeans, wide-leg denim, and vintage jackets. Style meets sustainability. Premium denim delivered across Kenya. Order via M-PESA, WhatsApp, or online.",
  keywords: [
    "Thrift denim jackets", "Vintage Levi's jeans", "Women's thrift jeans Nairobi",
    "High-waisted denim pants", "Affordable denim jackets", "Second-hand denim store",
    "Distressed denim jeans", "Mom jeans thrifted", "Wide-leg denim trends",
    "Oversized denim jackets", "Premium thrift denim", "Quality jeans for women",
    "Denim dungarees", "Straight-leg vintage jeans", "Ripped denim collection",
    "Sustainable fashion Kenya", "Y2K denim style", "Streetwear denim outfits",
    "Retro denim aesthetic", "Slow fashion thrift", "Minimalist denim wardrobe",
    "90s vintage denim", "Baggy jeans trend 2026", "Curated thrift shop",
    "Eco-friendly denim fashion", "Edgy denim looks", "Classiccore denim basics",
    "Cargo denim pants", "Patchwork denim jackets", "Raw hem denim style",
    "Best thrift stores in Nairobi", "Online denim shop Kenya", "Thrift clothing CBD Nairobi",
    "Kallitto Fashions reviews", "Affordable fashion Nairobi", "Buy jeans online Kenya",
    "Thrifted denim bundles", "Fashionable denim for less", "Dynamic Mall thrift shops",
    "Kenya denim fashion brand", "Aesthetic denim outfits", "Pre-loved denim jackets",
    "Stylish jeans for ladies", "Gikomba premium thrift", "Affordable street fashion",
    "Trendy denim skirts", "Denim waistcoat vintage", "Dark wash denim jeans",
    "Light wash mom jeans", "Kallitto Fashions denim drop",
  ],
  authors: [
    { name: "Kallittos Fashions", url: "https://kallittofashions.com" },
    { name: "OnePlusAfrica Tech Solutions", url: "https://oneplusafrica.com/" },
  ],
  creator: "OnePlusAfrica Tech Solutions",
  publisher: "Kallittos Fashions",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Kallittos Fashions",
    title: "Kallittos | Curated Thrift & New Denim \u2013 Jeans & Jackets",
    description:
      "Shop curated thrift & brand-new mom jeans, wide-leg denim, vintage jackets. Style meets sustainability. Delivered across Kenya.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kallittos Fashions - Curated Thrift & New Denim Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kallittos | Curated Thrift & New Denim \u2013 Jeans & Jackets",
    description:
      "Shop curated thrift & brand-new mom jeans, wide-leg denim, and vintage jackets at Kallittos Fashions. Style meets sustainability.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=630&fit=crop"],
    creator: "@kallittos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "instagram:creator": "@kallittofashions",
    "tiktok:creator": "@kallittos",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="google-site-verification" content="FY2n9Zc_Z1exsOdQJ4xsDTMW_P-UBehhQPI_Ana4nCg" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="author" href="https://oneplusafrica.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "Kallittos Fashions",
              description: "Curated thrift & brand-new mom jeans, wide-leg denim, and vintage jackets. Style meets sustainability in Nairobi, Kenya.",
              url: "https://kallittofashions.com",
              telephone: "+254713809695",
              email: "info@kallitosfashion.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dynamic Mall, 2nd Floor, Room ML 96",
                addressLocality: "Nairobi CBD",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2864,
                longitude: 36.8172,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                "https://www.instagram.com/kallittofashions/",
                "https://www.tiktok.com/@kallittos",
              ],
              priceRange: "KES 1,000 - KES 5,000",
              image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=630&fit=crop",
              brand: {
                "@type": "Brand",
                name: "Kallittos Fashions",
              },
              founder: {
                "@type": "Organization",
                name: "OnePlusAfrica Tech Solutions",
                url: "https://oneplusafrica.com/",
              },
              paymentAccepted: "M-PESA, Cash on Delivery",
              currenciesAccepted: "KES",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <WishlistProvider><CartProvider>{children}</CartProvider></WishlistProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
