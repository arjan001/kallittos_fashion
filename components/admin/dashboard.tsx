"use client"

import { Package, Tag, Percent, TrendingUp, ShoppingBag, Eye } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { products, categories, offers } from "@/lib/data"
import { formatPrice } from "@/lib/data"
import Link from "next/link"

const stats = [
  {
    label: "Total Products",
    value: products.length.toString(),
    icon: Package,
    change: "+3 this week",
  },
  {
    label: "Categories",
    value: categories.length.toString(),
    icon: Tag,
    change: "6 active",
  },
  {
    label: "Active Offers",
    value: offers.length.toString(),
    icon: Percent,
    change: "2 running",
  },
  {
    label: "Revenue (Est.)",
    value: formatPrice(145000),
    icon: TrendingUp,
    change: "+12% vs last month",
  },
]

export function AdminDashboard() {
  const recentProducts = products.slice(0, 5)
  const offerProducts = products.filter((p) => p.isOnOffer).slice(0, 5)

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back. Here{"'"}s an overview of your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-border p-5 rounded-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 border border-border p-4 rounded-sm hover:bg-secondary transition-colors"
          >
            <Package className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Manage Products</p>
              <p className="text-xs text-muted-foreground">Add, edit or remove products</p>
            </div>
          </Link>
          <Link
            href="/admin/offers"
            className="flex items-center gap-3 border border-border p-4 rounded-sm hover:bg-secondary transition-colors"
          >
            <Percent className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Manage Offers</p>
              <p className="text-xs text-muted-foreground">Create or edit offers</p>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 border border-border p-4 rounded-sm hover:bg-secondary transition-colors"
          >
            <Eye className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">View Store</p>
              <p className="text-xs text-muted-foreground">See how customers see it</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="border border-border rounded-sm">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h2 className="text-sm font-semibold">Recent Products</h2>
              <Link href="/admin/products" className="text-xs text-muted-foreground hover:text-foreground">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Products */}
          <div className="border border-border rounded-sm">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h2 className="text-sm font-semibold">Products On Offer</h2>
              <Link href="/admin/offers" className="text-xs text-muted-foreground hover:text-foreground">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {offerProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">-{product.offerPercentage}% off</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
