"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Tag,
  Percent,
  Truck,
  ImageIcon,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Offers & Banners", href: "/admin/banners", icon: ImageIcon },
  { label: "Delivery", href: "/admin/delivery-locations", icon: Truck },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-border bg-background sticky top-0 z-50">
        <button type="button" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </button>
        <Link href="/admin" className="font-serif text-lg font-bold">
          KF Admin
        </Link>
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
          View Store
        </Link>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-60 min-h-screen border-r border-border bg-background fixed">
          <div className="p-6 border-b border-border">
            <Link href="/admin" className="font-serif text-xl font-bold">
              KF Admin
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Kallitos Fashion Admin</p>
          </div>
          <nav className="flex-1 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={-1}
              aria-label="Close sidebar"
            />
            <aside className="fixed inset-y-0 left-0 w-72 bg-background z-50 lg:hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/admin" className="font-serif text-lg font-bold">
                  KF Admin
                </Link>
                <button type="button" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-60">
          <div className="hidden lg:flex items-center justify-between h-14 px-8 border-b border-border bg-background sticky top-0 z-30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground">Admin</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{title}</span>
            </div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Store
            </Link>
          </div>
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
