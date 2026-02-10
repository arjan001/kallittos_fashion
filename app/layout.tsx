import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const siteUrl = "https://kallitosfashion.com"

export const metadata: Metadata = {
  title: {
    default: "Kallitos Fashion | Thrift & New Denim - Jeans, Jackets & More",
    template: "%s | Kallitos Fashion",
  },
  description:
    "Shop curated thrift and brand-new denim at Kallitos Fashion. Jeans, jackets, dungarees, shorts and more delivered across Kenya. Order via WhatsApp or online.",
  keywords: [
    "Kallitos Fashion", "thrift jeans Kenya", "denim shop Nairobi",
    "affordable jeans", "mom jeans", "skinny jeans", "wide leg jeans",
    "denim jackets", "dungarees", "thrift fashion Kenya", "online jeans store",
    "WhatsApp order Kenya", "secondhand denim", "brand new jeans",
  ],
  authors: [{ name: "Kallitos Fashion" }],
  creator: "Kallitos Fashion",
  publisher: "Kallitos Fashion",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Kallitos Fashion",
    title: "Kallitos Fashion | Thrift & New Denim",
    description:
      "Curated thrift and brand-new denim pieces. Jeans, jackets, dungarees, shorts delivered across Kenya.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kallitos Fashion - Denim Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kallitos Fashion | Thrift & New Denim",
    description:
      "Shop curated thrift and new denim at Kallitos Fashion. Delivered across Kenya.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=630&fit=crop"],
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
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
