"use client"

import { AdminShell } from "./admin-shell"
import { formatPrice } from "@/lib/format"
import { TrendingUp, TrendingDown, Users, ShoppingBag, Eye, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  { label: "Total Revenue", value: formatPrice(285000), change: "+18.2%", up: true, icon: DollarSign },
  { label: "Total Orders", value: "47", change: "+12.5%", up: true, icon: ShoppingBag },
  { label: "Site Visitors", value: "1,234", change: "+8.3%", up: true, icon: Users },
  { label: "Conversion Rate", value: "3.8%", change: "-0.4%", up: false, icon: TrendingUp },
]

const revenueByMonth = [
  { month: "Sep", value: 32000 },
  { month: "Oct", value: 41000 },
  { month: "Nov", value: 56000 },
  { month: "Dec", value: 72000 },
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 36000 },
]

const topProducts = [
  { name: "Elegant Satin Wrap Dress", sold: 18, revenue: 63000 },
  { name: "Oversized Linen Blazer", sold: 14, revenue: 58800 },
  { name: "Classic Black Bodysuit", sold: 22, revenue: 39600 },
  { name: "Gold Layered Necklace Set", sold: 16, revenue: 35200 },
  { name: "Tweed Button Jacket", sold: 8, revenue: 38400 },
]

const topCategories = [
  { name: "Dresses", orders: 32, percentage: 34 },
  { name: "Tops", orders: 24, percentage: 26 },
  { name: "Jackets", orders: 18, percentage: 19 },
  { name: "Jewellery", orders: 12, percentage: 13 },
  { name: "Bags & Purses", orders: 8, percentage: 8 },
]

const recentActivity = [
  { action: "New order", detail: "KF-048 by Amina W.", time: "2 min ago" },
  { action: "Product viewed", detail: "Elegant Satin Wrap Dress (12 views)", time: "5 min ago" },
  { action: "Order dispatched", detail: "KF-045 to Mombasa", time: "1 hour ago" },
  { action: "New subscriber", detail: "grace@email.com", time: "2 hours ago" },
  { action: "Product added to cart", detail: "Ribbed Crop Top (3 times)", time: "3 hours ago" },
]

const maxRevenue = Math.max(...revenueByMonth.map((r) => r.value))

export function AdminAnalytics() {
  return (
    <AdminShell title="Analytics">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-serif font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Store performance overview for the last 30 days.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-border p-5 rounded-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {stat.up ? <ArrowUpRight className="h-3 w-3 text-foreground" /> : <ArrowDownRight className="h-3 w-3 text-muted-foreground" />}
                <span className={`text-xs ${stat.up ? "text-foreground" : "text-muted-foreground"}`}>{stat.change} vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart (simple bar chart) */}
        <div className="border border-border rounded-sm p-6">
          <h2 className="text-sm font-semibold mb-6">Monthly Revenue</h2>
          <div className="flex items-end gap-3 h-48">
            {revenueByMonth.map((r) => (
              <div key={r.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{formatPrice(r.value)}</span>
                <div className="w-full bg-foreground rounded-t-sm transition-all" style={{ height: `${(r.value / maxRevenue) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{r.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="border border-border rounded-sm">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-semibold">Top Selling Products</h2>
            </div>
            <div className="divide-y divide-border">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sold} sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(p.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="border border-border rounded-sm">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-semibold">Orders by Category</h2>
            </div>
            <div className="p-5 space-y-4">
              {topCategories.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.orders} orders ({c.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${c.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border border-border rounded-sm">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
