"use client"

import { useEffect, useState } from "react"
import { CreditCard, Search, RefreshCw, Eye, X, Package, MapPin, User, Phone, Mail, FileText, Download, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface OrderItem {
  id: string
  product_name: string
  product_price: number
  quantity: number
  selected_variations: Record<string, string> | null
}

interface CardPayment {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  card_number: string | null
  card_last4: string | null
  card_brand: string | null
  card_holder: string | null
  card_expiry_month: string | null
  card_expiry_year: string | null
  total: number
  subtotal: number | null
  delivery_fee: number | null
  delivery_address: string | null
  order_notes: string | null
  delivery_locations: { name: string } | null
  status: string
  created_at: string
  items: OrderItem[]
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

function CardPaymentDetailModal({ order, open, onClose }: { order: CardPayment | null; open: boolean; onClose: () => void }) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details — {order.order_number}
          </DialogTitle>
          <DialogDescription>
            Full card payment and order information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Order Status & Date */}
          <div className="flex items-center justify-between">
            <StatusBadge status={order.status} />
            <span className="text-sm text-muted-foreground">{formatDate(order.created_at)}</span>
          </div>

          {/* Card Payment Info */}
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Card Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Card Brand</span>
                <CardBrandBadge brand={order.card_brand} />
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Card Number</span>
                <span className="font-mono">
                  {order.card_number
                    ? order.card_number.replace(/(\d{4})/g, "$1 ").trim()
                    : order.card_last4
                      ? `•••• •••• •••• ${order.card_last4}`
                      : "—"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Cardholder Name</span>
                <span className="font-medium">{order.card_holder || "—"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Expiry Date</span>
                <span className="font-mono">
                  {order.card_expiry_month && order.card_expiry_year
                    ? `${order.card_expiry_month}/${order.card_expiry_year}`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{order.customer_phone}</span>
              </div>
              {order.customer_email && (
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{order.customer_email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Info */}
          {order.delivery_address && (
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Delivery Information
              </h3>
              <div className="text-sm space-y-2">
                {order.delivery_locations?.name && (
                  <div>
                    <span className="text-muted-foreground text-xs block">Location</span>
                    <span>{order.delivery_locations.name}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground text-xs block">Address</span>
                  <span>{order.delivery_address}</span>
                </div>
                {order.order_notes && (
                  <div>
                    <span className="text-muted-foreground text-xs block">Order Notes</span>
                    <span className="italic text-muted-foreground">{order.order_notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                Order Items ({order.items.length})
              </h3>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product_name}</p>
                      {item.selected_variations && Object.keys(item.selected_variations).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {Object.entries(item.selected_variations).map(([key, val]) => `${key}: ${val}`).join(", ")}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.product_price)} x {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatPrice(item.product_price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Payment Summary
            </h3>
            <div className="text-sm space-y-1">
              {order.subtotal != null && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
              )}
              {order.delivery_fee != null && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatPrice(order.delivery_fee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold pt-1 border-t">
                <span>Total Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function exportToCSV(orders: CardPayment[]) {
  const headers = [
    "Order #",
    "Date",
    "Customer Name",
    "Phone",
    "Email",
    "Card Brand",
    "Card Number",
    "Card Last 4",
    "Cardholder",
    "Expiry Month",
    "Expiry Year",
    "Subtotal",
    "Delivery Fee",
    "Total",
    "Status",
    "Delivery Address",
    "Notes",
  ]

  const rows = orders.map((o) => [
    o.order_number,
    o.created_at ? new Date(o.created_at).toISOString().split("T")[0] : "",
    o.customer_name,
    o.customer_phone,
    o.customer_email || "",
    o.card_brand || "",
    o.card_number || "",
    o.card_last4 || "",
    o.card_holder || "",
    o.card_expiry_month || "",
    o.card_expiry_year || "",
    o.subtotal != null ? Number(o.subtotal) : "",
    o.delivery_fee != null ? Number(o.delivery_fee) : "",
    Number(o.total),
    o.status,
    o.delivery_address || "",
    o.order_notes || "",
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => {
        const str = String(cell)
        return str.includes(",") || str.includes('"') || str.includes("\n")
          ? `"${str.replace(/"/g, '""')}"`
          : str
      }).join(",")
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `card-payments-${new Date().toISOString().split("T")[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function CardPaymentsTable() {
  const [orders, setOrders] = useState<CardPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<CardPayment | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState(false)

  async function fetchOrders() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/card-payments")
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Failed to fetch")
      }
      const data = await res.json()
      setOrders(data.orders || [])
      setSelectedIds(new Set())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load card payments. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (selectedIds.size === 0) return
    if (!confirm(`Delete ${selectedIds.size} card payment${selectedIds.size > 1 ? "s" : ""}? This cannot be undone.`)) return

    setDeleting(true)
    try {
      const ids = Array.from(selectedIds).join(",")
      const res = await fetch(`/api/card-payments?ids=${ids}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      await fetchOrders()
    } catch {
      setError("Failed to delete selected payments. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((o) => o.id)))
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
      o.card_number?.includes(q) ||
      o.card_last4?.includes(q) ||
      o.card_brand?.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      {/* Detail Modal */}
      <CardPaymentDetailModal
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Search, actions bar */}
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filtered.length} payment{filtered.length !== 1 ? "s" : ""}
          </span>

          {/* Export CSV */}
          {filtered.length > 0 && (
            <button
              onClick={() => exportToCSV(filtered)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
              title="Export to CSV"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          )}

          {/* Delete selected */}
          {selectedIds.size > 0 && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              title={`Delete ${selectedIds.size} selected`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete ({selectedIds.size})
            </button>
          )}

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
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order #</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Card</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Cardholder</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((order) => (
                  <tr key={order.id} className={`hover:bg-muted/30 transition-colors ${selectedIds.has(order.id) ? "bg-muted/20" : ""}`}>
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
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
                        {order.card_number ? (
                          <span className="font-mono text-xs text-muted-foreground">{order.card_number}</span>
                        ) : order.card_last4 ? (
                          <span className="font-mono text-xs text-muted-foreground">••••{order.card_last4}</span>
                        ) : null}
                        {order.card_expiry_month && order.card_expiry_year && (
                          <span className="text-xs text-muted-foreground">{order.card_expiry_month}/{order.card_expiry_year.slice(-2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{order.card_holder || "—"}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4 text-center"><StatusBadge status={order.status} /></td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden sm:table-cell">{formatDate(order.created_at)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg hover:bg-muted transition-colors"
                        title="View full payment details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
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
