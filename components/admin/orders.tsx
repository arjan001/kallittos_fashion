"use client"

import { useState } from "react"
import { Eye, Truck, CheckCircle, Clock, Package, XCircle, Search, Filter } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { formatPrice } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type OrderStatus = "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled"

interface Order {
  id: string
  orderNo: string
  customer: string
  phone: string
  email: string
  items: { name: string; qty: number; price: number; variation?: string }[]
  subtotal: number
  delivery: number
  total: number
  location: string
  address: string
  notes: string
  status: OrderStatus
  date: string
}

const mockOrders: Order[] = [
  {
    id: "1", orderNo: "KF-001", customer: "Amina Wanjiku", phone: "0712345678", email: "amina@email.com",
    items: [{ name: "Elegant Satin Wrap Dress", qty: 1, price: 3500, variation: "Size: M, Color: Blush Pink" }, { name: "Gold Layered Necklace Set", qty: 1, price: 2200 }],
    subtotal: 5700, delivery: 0, total: 5700, location: "Nairobi CBD", address: "Kenyatta Avenue, Hilton Building", notes: "Please gift wrap", status: "pending", date: "2026-02-10",
  },
  {
    id: "2", orderNo: "KF-002", customer: "Grace Akinyi", phone: "0798765432", email: "",
    items: [{ name: "Ribbed Crop Top", qty: 2, price: 1200, variation: "Size: S, Color: White" }],
    subtotal: 2400, delivery: 250, total: 2650, location: "Westlands", address: "Sarit Centre area", notes: "", status: "confirmed", date: "2026-02-09",
  },
  {
    id: "3", orderNo: "KF-003", customer: "Joy Muthoni", phone: "0733111222", email: "joy@mail.com",
    items: [{ name: "Oversized Linen Blazer", qty: 1, price: 4200, variation: "Size: L, Color: Beige" }, { name: "Classic Black Bodysuit", qty: 1, price: 1800, variation: "Size: M" }],
    subtotal: 6000, delivery: 0, total: 6000, location: "Karen", address: "Karen Road, near the mall", notes: "", status: "dispatched", date: "2026-02-07",
  },
  {
    id: "4", orderNo: "KF-004", customer: "Sarah Njeri", phone: "0722333444", email: "",
    items: [{ name: "Floral Print Mini Dress", qty: 1, price: 2800 }],
    subtotal: 2800, delivery: 600, total: 3400, location: "Nakuru", address: "Town centre", notes: "Call before delivery", status: "delivered", date: "2026-02-05",
  },
  {
    id: "5", orderNo: "KF-005", customer: "Wanjiku Kamau", phone: "0755666777", email: "wanjiku@mail.com",
    items: [{ name: "Pearl Drop Earrings", qty: 1, price: 1500, variation: "Metal: Gold" }],
    subtotal: 1500, delivery: 400, total: 1900, location: "Kiambu", address: "Thika Road Mall area", notes: "", status: "cancelled", date: "2026-02-04",
  },
]

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; className: string }> = {
  pending: { label: "Pending", icon: Clock, className: "bg-secondary text-foreground" },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: "bg-foreground text-background" },
  dispatched: { label: "Dispatched", icon: Truck, className: "bg-foreground text-background" },
  delivered: { label: "Delivered", icon: Package, className: "bg-secondary text-foreground" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-secondary text-muted-foreground" },
}

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.orderNo.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    dispatched: orders.filter((o) => o.status === "dispatched").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }

  return (
    <AdminShell title="Orders">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="border border-border p-4 rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Pending</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-1">{stats.pending}</p>
          </div>
          <div className="border border-border p-4 rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Confirmed</span>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-1">{stats.confirmed}</p>
          </div>
          <div className="border border-border p-4 rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Dispatched</span>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-1">{stats.dispatched}</p>
          </div>
          <div className="border border-border p-4 rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Delivered</span>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-1">{stats.delivered}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="dispatched">Dispatched</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Customer</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order) => {
                  const config = statusConfig[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium">{order.orderNo}</span>
                        <span className="sm:hidden text-xs text-muted-foreground block">{order.customer}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{order.customer}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{order.date}</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${config.className}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif">Order {selectedOrder?.orderNo}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-5 mt-4">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm ${statusConfig[selectedOrder.status].className}`}>
                  {statusConfig[selectedOrder.status].label}
                </span>
                <span className="text-xs text-muted-foreground">{selectedOrder.date}</span>
              </div>

              <div className="border border-border rounded-sm p-4 space-y-1">
                <p className="text-sm font-semibold">{selectedOrder.customer}</p>
                <p className="text-xs text-muted-foreground">{selectedOrder.phone}</p>
                {selectedOrder.email && <p className="text-xs text-muted-foreground">{selectedOrder.email}</p>}
                <p className="text-xs text-muted-foreground">{selectedOrder.location} -- {selectedOrder.address}</p>
                {selectedOrder.notes && <p className="text-xs text-muted-foreground italic mt-2">Note: {selectedOrder.notes}</p>}
              </div>

              <div className="border border-border rounded-sm overflow-hidden">
                <div className="bg-secondary px-4 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Items</span>
                </div>
                <div className="divide-y divide-border">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.variation && <p className="text-xs text-muted-foreground">{item.variation}</p>}
                        <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-3 space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span>{selectedOrder.delivery === 0 ? "FREE" : formatPrice(selectedOrder.delivery)}</span></div>
                  <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border"><span>Total</span><span>{formatPrice(selectedOrder.total)}</span></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["pending", "confirmed", "dispatched", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                    <Button
                      key={s}
                      variant={selectedOrder.status === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      className={selectedOrder.status === s ? "bg-foreground text-background" : "bg-transparent"}
                    >
                      {statusConfig[s].label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
