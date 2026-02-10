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
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=700&fit=crop"
                alt="Denim jeans collection"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-foreground/50" />
            </div>
            <div className="relative z-10 p-8 lg:p-12 max-w-lg">
              <p className="text-background/80 text-xs tracking-[0.3em] uppercase mb-3">
                Thrift & Brand New Denim
              </p>
              <h1 className="text-background text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance">
                Up To <span className="italic">30% Off</span> Curated Jeans
              </h1>
              <p className="text-background/70 text-sm mt-4 leading-relaxed max-w-sm">
                From mom jeans to ripped, straight leg to flare -- find your perfect pair at Kallitos Fashion.
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
              href="/shop?category=ripped-rugged"
              className="relative overflow-hidden rounded-sm flex-1 min-h-[200px] lg:min-h-0 group"
            >
              <Image
                src="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=350&fit=crop"
                alt="Ripped and rugged jeans"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-background font-serif text-lg font-semibold leading-snug">
                  Ripped & Rugged
                  <br />
                  Denim
                </h3>
              </div>
            </Link>
            <Link
              href="/shop?category=dungarees-overalls"
              className="relative overflow-hidden rounded-sm flex-1 min-h-[200px] lg:min-h-0 group"
            >
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=350&fit=crop"
                alt="Dungarees and overalls"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-background font-serif text-lg font-semibold leading-snug">
                  Dungarees &
                  <br />
                  Overalls
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
