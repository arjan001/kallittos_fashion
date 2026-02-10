"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search, GripVertical } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { categories as initialCategories } from "@/lib/data"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CategoryForm {
  name: string
  slug: string
  image: string
  productCount: number
}

const emptyForm: CategoryForm = { name: "", slug: "", image: "", productCount: 0 }

export function AdminCategories() {
  const [cats, setCats] = useState<Category[]>(initialCategories)
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<CategoryForm>(emptyForm)
  const [search, setSearch] = useState("")

  const filtered = cats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setEditId(null)
    setForm(emptyForm)
    setIsOpen(true)
  }

  const openEdit = (cat: Category) => {
    setEditId(cat.id)
    setForm({ name: cat.name, slug: cat.slug, image: cat.image, productCount: cat.productCount })
    setIsOpen(true)
  }

  const handleSave = () => {
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    const cat: Category = {
      id: editId || Date.now().toString(),
      name: form.name,
      slug,
      image: form.image || "/placeholder.svg?height=500&width=400",
      productCount: form.productCount,
    }
    if (editId) {
      setCats((prev) => prev.map((c) => (c.id === editId ? cat : c)))
    } else {
      setCats((prev) => [...prev, cat])
    }
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    setCats((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <AdminShell title="Categories">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Categories</h1>
            <p className="text-sm text-muted-foreground mt-1">{cats.length} categories</p>
          </div>
          <Button onClick={openNew} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat) => (
            <div key={cat.id} className="border border-border rounded-sm overflow-hidden group">
              <div className="relative aspect-[4/3] bg-secondary">
                <Image src={cat.image || "/placeholder.svg"} alt={cat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.productCount} products</p>
                  <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif">{editId ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Category Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dresses" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated from name" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!form.name} className="bg-foreground text-background hover:bg-foreground/90">
                {editId ? "Update" : "Add"} Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
