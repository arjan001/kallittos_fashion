import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
              Kallitos Fashion
            </Link>
            <p className="text-background/60 text-sm mt-4 leading-relaxed max-w-xs">
              Curated thrift and brand-new fashion pieces. Style made affordable, delivered to your doorstep.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-background/20 rounded-full hover:bg-background/10 transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-background/20 rounded-full hover:bg-background/10 transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.77 1.52V6.94a4.85 4.85 0 01-1.01-.25z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-background/20 rounded-full hover:bg-background/10 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/shop" className="text-background/60 text-sm hover:text-background transition-colors">
                Shop All
              </Link>
              <Link href="/shop?filter=new" className="text-background/60 text-sm hover:text-background transition-colors">
                New Arrivals
              </Link>
              <Link href="/shop?filter=offers" className="text-background/60 text-sm hover:text-background transition-colors">
                On Offer
              </Link>
              <Link href="/delivery" className="text-background/60 text-sm hover:text-background transition-colors">
                Delivery Locations
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Categories
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/shop?category=dresses" className="text-background/60 text-sm hover:text-background transition-colors">
                Dresses
              </Link>
              <Link href="/shop?category=tops" className="text-background/60 text-sm hover:text-background transition-colors">
                Tops
              </Link>
              <Link href="/shop?category=bodysuits" className="text-background/60 text-sm hover:text-background transition-colors">
                Bodysuits
              </Link>
              <Link href="/shop?category=jackets" className="text-background/60 text-sm hover:text-background transition-colors">
                Jackets
              </Link>
              <Link href="/shop?category=jewellery" className="text-background/60 text-sm hover:text-background transition-colors">
                Jewellery
              </Link>
              <Link href="/shop?category=bags-purses" className="text-background/60 text-sm hover:text-background transition-colors">
                Bags & Purses
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-background/40 flex-shrink-0" />
                <p className="text-background/60 text-sm leading-relaxed">
                  Philadelphia House, 3rd Floor Wing B Room 9
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-background/40 flex-shrink-0" />
                <a href="tel:+254780406059" className="text-background/60 text-sm hover:text-background transition-colors">
                  0780 406 059
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-background/40 flex-shrink-0" />
                <a href="mailto:info@kallitosfashion.com" className="text-background/60 text-sm hover:text-background transition-colors">
                  info@kallitosfashion.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-background/40 flex-shrink-0" />
                <p className="text-background/60 text-sm leading-relaxed">
                  Mon - Sat: 9AM - 6PM
                  <br />
                  Dispatch: Tuesdays & Fridays
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-xs">
            {"2026 Kallitos Fashion. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-background/40 text-xs hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-background/40 text-xs hover:text-background transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-background/40 text-xs hover:text-background transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
