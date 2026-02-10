"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Phone } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "./cart-drawer"

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Main Nav */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background text-foreground p-0">
              <div className="p-6">
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
                  Kallitos Fashion
                </Link>
              </div>
              <nav className="flex flex-col px-6 gap-1">
                <Link href="/" className="py-3 text-sm font-medium border-b border-border">
                  Home
                </Link>
                <Link href="/shop" className="py-3 text-sm font-medium border-b border-border">
                  Shop All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className="py-3 text-sm border-b border-border"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link href="/delivery" className="py-3 text-sm font-medium border-b border-border">
                  Delivery Locations
                </Link>
              </nav>
              <div className="px-6 py-4 mt-4">
                <a
                  href="tel:+254780406059"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="h-4 w-4" />
                  0780 406 059
                </a>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="font-serif text-xl lg:text-2xl font-bold tracking-tight">
            Kallitos Fashion
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative flex items-center w-full">
              <div
                className="relative cursor-pointer"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <div className="flex items-center gap-1 px-4 py-2.5 bg-foreground text-background text-sm font-medium rounded-l-sm">
                  All Categories
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border shadow-lg rounded-sm z-50">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 h-10 px-4 bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                className="h-10 px-4 bg-foreground text-background rounded-r-sm"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 lg:gap-3">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/wishlist" className="hidden lg:flex">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <button
              type="button"
              className="relative p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 flex items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold min-w-[18px] h-[18px]">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden pb-3 animate-fade-in-up">
            <div className="flex items-center border border-border rounded-sm">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 h-10 px-4 bg-background text-sm outline-none"
                autoFocus
              />
              <button type="button" className="px-3">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Nav - Desktop */}
      <div className="hidden lg:block border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-12">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 bg-foreground text-background px-5 py-2 text-sm font-medium"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <Menu className="h-4 w-4" />
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Shop
              </Link>
              <Link href="/shop?filter=new" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                New Arrivals
              </Link>
              <Link href="/shop?filter=offers" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                On Offer
              </Link>
              <Link href="/delivery" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Delivery Locations
              </Link>
            </nav>
            <a
              href="tel:+254780406059"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              0780 406 059
            </a>
          </div>
        </div>
      </div>

      <CartDrawer />
    </header>
  )
}
