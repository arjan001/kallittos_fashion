import type { Product, Category, Offer, DeliveryLocation } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Dresses",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    productCount: 24,
  },
  {
    id: "2",
    name: "Tops",
    slug: "tops",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
    productCount: 18,
  },
  {
    id: "3",
    name: "Bodysuits",
    slug: "bodysuits",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    productCount: 12,
  },
  {
    id: "4",
    name: "Jackets",
    slug: "jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    productCount: 15,
  },
  {
    id: "5",
    name: "Jewellery",
    slug: "jewellery",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d938830a?w=400&h=500&fit=crop",
    productCount: 30,
  },
  {
    id: "6",
    name: "Bags & Purses",
    slug: "bags-purses",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
    productCount: 10,
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Satin Wrap Dress",
    slug: "elegant-satin-wrap-dress",
    price: 3500,
    originalPrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    ],
    category: "Dresses",
    categorySlug: "dresses",
    description: "A stunning satin wrap dress perfect for evening events. Features a flattering V-neckline, adjustable waist tie, and flowy silhouette. This timeless piece transitions effortlessly from dinner to cocktails.",
    variations: [
      { type: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { type: "Color", options: ["Blush Pink", "Black", "Emerald"] },
    ],
    tags: ["evening", "elegant", "satin"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 36,
    inStock: true,
    createdAt: "2025-12-01",
  },
  {
    id: "2",
    name: "Floral Print Mini Dress",
    slug: "floral-print-mini-dress",
    price: 2800,
    originalPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    ],
    category: "Dresses",
    categorySlug: "dresses",
    description: "Charming floral print mini dress with spaghetti straps and a ruffled hem. Lightweight fabric perfect for warm days and casual outings.",
    variations: [
      { type: "Size", options: ["S", "M", "L"] },
    ],
    tags: ["casual", "floral", "summer"],
    isNew: true,
    isOnOffer: true,
    offerPercentage: 12,
    inStock: true,
    createdAt: "2026-01-15",
  },
  {
    id: "3",
    name: "Classic Black Bodysuit",
    slug: "classic-black-bodysuit",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    ],
    category: "Bodysuits",
    categorySlug: "bodysuits",
    description: "Sleek black bodysuit with a scoop neckline and snap button closure. A wardrobe essential that pairs with everything from jeans to skirts.",
    variations: [
      { type: "Size", options: ["XS", "S", "M", "L", "XL"] },
    ],
    tags: ["essential", "black", "bodysuit"],
    isNew: true,
    isOnOffer: false,
    inStock: true,
    createdAt: "2026-02-01",
  },
  {
    id: "4",
    name: "Oversized Linen Blazer",
    slug: "oversized-linen-blazer",
    price: 4200,
    originalPrice: 5800,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    ],
    category: "Jackets",
    categorySlug: "jackets",
    description: "Effortlessly chic oversized linen blazer. Features padded shoulders, single-button closure, and front flap pockets. Perfect for layering over any outfit.",
    variations: [
      { type: "Size", options: ["S", "M", "L"] },
      { type: "Color", options: ["Beige", "Charcoal", "White"] },
    ],
    tags: ["blazer", "oversized", "linen"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 28,
    inStock: true,
    createdAt: "2025-11-20",
  },
  {
    id: "5",
    name: "Ribbed Crop Top",
    slug: "ribbed-crop-top",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&h=800&fit=crop",
    ],
    category: "Tops",
    categorySlug: "tops",
    description: "Comfortable ribbed crop top with a modern fit. Made from soft, stretchy cotton blend fabric. Ideal for layering or wearing on its own.",
    variations: [
      { type: "Size", options: ["XS", "S", "M", "L"] },
      { type: "Color", options: ["White", "Black", "Grey", "Nude"] },
    ],
    tags: ["crop", "ribbed", "casual"],
    isNew: true,
    isOnOffer: false,
    inStock: true,
    createdAt: "2026-01-28",
  },
  {
    id: "6",
    name: "Gold Layered Necklace Set",
    slug: "gold-layered-necklace-set",
    price: 2200,
    originalPrice: 3000,
    images: [
      "https://images.unsplash.com/photo-1515562141589-67f0d938830a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop",
    ],
    category: "Jewellery",
    categorySlug: "jewellery",
    description: "Delicate gold layered necklace set featuring three chains of varying lengths. Each chain has a unique pendant design. Perfect for adding elegance to any outfit.",
    variations: [
      { type: "Metal", options: ["Gold", "Silver", "Rose Gold"] },
    ],
    tags: ["necklace", "gold", "layered"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 27,
    inStock: true,
    createdAt: "2025-12-15",
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 3800,
    originalPrice: 4500,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
    ],
    category: "Bags & Purses",
    categorySlug: "bags-purses",
    description: "Minimalist leather crossbody bag with adjustable strap. Features multiple interior compartments and a secure magnetic closure. Compact yet spacious.",
    variations: [
      { type: "Color", options: ["Black", "Tan", "Burgundy"] },
    ],
    tags: ["bag", "leather", "crossbody"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 16,
    inStock: true,
    createdAt: "2025-11-10",
  },
  {
    id: "8",
    name: "Silk Camisole Top",
    slug: "silk-camisole-top",
    price: 2400,
    images: [
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop",
    ],
    category: "Tops",
    categorySlug: "tops",
    description: "Luxurious silk camisole top with delicate lace trim. Features adjustable spaghetti straps and a relaxed fit. Effortlessly elegant for day or night.",
    variations: [
      { type: "Size", options: ["XS", "S", "M", "L"] },
      { type: "Color", options: ["Champagne", "Black", "Ivory"] },
    ],
    tags: ["silk", "camisole", "elegant"],
    isNew: true,
    isOnOffer: false,
    inStock: true,
    createdAt: "2026-02-05",
  },
  {
    id: "9",
    name: "Tweed Button Jacket",
    slug: "tweed-button-jacket",
    price: 4800,
    originalPrice: 6500,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    ],
    category: "Jackets",
    categorySlug: "jackets",
    description: "Sophisticated tweed button jacket with gold-tone buttons and fringe trim. Features structured shoulders and a cropped length. A statement piece for any fashion-forward wardrobe.",
    variations: [
      { type: "Size", options: ["S", "M", "L"] },
    ],
    tags: ["tweed", "jacket", "statement"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 26,
    inStock: true,
    createdAt: "2025-10-20",
  },
  {
    id: "10",
    name: "Asymmetric Hem Skirt",
    slug: "asymmetric-hem-skirt",
    price: 2600,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    ],
    category: "Dresses",
    categorySlug: "dresses",
    description: "Modern asymmetric hem skirt with a high-waist fit. Made from flowing fabric that drapes beautifully. A versatile piece for both casual and dressy occasions.",
    variations: [
      { type: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { type: "Color", options: ["Black", "White", "Navy"] },
    ],
    tags: ["skirt", "asymmetric", "modern"],
    isNew: true,
    isOnOffer: false,
    inStock: true,
    createdAt: "2026-01-10",
  },
  {
    id: "11",
    name: "Pearl Drop Earrings",
    slug: "pearl-drop-earrings",
    price: 1500,
    originalPrice: 2000,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515562141589-67f0d938830a?w=600&h=800&fit=crop",
    ],
    category: "Jewellery",
    categorySlug: "jewellery",
    description: "Elegant pearl drop earrings with gold-plated hooks. Classic design that adds sophistication to any outfit. Lightweight and comfortable for all-day wear.",
    variations: [
      { type: "Metal", options: ["Gold", "Silver"] },
    ],
    tags: ["earrings", "pearl", "elegant"],
    isNew: false,
    isOnOffer: true,
    offerPercentage: 25,
    inStock: true,
    createdAt: "2025-12-20",
  },
  {
    id: "12",
    name: "Off-Shoulder Knit Top",
    slug: "off-shoulder-knit-top",
    price: 1600,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&h=800&fit=crop",
    ],
    category: "Tops",
    categorySlug: "tops",
    description: "Cozy off-shoulder knit top with a relaxed slouchy fit. Soft ribbed fabric in a versatile solid color. Perfect for transitional weather layering.",
    variations: [
      { type: "Size", options: ["S", "M", "L", "XL"] },
      { type: "Color", options: ["Cream", "Black", "Dusty Rose"] },
    ],
    tags: ["knit", "off-shoulder", "cozy"],
    isNew: true,
    isOnOffer: false,
    inStock: true,
    createdAt: "2026-02-08",
  },
]

