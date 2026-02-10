"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, X, Truck } from "lucide-react"
import { TopBar } from "./top-bar"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { useCart } from "@/lib/cart-context"
import { deliveryLocations, formatPrice } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [deliveryLocation, setDeliveryLocation] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  const selectedDelivery = deliveryLocations.find((l) => l.id === deliveryLocation)
  const deliveryFee = selectedDelivery?.fee || 0
  const grandTotal = totalPrice + deliveryFee
  const freeShipping = totalPrice >= 5000

  const handleWhatsAppCheckout = () => {
    const orderItems = items
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} @ ${formatPrice(item.product.price)}${
            item.selectedVariations
              ? ` (${Object.entries(item.selectedVariations).map(([k, v]) => `${k}: ${v}`).join(", ")})`
              : ""
          }`
      )
      .join("\n")

    const message = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n*ORDER DETAILS*\n${orderItems}\n\n*Subtotal:* ${formatPrice(totalPrice)}\n*Delivery:* ${
        freeShipping ? "FREE" : selectedDelivery ? `${formatPrice(deliveryFee)} (${selectedDelivery.name})` : "Not selected"
      }\n*Total:* ${formatPrice(freeShipping ? totalPrice : grandTotal)}\n\n*CUSTOMER INFO*\nName: ${formData.name}\nPhone: ${formData.phone}${
        formData.email ? `\nEmail: ${formData.email}` : ""
      }\nAddress: ${formData.address}${formData.notes ? `\nNotes: ${formData.notes}` : ""}`
    )

    window.open(`https://wa.me/254780406059?text=${message}`, "_blank")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold">Your Cart is Empty</h1>
            <p className="text-sm text-muted-foreground mt-2">Add some items to get started.</p>
            <Link href="/shop">
              <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90">
                Browse Shop
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left - Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Customer Info */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0712 345 678"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Delivery Location *</Label>
                    <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select delivery location" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryLocations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.name} — {formatPrice(loc.fee)} ({loc.estimatedDays})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium mb-1.5 block">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Building name, street, area..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium mb-1.5 block">Order Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {freeShipping && (
                <div className="flex items-center gap-3 bg-secondary p-4 rounded-sm">
                  <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm">
                    Your order qualifies for <span className="font-semibold">FREE shipping</span>!
                  </p>
                </div>
              )}
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-secondary/50 p-6 rounded-sm sticky top-32">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-secondary rounded-sm overflow-hidden">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border rounded-sm"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border rounded-sm"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button type="button" onClick={() => removeItem(item.product.id)}>
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <span className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {freeShipping ? "FREE" : selectedDelivery ? formatPrice(deliveryFee) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(freeShipping ? totalPrice : grandTotal)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleWhatsAppCheckout}
                    disabled={!formData.name || !formData.phone || !formData.address}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 text-sm font-medium disabled:opacity-40"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Complete Order via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    You will be redirected to WhatsApp to confirm your order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
