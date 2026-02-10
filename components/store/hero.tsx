"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          {/* Main Hero Banner */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-sm min-h-[400px] lg:min-h-[520px] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=700&fit=crop"
                alt="Fashion collection hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-foreground/40" />
            </div>
            <div className="relative z-10 p-8 lg:p-12 max-w-lg">
              <p className="text-background/80 text-xs tracking-[0.3em] uppercase mb-3">
                New Collection 2026
              </p>
              <h1 className="text-background text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance">
                Up To <span className="italic">40% Off</span> Latest Creations
              </h1>
              <p className="text-background/70 text-sm mt-4 leading-relaxed max-w-sm">
                Discover curated thrift and brand-new fashion pieces. Elegance made affordable.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 mt-6 bg-background text-foreground px-7 py-3 text-sm font-medium hover:bg-background/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Side Banners */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            <Link
              href="/shop?category=tops"
              className="relative overflow-hidden rounded-sm flex-1 min-h-[200px] lg:min-h-0 group"
            >
              <Image
                src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=350&fit=crop"
                alt="New modern and stylish tops"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-background font-serif text-lg font-semibold leading-snug">
                  New Modern & Stylish
                  <br />
                  Tops
                </h3>
              </div>
            </Link>
            <Link
              href="/shop?filter=new"
              className="relative overflow-hidden rounded-sm flex-1 min-h-[200px] lg:min-h-0 group"
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=350&fit=crop"
                alt="Popular energy newest collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-background font-serif text-lg font-semibold leading-snug">
                  Popular Energy With Our
                  <br />
                  Newest Collection
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
