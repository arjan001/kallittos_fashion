"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/lib/types"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const COLLECTIONS = [
  { name: "Men", slug: "men", image: "/banners/men-collection.jpg", href: "/shop/men" },
  { name: "Women", slug: "women", image: "/banners/women-collection.jpg", href: "/shop/women" },
  { name: "Kids", slug: "kids", image: "/banners/kids-collection.jpg", href: "/shop/kids" },
]

export function CategoriesSection() {
  const { data: categories = [] } = useSWR<Category[]>("/api/categories", fetcher)

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Collections - Men, Women, Kids */}
        <div className="mb-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Collections
              </p>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold">
                Shop By Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Shop All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {COLLECTIONS.map((col) => (
              <Link key={col.slug} href={col.href} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                  <Image
                    src={col.image}
                    alt={`${col.name} denim collection`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-background text-xl font-serif font-bold">{col.name}</h3>
                    <span className="inline-flex items-center gap-1.5 mt-2 text-background/80 text-xs font-medium tracking-wide uppercase group-hover:text-background transition-colors">
                      Shop {col.name}
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories - Jeans types, Sweatshirts, Flannels etc */}
        {categories.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  Browse
                </p>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold">
                  Shop By Category
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.productCount} items
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
