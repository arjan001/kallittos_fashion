import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Verify requesting user is super_admin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: currentUser } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", user.id)
    .single()

  if (currentUser?.role !== "super_admin") {
    return NextResponse.json({ error: "Only super admins can add users" }, { status: 403 })
  }

  const { email, displayName, password, role } = await request.json()

  if (!email || !displayName || !password || !role) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
  }

  // Use the service role admin client to create the user
  // This does NOT affect the currently logged-in admin's session
  const adminClient = createAdminClient()

  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm the email
    user_metadata: {
      display_name: displayName,
      role,
    },
  })

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 400 })
  }

  // The DB trigger auto-creates the admin_users row, but let's ensure the role is correct
  if (newUser?.user) {
    await adminClient
      .from("admin_users")
      .update({ role, display_name: displayName, is_active: true })
      .eq("id", newUser.user.id)
  }

  return NextResponse.json({ success: true })
}
