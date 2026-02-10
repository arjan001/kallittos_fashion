"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Eye, EyeOff, Megaphone } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { offers as initialOffers, runningOffers as initialRunning } from "@/lib/data"
import type { Offer } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
  active: boolean
  position: "hero" | "mid-page"
}

interface NavbarOffer {
  id: string
  text: string
  active: boolean
}

const mockBanners: Banner[] = [
  { id: "1", title: "Up To 40% Off Latest Creations", subtitle: "New Collection 2026", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=700&fit=crop", link: "/shop", active: true, position: "hero" },
  { id: "2", title: "Season Sale", subtitle: "Limited Offer", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=400&fit=crop", link: "/shop?filter=offers", active: true, position: "mid-page" },
  { id: "3", title: "New Arrivals", subtitle: "Just Dropped", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=700&h=400&fit=crop", link: "/shop?filter=new", active: true, position: "mid-page" },
]

export function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)
  const [navOffers, setNavOffers] = useState<NavbarOffer[]>(
    initialRunning.map((text, i) => ({ id: (i + 1).toString(), text, active: true }))
  )
  const [offersList, setOffersList] = useState<Offer[]>(initialOffers)

  // Banner modal
  const [bannerModal, setBannerModal] = useState(false)
  const [editBanner, setEditBanner] = useState<Banner | null>(null)
  const [bannerForm, setBannerForm] = useState({ title: "", subtitle: "", image: "", link: "", position: "hero" as "hero" | "mid-page" })

  // Navbar offer modal
  const [navModal, setNavModal] = useState(false)
  const [editNav, setEditNav] = useState<NavbarOffer | null>(null)
  const [navText, setNavText] = useState("")

  // Offer modal
  const [offerModal, setOfferModal] = useState(false)
  const [editOffer, setEditOffer] = useState<Offer | null>(null)
  const [offerForm, setOfferForm] = useState({ title: "", description: "", discount: "", image: "", validUntil: "" })

  const openBannerNew = () => { setEditBanner(null); setBannerForm({ title: "", subtitle: "", image: "", link: "", position: "hero" }); setBannerModal(true) }
  const openBannerEdit = (b: Banner) => { setEditBanner(b); setBannerForm({ title: b.title, subtitle: b.subtitle, image: b.image, link: b.link, position: b.position }); setBannerModal(true) }
  const saveBanner = () => {
    const b: Banner = { id: editBanner?.id || Date.now().toString(), ...bannerForm, active: editBanner?.active ?? true }
    if (editBanner) setBanners((prev) => prev.map((x) => (x.id === editBanner.id ? b : x)))
    else setBanners((prev) => [...prev, b])
    setBannerModal(false)
  }

  const openNavNew = () => { setEditNav(null); setNavText(""); setNavModal(true) }
  const openNavEdit = (n: NavbarOffer) => { setEditNav(n); setNavText(n.text); setNavModal(true) }
  const saveNav = () => {
    if (editNav) setNavOffers((prev) => prev.map((n) => (n.id === editNav.id ? { ...n, text: navText } : n)))
    else setNavOffers((prev) => [...prev, { id: Date.now().toString(), text: navText, active: true }])
    setNavModal(false)
  }

  const openOfferNew = () => { setEditOffer(null); setOfferForm({ title: "", description: "", discount: "", image: "", validUntil: "" }); setOfferModal(true) }
  const openOfferEdit = (o: Offer) => { setEditOffer(o); setOfferForm({ title: o.title, description: o.description, discount: o.discount, image: o.image, validUntil: o.validUntil }); setOfferModal(true) }
  const saveOffer = () => {
    const o: Offer = { id: editOffer?.id || Date.now().toString(), ...offerForm }
    if (editOffer) setOffersList((prev) => prev.map((x) => (x.id === editOffer.id ? o : x)))
    else setOffersList((prev) => [...prev, o])
    setOfferModal(false)
  }

  return (
    <AdminShell title="Offers & Banners">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Offers & Banners</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage homepage banners, navbar running offers, and popup offers.</p>
        </div>

        <Tabs defaultValue="banners">
          <TabsList className="bg-secondary">
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="navbar">Navbar Offers</TabsTrigger>
            <TabsTrigger value="popup">Popup Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="banners" className="mt-6 space-y-4">
            <div className="flex justify-end">
              <Button onClick={openBannerNew} className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="h-4 w-4 mr-2" /> Add Banner
              </Button>
            </div>
            {banners.map((b) => (
              <div key={b.id} className="flex items-center gap-4 border border-border rounded-sm p-4">
                <div className="relative w-32 h-20 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={b.image || "/placeholder.svg"} alt={b.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{b.title}</h3>
                  <p className="text-xs text-muted-foreground">{b.subtitle} -- {b.position}</p>
                  <p className="text-xs text-muted-foreground">Link: {b.link}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={b.active} onCheckedChange={(checked) => setBanners((prev) => prev.map((x) => (x.id === b.id ? { ...x, active: checked } : x)))} />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openBannerEdit(b)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setBanners((prev) => prev.filter((x) => x.id !== b.id))}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="navbar" className="mt-6 space-y-4">
            <div className="flex justify-end">
              <Button onClick={openNavNew} className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="h-4 w-4 mr-2" /> Add Offer Text
              </Button>
            </div>
            {navOffers.map((n) => (
              <div key={n.id} className="flex items-center gap-4 border border-border rounded-sm p-4">
                <Megaphone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="flex-1 text-sm">{n.text}</p>
                <div className="flex items-center gap-2">
                  <Switch checked={n.active} onCheckedChange={(checked) => setNavOffers((prev) => prev.map((x) => (x.id === n.id ? { ...x, active: checked } : x)))} />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openNavEdit(n)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setNavOffers((prev) => prev.filter((x) => x.id !== n.id))}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="popup" className="mt-6 space-y-4">
            <div className="flex justify-end">
              <Button onClick={openOfferNew} className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="h-4 w-4 mr-2" /> Add Popup Offer
              </Button>
            </div>
            {offersList.map((o) => (
              <div key={o.id} className="flex items-center gap-4 border border-border rounded-sm p-4">
                <div className="relative w-20 h-14 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={o.image || "/placeholder.svg"} alt={o.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold">{o.title}</h3>
                  <p className="text-xs text-muted-foreground">{o.discount} -- Valid until {o.validUntil}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openOfferEdit(o)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setOffersList((prev) => prev.filter((x) => x.id !== o.id))}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Banner Modal */}
      <Dialog open={bannerModal} onOpenChange={setBannerModal}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader><DialogTitle className="font-serif">{editBanner ? "Edit" : "Add"} Banner</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-sm font-medium mb-1.5 block">Title *</Label><Input value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Subtitle</Label><Input value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Image URL</Label><Input value={bannerForm.image} onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })} /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Link</Label><Input value={bannerForm.link} onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })} placeholder="/shop" /></div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Position</Label>
              <div className="flex gap-2">
                <Button variant={bannerForm.position === "hero" ? "default" : "outline"} size="sm" onClick={() => setBannerForm({ ...bannerForm, position: "hero" })} className={bannerForm.position === "hero" ? "bg-foreground text-background" : "bg-transparent"}>Hero</Button>
                <Button variant={bannerForm.position === "mid-page" ? "default" : "outline"} size="sm" onClick={() => setBannerForm({ ...bannerForm, position: "mid-page" })} className={bannerForm.position === "mid-page" ? "bg-foreground text-background" : "bg-transparent"}>Mid-page</Button>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setBannerModal(false)}>Cancel</Button>
              <Button onClick={saveBanner} disabled={!bannerForm.title} className="bg-foreground text-background hover:bg-foreground/90">{editBanner ? "Update" : "Add"} Banner</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navbar Offer Modal */}
      <Dialog open={navModal} onOpenChange={setNavModal}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader><DialogTitle className="font-serif">{editNav ? "Edit" : "Add"} Navbar Offer</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-sm font-medium mb-1.5 block">Offer Text *</Label><Input value={navText} onChange={(e) => setNavText(e.target.value)} placeholder="FREE SHIPPING on orders above KSh 5,000" /></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setNavModal(false)}>Cancel</Button>
              <Button onClick={saveNav} disabled={!navText} className="bg-foreground text-background hover:bg-foreground/90">{editNav ? "Update" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup Offer Modal */}
      <Dialog open={offerModal} onOpenChange={setOfferModal}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader><DialogTitle className="font-serif">{editOffer ? "Edit" : "Add"} Popup Offer</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-sm font-medium mb-1.5 block">Title *</Label><Input value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Description</Label><Textarea value={offerForm.description} onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium mb-1.5 block">Discount Label</Label><Input value={offerForm.discount} onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })} placeholder="40% OFF" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Valid Until</Label><Input type="date" value={offerForm.validUntil} onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })} /></div>
            </div>
            <div><Label className="text-sm font-medium mb-1.5 block">Image URL</Label><Input value={offerForm.image} onChange={(e) => setOfferForm({ ...offerForm, image: e.target.value })} /></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setOfferModal(false)}>Cancel</Button>
              <Button onClick={saveOffer} disabled={!offerForm.title} className="bg-foreground text-background hover:bg-foreground/90">{editOffer ? "Update" : "Add"} Offer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
