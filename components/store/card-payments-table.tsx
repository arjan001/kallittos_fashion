"use client"

import { useEffect, useState } from "react"
import { CreditCard, Search, RefreshCw } from "lucide-react"

interface CardPayment {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  card_last4: string | null
  card_brand: string | null
  card_holder: string | null
  card_expiry_month: string | null
  card_expiry_year: string | null
  total: number
  status: string
  created_at: string
}

function formatPrice(price: number): string {
  return `KSh ${Number(price).toLocaleString()}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    dispatched: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  )
}

function CardBrandBadge({ brand }: { brand: string | null }) {
  if (!brand) return <span className="text-muted-foreground text-xs">—</span>
  const isVisa = brand.toLowerCase() === "visa"
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${isVisa ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"}`}>
      {isVisa ? (
        <svg viewBox="0 0 48 16" className="h-3 w-auto" fill="currentColor"><path d="M19.2 1.6l-3.4 12.8h-2.8L16.4 1.6h2.8zm14.4 8.3l1.5-4 .8 4h-2.3zm3.1 4.5h2.6l-2.3-12.8h-2.4c-.5 0-1 .3-1.2.8l-4.2 12h2.9l.6-1.6h3.6l.4 1.6zm-7.6-4.2c0-3.4-4.7-3.6-4.7-5.1 0-.5.5-.9 1.4-.9 1.2 0 2.2.4 2.2.4l.4-2.2s-1-.4-2.5-.4c-2.6 0-4.5 1.4-4.5 3.4 0 3.7 4.7 3.3 4.7 5.2 0 .5-.5 1-1.5 1-1.3 0-2.4-.5-2.4-.5l-.5 2.2s1.1.5 2.8.5c2.8 0 4.6-1.4 4.6-3.5zM12.8 1.6l-5.4 12.8H4.5L1.8 4.2C1.7 3.7 1.5 3.5 1 3.3 0 2.8.1 2.9.1 2.9l.4-2s2.1.4 3 .4c.8 0 1.1.5 1.2 1l1 5.6 2.8-7h2.9z"/></svg>
      ) : (
        <svg viewBox="0 0 48 30" className="h-3 w-auto"><circle cx="18" cy="15" r="12" fill="#EB001B" opacity="0.8"/><circle cx="30" cy="15" r="12" fill="#F79E1B" opacity="0.8"/></svg>
      )}
      {brand.charAt(0).toUpperCase() + brand.slice(1)}
    </span>
  )
}

export function CardPaymentsTable() {
  const [orders, setOrders] = useState<CardPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  async function fetchOrders() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/card-payments")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      setError("Failed to load card payments. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filtered = orders.filter((o) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      o.order_number?.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.customer_phone?.includes(q) ||
      o.card_holder?.toLowerCase().includes(q) ||
      o.card_last4?.includes(q) ||
      o.card_brand?.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      {/* Search and refresh bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, phone, card..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filtered.length} payment{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center py-8 text-red-600 text-sm">{error}</div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div className="text-center py-12">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-3">Loading card payments...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <CreditCard className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium">No card payments found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {search ? "Try a different search term." : "Card payments will appear here once customers pay with Visa or Mastercard."}
          </p>
        </div>
      )}

      {/* Data table */}
      {!loading && !error && filtered.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order #</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Card</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Cardholder</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-medium">{order.order_number}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{order.customer_name}</div>
                      {order.customer_email && (
                        <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{order.customer_phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CardBrandBadge brand={order.card_brand} />
                        {order.card_last4 && (
                          <span className="font-mono text-xs text-muted-foreground">••••{order.card_last4}</span>
                        )}
                        {order.card_expiry_month && order.card_expiry_year && (
                          <span className="text-xs text-muted-foreground">{order.card_expiry_month}/{order.card_expiry_year.slice(-2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{order.card_holder || "—"}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4 text-center"><StatusBadge status={order.status} /></td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden sm:table-cell">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
