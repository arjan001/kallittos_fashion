import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  // Get current row ID
  const { data: current } = await supabase.from("site_settings").select("id").limit(1).single()
  if (!current) return NextResponse.json({ error: "No settings row found" }, { status: 404 })

  const { error } = await supabase
    .from("site_settings")
    .update({
      store_name: body.storeName,
      store_tagline: body.storeTagline,
      store_email: body.storeEmail,
      store_phone: body.storePhone,
      store_address: body.storeAddress,
      currency: body.currency,
      whatsapp_number: body.whatsappNumber,
      meta_title: body.metaTitle,
      meta_description: body.metaDescription,
      meta_keywords: body.metaKeywords,
      primary_color: body.primaryColor,
      secondary_color: body.secondaryColor,
      font_heading: body.fontHeading,
      font_body: body.fontBody,
      logo_url: body.logoUrl,
      favicon_url: body.faviconUrl,
      footer_text: body.footerText,
      social_instagram: body.socialInstagram,
      social_tiktok: body.socialTiktok,
      social_twitter: body.socialTwitter,
      social_facebook: body.socialFacebook,
      free_shipping_threshold: body.freeShippingThreshold,
      enable_whatsapp_checkout: body.enableWhatsappCheckout,
      enable_newsletter: body.enableNewsletter,
      maintenance_mode: body.maintenanceMode,
    })
    .eq("id", current.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
