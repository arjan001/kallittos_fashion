"use client"

import { useState, useEffect } from "react"
import { Save, Globe, Palette, FileText } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminSettings() {
  const { data: settings, mutate } = useSWR("/api/admin/settings", fetcher)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    storeName: "", storeTagline: "", storeEmail: "", storePhone: "", storeAddress: "",
    currency: "KSh", whatsappNumber: "",
    metaTitle: "", metaDescription: "", metaKeywords: "",
    primaryColor: "#0a0a0a", secondaryColor: "#fafafa",
    fontHeading: "Playfair Display", fontBody: "Inter",
    logoUrl: "", faviconUrl: "",
    footerText: "",
    socialInstagram: "", socialTiktok: "", socialTwitter: "", socialFacebook: "",
    freeShippingThreshold: 5000,
    enableWhatsappCheckout: true, enableNewsletter: true, maintenanceMode: false,
  })

  useEffect(() => {
    if (settings && !settings.error) {
      setForm({
        storeName: settings.store_name || "",
        storeTagline: settings.store_tagline || "",
        storeEmail: settings.store_email || "",
        storePhone: settings.store_phone || "",
        storeAddress: settings.store_address || "",
        currency: settings.currency || "KSh",
        whatsappNumber: settings.whatsapp_number || "",
        metaTitle: settings.meta_title || "",
        metaDescription: settings.meta_description || "",
        metaKeywords: settings.meta_keywords || "",
        primaryColor: settings.primary_color || "#0a0a0a",
        secondaryColor: settings.secondary_color || "#fafafa",
        fontHeading: "Playfair Display",
        fontBody: "Inter",
        logoUrl: settings.logo_url || "",
        faviconUrl: settings.favicon_url || "",
        footerText: settings.footer_about || "",
        socialInstagram: settings.instagram_url || "",
        socialTiktok: settings.tiktok_url || "",
        socialTwitter: settings.twitter_url || "",
        socialFacebook: settings.facebook_url || "",
        freeShippingThreshold: 5000,
        enableWhatsappCheckout: true,
        enableNewsletter: settings.show_newsletter_popup ?? true,
        maintenanceMode: settings.maintenance_mode ?? false,
      })
    }
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    mutate()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminShell title="Settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your store configuration, SEO, theme and footer.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-foreground text-background hover:bg-foreground/90">
            <Save className="h-4 w-4 mr-2" />
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="bg-secondary flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="footer">Footer & Social</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Store Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Name</Label><Input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Tagline</Label><Input value={form.storeTagline} onChange={(e) => setForm({ ...form, storeTagline: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Email</Label><Input value={form.storeEmail} onChange={(e) => setForm({ ...form, storeEmail: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Phone</Label><Input value={form.storePhone} onChange={(e) => setForm({ ...form, storePhone: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">WhatsApp Number</Label><Input value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="254..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Currency Symbol</Label><Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} /></div>
                </div>
                <div><Label className="text-sm font-medium mb-1.5 block">Store Address</Label><Textarea value={form.storeAddress} onChange={(e) => setForm({ ...form, storeAddress: e.target.value })} rows={2} /></div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Checkout & Features</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Free Shipping Threshold (KSh)</Label><Input type="number" value={form.freeShippingThreshold} onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })} /></div>
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">WhatsApp Checkout</p><p className="text-xs text-muted-foreground">Enable ordering via WhatsApp</p></div>
                    <Switch checked={form.enableWhatsappCheckout} onCheckedChange={(checked) => setForm({ ...form, enableWhatsappCheckout: checked })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">Newsletter</p><p className="text-xs text-muted-foreground">Display newsletter signup on homepage</p></div>
                    <Switch checked={form.enableNewsletter} onCheckedChange={(checked) => setForm({ ...form, enableNewsletter: checked })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable the storefront</p></div>
                    <Switch checked={form.maintenanceMode} onCheckedChange={(checked) => setForm({ ...form, maintenanceMode: checked })} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><Globe className="h-4 w-4" /> Meta Tags</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Site Title</Label><Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Meta Description</Label><Textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Meta Keywords</Label><Input value={form.metaKeywords} onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })} /></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theme" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><Palette className="h-4 w-4" /> Branding</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Logo Image URL</Label><Input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="Optional" /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Favicon URL</Label><Input value={form.faviconUrl} onChange={(e) => setForm({ ...form, faviconUrl: e.target.value })} placeholder="Optional" /></div>
                </div>
              </div>
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Colors & Fonts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="w-10 h-10 border border-border rounded-sm cursor-pointer" />
                      <Input value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.secondaryColor} onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })} className="w-10 h-10 border border-border rounded-sm cursor-pointer" />
                      <Input value={form.secondaryColor} onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })} className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Heading Font</Label>
                    <Select value={form.fontHeading} onValueChange={(val) => setForm({ ...form, fontHeading: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Cormorant Garamond">Cormorant Garamond</SelectItem>
                        <SelectItem value="Libre Baskerville">Libre Baskerville</SelectItem>
                        <SelectItem value="DM Serif Display">DM Serif Display</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Body Font</Label>
                    <Select value={form.fontBody} onValueChange={(val) => setForm({ ...form, fontBody: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="DM Sans">DM Sans</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Outfit">Outfit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="footer" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><FileText className="h-4 w-4" /> Footer Content</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Footer Text / Description</Label><Textarea value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} rows={3} /></div>
              </div>
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Social Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Instagram URL</Label><Input value={form.socialInstagram} onChange={(e) => setForm({ ...form, socialInstagram: e.target.value })} placeholder="https://instagram.com/..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">TikTok URL</Label><Input value={form.socialTiktok} onChange={(e) => setForm({ ...form, socialTiktok: e.target.value })} placeholder="https://tiktok.com/..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Twitter/X URL</Label><Input value={form.socialTwitter} onChange={(e) => setForm({ ...form, socialTwitter: e.target.value })} placeholder="https://x.com/..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Facebook URL</Label><Input value={form.socialFacebook} onChange={(e) => setForm({ ...form, socialFacebook: e.target.value })} placeholder="https://facebook.com/..." /></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  )
}
