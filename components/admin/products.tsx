"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, X, Upload, Search } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { products as initialProducts, categories, formatPrice } from "@/lib/data"
import type { Product, ProductVariation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProductForm {
  name: string
  price: string
  originalPrice: string
  category: string
  description: string
  images: string[]
  isNew: boolean
  isOnOffer: boolean
  offerPercentage: string
  inStock: boolean
  variations: ProductVariation[]
  tags: string
}

const emptyForm: ProductForm = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  description: "",
  images: [],
  isNew: false,
  isOnOffer: false,
  offerPercentage: "",
  inStock: true,
  variations: [],
  tags: "",
}

export function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [searchQuery, setSearchQuery] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")

  const filtered = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openNew = () => {
    setEditingId(null)
    setForm(emptyForm)
    setIsModalOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.categorySlug,
      description: product.description,
      images: [...product.images],
      isNew: product.isNew || false,
      isOnOffer: product.isOnOffer || false,
      offerPercentage: product.offerPercentage?.toString() || "",
      inStock: product.inStock,
      variations: product.variations ? [...product.variations] : [],
      tags: product.tags.join(", "),
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const cat = categories.find((c) => c.slug === form.category)
    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const product: Product = {
      id: editingId || Date.now().toString(),
      name: form.name,
      slug,
      price: Number.parseFloat(form.price) || 0,
      originalPrice: form.originalPrice ? Number.parseFloat(form.originalPrice) : undefined,
      images: form.images.length > 0 ? form.images : ["/placeholder.svg?height=800&width=600"],
      category: cat?.name || form.category,
      categorySlug: form.category,
      description: form.description,
      variations: form.variations.length > 0 ? form.variations : undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isNew: form.isNew,
      isOnOffer: form.isOnOffer,
      offerPercentage: form.offerPercentage ? Number.parseInt(form.offerPercentage) : undefined,
      inStock: form.inStock,
      createdAt: new Date().toISOString().split("T")[0],
    }

    if (editingId) {
      setProductsList((prev) => prev.map((p) => (p.id === editingId ? product : p)))
    } else {
      setProductsList((prev) => [product, ...prev])
    }

    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id))
  }

  const addImage = () => {
    if (newImageUrl.trim()) {
      setForm((prev) => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }))
      setNewImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const addVariation = () => {
    setForm((prev) => ({
      ...prev,
      variations: [...prev.variations, { type: "", options: [] }],
    }))
  }

  const updateVariationType = (index: number, type: string) => {
    setForm((prev) => ({
      ...prev,
      variations: prev.variations.map((v, i) => (i === index ? { ...v, type } : v)),
    }))
  }

  const updateVariationOptions = (index: number, options: string) => {
    setForm((prev) => ({
      ...prev,
      variations: prev.variations.map((v, i) =>
        i === index ? { ...v, options: options.split(",").map((o) => o.trim()).filter(Boolean) } : v
      ),
    }))
  }

  const removeVariation = (index: number) => {
    setForm((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }))
  }

  return (
    <AdminShell title="Products">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Products</h1>
            <p className="text-sm text-muted-foreground mt-1">{productsList.length} products</p>
          </div>
          <Button onClick={openNew} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Products Table */}
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Price</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="font-medium line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{product.category}</td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {product.isNew && (
                          <span className="text-[10px] font-semibold bg-foreground text-background px-2 py-0.5 uppercase tracking-wider">
                            New
                          </span>
                        )}
                        {product.isOnOffer && (
                          <span className="text-[10px] font-semibold bg-foreground text-background px-2 py-0.5 uppercase tracking-wider">
                            Offer
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="text-[10px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 uppercase tracking-wider">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif">{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Product Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Elegant Satin Wrap Dress" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Price (KSh) *</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="3500" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Original Price (KSh)</Label>
                <Input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="5500" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Category *</Label>
                <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1.5 block">Description *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Describe the product..."
              />
            </div>

            {/* Multiple Images */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Images</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-20 bg-secondary rounded-sm overflow-hidden group">
                    <Image src={img || "/placeholder.svg"} alt={`Image ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 bg-foreground text-background rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste image URL..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                />
                <Button type="button" variant="outline" onClick={addImage}>
                  <Upload className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Variations */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Variations</Label>
                <Button type="button" variant="outline" size="sm" onClick={addVariation}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Variation
                </Button>
              </div>
              {form.variations.map((variation, i) => (
                <div key={i} className="flex gap-2 items-start mb-2">
                  <Input
                    value={variation.type}
                    onChange={(e) => updateVariationType(i, e.target.value)}
                    placeholder="e.g. Size"
                    className="w-28"
                  />
                  <Input
                    value={variation.options.join(", ")}
                    onChange={(e) => updateVariationOptions(i, e.target.value)}
                    placeholder="S, M, L, XL (comma separated)"
                    className="flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0" onClick={() => removeVariation(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Tags (comma separated)</Label>
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="casual, summer, floral" />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={form.inStock} onCheckedChange={(checked) => setForm({ ...form, inStock: checked })} />
                <Label className="text-sm">In Stock</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isNew} onCheckedChange={(checked) => setForm({ ...form, isNew: checked })} />
                <Label className="text-sm">New</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isOnOffer} onCheckedChange={(checked) => setForm({ ...form, isOnOffer: checked })} />
                <Label className="text-sm">On Offer</Label>
              </div>
              {form.isOnOffer && (
                <div>
                  <Input
                    type="number"
                    value={form.offerPercentage}
                    onChange={(e) => setForm({ ...form, offerPercentage: e.target.value })}
                    placeholder="% off"
                    className="h-9"
                  />
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.name || !form.price || !form.category}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {editingId ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
