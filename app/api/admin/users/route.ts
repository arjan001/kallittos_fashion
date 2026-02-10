import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Check if requesting user is super_admin
  const { data: currentUser } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", user.id)
    .single()

  if (currentUser?.role !== "super_admin") {
    return NextResponse.json({ error: "Only super admins can modify users" }, { status: 403 })
  }

  const body = await request.json()
  const { id, role, is_active, display_name } = body

  const updates: Record<string, unknown> = {}
  if (role !== undefined) updates.role = role
  if (is_active !== undefined) updates.is_active = is_active
  if (display_name !== undefined) updates.display_name = display_name

  const { data, error } = await supabase
    .from("admin_users")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Check if requesting user is super_admin
  const { data: currentUser } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", user.id)
    .single()

  if (currentUser?.role !== "super_admin") {
    return NextResponse.json({ error: "Only super admins can delete users" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 })

  // Prevent self-delete
  if (id === user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
  }

  const { error } = await supabase
    .from("admin_users")
    .delete()
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
