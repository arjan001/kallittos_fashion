"use client"

import { useState } from "react"
import { Save, Globe, Palette, FileText, Phone, MapPin, Mail, Instagram, Music2 } from "lucide-react"
import { AdminShell } from "./admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminSettings() {
  const [saved, setSaved] = useState(false)

  // SEO
  const [seo, setSeo] = useState({
    siteTitle: "Kallitos Fashion - Thrift & New Fashion",
    siteDescription: "Discover curated thrifted and brand-new fashion pieces at Kallitos Fashion. Dresses, tops, bodysuits, jackets, jewellery and more.",
    metaKeywords: "fashion, thrift, clothes, dresses, tops, Kenya, Nairobi",
    ogImage: "",
    googleAnalyticsId: "",
    facebookPixelId: "",
    canonicalUrl: "https://kallitosfashion.com",
    robotsTxt: "User-agent: *\nAllow: /",
  })

  // Theme
  const [theme, setTheme] = useState({
    primaryColor: "#0a0a0a",
    accentColor: "#fafafa",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
    logoText: "Kallitos Fashion",
    logoImageUrl: "",
    faviconUrl: "",
    showRecentPurchase: true,
    showOfferModal: true,
    showNewsletter: true,
  })

  // Footer
  const [footer, setFooter] = useState({
    description: "Curated thrift and brand-new fashion pieces. Style made affordable, delivered to your doorstep.",
    address: "Philadelphia House, 3rd Floor Wing B Room 9",
    phone: "0780 406 059",
    email: "info@kallitosfashion.com",
    whatsapp: "254780406059",
    instagram: "",
    tiktok: "",
    twitter: "",
    openHours: "Mon - Sat: 9AM - 6PM",
    dispatchDays: "Tuesdays & Fridays",
    copyrightText: "2026 Kallitos Fashion. All rights reserved.",
    showPrivacyPolicy: true,
    showTerms: true,
    showRefundPolicy: true,
  })

  // Store
  const [store, setStore] = useState({
    storeName: "Kallitos Fashion",
    storeEmail: "info@kallitosfashion.com",
    storePhone: "0780406059",
    whatsappNumber: "254780406059",
    currency: "KSh",
    freeShippingThreshold: "5000",
    enableWhatsappCheckout: true,
    enableQuickCheckout: true,
    orderPrefix: "KF",
    maintenanceMode: false,
  })

  const handleSave = () => {
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
          <Button onClick={handleSave} className="bg-foreground text-background hover:bg-foreground/90">
            <Save className="h-4 w-4 mr-2" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="bg-secondary flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          {/* General Store Settings */}
          <TabsContent value="general" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Store Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Name</Label><Input value={store.storeName} onChange={(e) => setStore({ ...store, storeName: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Email</Label><Input value={store.storeEmail} onChange={(e) => setStore({ ...store, storeEmail: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Store Phone</Label><Input value={store.storePhone} onChange={(e) => setStore({ ...store, storePhone: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">WhatsApp Number</Label><Input value={store.whatsappNumber} onChange={(e) => setStore({ ...store, whatsappNumber: e.target.value })} placeholder="254..." /></div>
                </div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Checkout & Orders</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Currency Symbol</Label><Input value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Free Shipping Threshold</Label><Input type="number" value={store.freeShippingThreshold} onChange={(e) => setStore({ ...store, freeShippingThreshold: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Order Number Prefix</Label><Input value={store.orderPrefix} onChange={(e) => setStore({ ...store, orderPrefix: e.target.value })} /></div>
                </div>
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">WhatsApp Checkout</p><p className="text-xs text-muted-foreground">Enable ordering via WhatsApp</p></div>
                    <Switch checked={store.enableWhatsappCheckout} onCheckedChange={(checked) => setStore({ ...store, enableWhatsappCheckout: checked })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">Quick Checkout</p><p className="text-xs text-muted-foreground">Allow single-product quick checkout</p></div>
                    <Switch checked={store.enableQuickCheckout} onCheckedChange={(checked) => setStore({ ...store, enableQuickCheckout: checked })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable the storefront</p></div>
                    <Switch checked={store.maintenanceMode} onCheckedChange={(checked) => setStore({ ...store, maintenanceMode: checked })} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><Globe className="h-4 w-4" /> Meta Tags</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Site Title</Label><Input value={seo.siteTitle} onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Meta Description</Label><Textarea value={seo.siteDescription} onChange={(e) => setSeo({ ...seo, siteDescription: e.target.value })} rows={3} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Meta Keywords</Label><Input value={seo.metaKeywords} onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Canonical URL</Label><Input value={seo.canonicalUrl} onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">OG Image URL</Label><Input value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} placeholder="https://..." /></div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Tracking & Analytics</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Google Analytics ID</Label><Input value={seo.googleAnalyticsId} onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Facebook Pixel ID</Label><Input value={seo.facebookPixelId} onChange={(e) => setSeo({ ...seo, facebookPixelId: e.target.value })} placeholder="123456789" /></div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">robots.txt</h3>
                <Textarea value={seo.robotsTxt} onChange={(e) => setSeo({ ...seo, robotsTxt: e.target.value })} rows={4} className="font-mono text-xs" />
              </div>
            </div>
          </TabsContent>

          {/* Theme */}
          <TabsContent value="theme" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><Palette className="h-4 w-4" /> Branding</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Logo Text</Label><Input value={theme.logoText} onChange={(e) => setTheme({ ...theme, logoText: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Logo Image URL</Label><Input value={theme.logoImageUrl} onChange={(e) => setTheme({ ...theme, logoImageUrl: e.target.value })} placeholder="Optional" /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Favicon URL</Label><Input value={theme.faviconUrl} onChange={(e) => setTheme({ ...theme, faviconUrl: e.target.value })} placeholder="Optional" /></div>
                </div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Colors & Fonts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="w-10 h-10 border border-border rounded-sm cursor-pointer" />
                      <Input value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={theme.accentColor} onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })} className="w-10 h-10 border border-border rounded-sm cursor-pointer" />
                      <Input value={theme.accentColor} onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })} className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Heading Font</Label>
                    <Select value={theme.fontHeading} onValueChange={(val) => setTheme({ ...theme, fontHeading: val })}>
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
                    <Select value={theme.fontBody} onValueChange={(val) => setTheme({ ...theme, fontBody: val })}>
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

              <div className="border border-border rounded-sm p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Storefront Features</h3>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Recent Purchase Popup</p><p className="text-xs text-muted-foreground">Show social proof notifications</p></div>
                  <Switch checked={theme.showRecentPurchase} onCheckedChange={(checked) => setTheme({ ...theme, showRecentPurchase: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Offer Modal</p><p className="text-xs text-muted-foreground">Show popup offer on first visit</p></div>
                  <Switch checked={theme.showOfferModal} onCheckedChange={(checked) => setTheme({ ...theme, showOfferModal: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Newsletter Section</p><p className="text-xs text-muted-foreground">Display newsletter signup on homepage</p></div>
                  <Switch checked={theme.showNewsletter} onCheckedChange={(checked) => setTheme({ ...theme, showNewsletter: checked })} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Footer */}
          <TabsContent value="footer" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"><FileText className="h-4 w-4" /> Footer Content</h3>
                <div><Label className="text-sm font-medium mb-1.5 block">Footer Description</Label><Textarea value={footer.description} onChange={(e) => setFooter({ ...footer, description: e.target.value })} rows={3} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Copyright Text</Label><Input value={footer.copyrightText} onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })} /></div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Phone</Label><Input value={footer.phone} onChange={(e) => setFooter({ ...footer, phone: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Email</Label><Input value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">WhatsApp</Label><Input value={footer.whatsapp} onChange={(e) => setFooter({ ...footer, whatsapp: e.target.value })} /></div>
                </div>
                <div><Label className="text-sm font-medium mb-1.5 block">Physical Address</Label><Textarea value={footer.address} onChange={(e) => setFooter({ ...footer, address: e.target.value })} rows={2} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Opening Hours</Label><Input value={footer.openHours} onChange={(e) => setFooter({ ...footer, openHours: e.target.value })} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Dispatch Days</Label><Input value={footer.dispatchDays} onChange={(e) => setFooter({ ...footer, dispatchDays: e.target.value })} /></div>
                </div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Social Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium mb-1.5 block">Instagram URL</Label><Input value={footer.instagram} onChange={(e) => setFooter({ ...footer, instagram: e.target.value })} placeholder="https://instagram.com/..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">TikTok URL</Label><Input value={footer.tiktok} onChange={(e) => setFooter({ ...footer, tiktok: e.target.value })} placeholder="https://tiktok.com/..." /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Twitter/X URL</Label><Input value={footer.twitter} onChange={(e) => setFooter({ ...footer, twitter: e.target.value })} placeholder="https://x.com/..." /></div>
                </div>
              </div>

              <div className="border border-border rounded-sm p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Footer Pages</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Privacy Policy Page</p>
                  <Switch checked={footer.showPrivacyPolicy} onCheckedChange={(checked) => setFooter({ ...footer, showPrivacyPolicy: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Terms of Service Page</p>
                  <Switch checked={footer.showTerms} onCheckedChange={(checked) => setFooter({ ...footer, showTerms: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Refund Policy Page</p>
                  <Switch checked={footer.showRefundPolicy} onCheckedChange={(checked) => setFooter({ ...footer, showRefundPolicy: checked })} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  )
}
