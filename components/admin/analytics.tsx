"use client"

import { useState } from "react"
import { AdminShell } from "./admin-shell"
import { formatPrice } from "@/lib/format"
import { TrendingUp, TrendingDown, Users, ShoppingBag, Eye, DollarSign, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface Order {
  id: string; total: number; status: string; date: string; customer: string; orderNo: string
  items: { name: string; qty: number; price: number }[]
}

interface Product {
  id: string; name: string; price: number; category: string
}

export function AdminAnalytics() {
  const { data: orders = [] } = useSWR<Order[]>("/api/admin/orders", fetcher)
  const { data: products = [] } = useSWR<Product[]>("/api/products", fetcher)
  const [prodPage, setProdPage] = useState(1)
  const [activityPage, setActivityPage] = useState(1)

  // Compute live stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.total : 0), 0)
  const totalOrders = orders.length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length

  const stats = [
    { label: "Total Revenue", value: formatPrice(totalRevenue), change: `${deliveredOrders} delivered`, up: true, icon: DollarSign },
    { label: "Total Orders", value: totalOrders.toString(), change: `${orders.filter(o => o.status === "pending").length} pending`, up: true, icon: ShoppingBag },
    { label: "Total Products", value: products.length.toString(), change: "Live from DB", up: true, icon: Users },
    { label: "Avg Order Value", value: totalOrders > 0 ? formatPrice(Math.round(totalRevenue / totalOrders)) : formatPrice(0), change: "Per order", up: true, icon: TrendingUp },
  ]

  // Revenue by month from actual orders
  const monthMap: Record<string, number> = {}
  orders.forEach((o) => {
    if (o.status === "cancelled") return
    const d = new Date(o.date)
    const key = d.toLocaleString("default", { month: "short", year: "2-digit" })
    monthMap[key] = (monthMap[key] || 0) + o.total
  })
  const revenueByMonth = Object.entries(monthMap).slice(-6).map(([month, value]) => ({ month, value }))
  if (revenueByMonth.length === 0) revenueByMonth.push({ month: "Now", value: 0 })
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.value), 1)

  // Top products from order items
  const productSales: Record<string, { name: string; sold: number; revenue: number }> = {}
  orders.forEach((o) => {
    if (o.status === "cancelled") return
    o.items.forEach((item) => {
      const key = item.name
      if (!productSales[key]) productSales[key] = { name: key, sold: 0, revenue: 0 }
      productSales[key].sold += item.qty
      productSales[key].revenue += item.price * item.qty
    })
  })
  const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue)
  const PROD_PER_PAGE = 5
  const prodTotalPages = Math.max(1, Math.ceil(topProducts.length / PROD_PER_PAGE))
  const pagedTopProducts = topProducts.slice((prodPage - 1) * PROD_PER_PAGE, prodPage * PROD_PER_PAGE)

  // Category breakdown from orders
  const catCount: Record<string, number> = {}
  products.forEach((p) => { catCount[p.category] = (catCount[p.category] || 0) + 1 })
  const totalCatProducts = products.length || 1
  const topCategories = Object.entries(catCount)
    .map(([name, count]) => ({ name, orders: count, percentage: Math.round((count / totalCatProducts) * 100) }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5)

  // Recent activity from orders (as live feed)
  const recentActivity = orders
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((o) => {
      const statusAction = o.status === "pending" ? "New order" : o.status === "dispatched" ? "Order dispatched" : o.status === "delivered" ? "Order delivered" : `Order ${o.status}`
      const ago = getTimeAgo(new Date(o.date))
      return { action: statusAction, detail: `${o.orderNo} by ${o.customer} - ${formatPrice(o.total)}`, time: ago }
    })
  const ACT_PER_PAGE = 5
  const actTotalPages = Math.max(1, Math.ceil(recentActivity.length / ACT_PER_PAGE))
  const pagedActivity = recentActivity.slice((activityPage - 1) * ACT_PER_PAGE, activityPage * ACT_PER_PAGE)

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
              {pagedTopProducts.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No sales data yet</div>
              ) : pagedTopProducts.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-5">{(prodPage - 1) * PROD_PER_PAGE + i + 1}.</span>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sold} sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(p.revenue)}</span>
                </div>
              ))}
            </div>
            {prodTotalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-border bg-secondary/30">
                <span className="text-[11px] text-muted-foreground">{prodPage}/{prodTotalPages}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={prodPage === 1} onClick={() => setProdPage(p => p - 1)}><ChevronLeft className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={prodPage === prodTotalPages} onClick={() => setProdPage(p => p + 1)}><ChevronRight className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            )}
          </div>

          {/* Top Categories */}
          <div className="border border-border rounded-sm">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-semibold">Orders by Category</h2>
            </div>
            <div className="p-5 space-y-4">
              {topCategories.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No category data</p>
              )}
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
            {pagedActivity.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">No recent activity</div>
            ) : pagedActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
          {actTotalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-border bg-secondary/30">
              <span className="text-[11px] text-muted-foreground">Page {activityPage}/{actTotalPages}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={activityPage === 1} onClick={() => setActivityPage(p => p - 1)}><ChevronLeft className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={activityPage === actTotalPages} onClick={() => setActivityPage(p => p + 1)}><ChevronRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} min ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  return date.toLocaleDateString()
}