export const offers: Offer[] = [
  {
    id: "1",
    title: "New Season Sale",
    description: "Get up to 40% off on all new arrivals. Limited time only!",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    validUntil: "2026-03-15",
  },
  {
    id: "2",
    title: "Bundle & Save",
    description: "Buy any 3 items and get the cheapest one free.",
    discount: "BUY 2 GET 1",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    validUntil: "2026-02-28",
  },
]

export const deliveryLocations: DeliveryLocation[] = [
  { id: "1", name: "Nairobi CBD", fee: 200, estimatedDays: "Same day" },
  { id: "2", name: "Westlands", fee: 250, estimatedDays: "Same day" },
  { id: "3", name: "Karen", fee: 350, estimatedDays: "1-2 days" },
  { id: "4", name: "Kiambu", fee: 400, estimatedDays: "1-2 days" },
  { id: "5", name: "Thika", fee: 450, estimatedDays: "2-3 days" },
  { id: "6", name: "Nakuru", fee: 600, estimatedDays: "2-3 days" },
  { id: "7", name: "Mombasa", fee: 800, estimatedDays: "3-5 days" },
  { id: "8", name: "Kisumu", fee: 750, estimatedDays: "3-5 days" },
  { id: "9", name: "Eldoret", fee: 700, estimatedDays: "3-5 days" },
  { id: "10", name: "Rest of Kenya", fee: 1000, estimatedDays: "5-7 days" },
]

export const runningOffers = [
  "FREE SHIPPING on orders above KSh 5,000",
  "NEW ARRIVALS posted daily -- Shop now!",
  "Up to 40% OFF on selected items",
  "Buy 2 Get 1 FREE on all tops",
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit)
}

export function getProductsOnOffer(): Product[] {
  return products.filter((p) => p.isOnOffer)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew)
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`
}
