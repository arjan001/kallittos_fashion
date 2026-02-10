import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("delivery_locations")
    .select("*")
    .order("fee", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const locations = (data || []).map((loc) => ({
    id: loc.id,
    name: loc.name,
    fee: Number(loc.fee),
    estimatedDays: loc.estimated_days || "",
    isActive: loc.is_active,
  }))

  return NextResponse.json(locations)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("delivery_locations")
    .insert({
      name: body.name,
      fee: body.fee,
      estimated_days: body.estimatedDays || "",
      is_active: true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { error } = await supabase
    .from("delivery_locations")
    .update({
      name: body.name,
      fee: body.fee,
      estimated_days: body.estimatedDays || "",
      is_active: body.isActive ?? true,
    })
    .eq("id", body.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

  const { error } = await supabase.from("delivery_locations").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
