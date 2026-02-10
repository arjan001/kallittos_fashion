import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Check requesting user is super_admin
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

  // Use Supabase Auth to create the user
  // We use the admin client approach by signing up with the service role
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.headers.get("origin") || ""}/admin`,
      data: {
        display_name: displayName,
        role,
      },
    },
  })

  if (signUpError) {
    return NextResponse.json({ error: signUpError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
