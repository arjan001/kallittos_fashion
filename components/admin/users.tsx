"use client"

import { useState } from "react"
import { Shield, ShieldCheck, Eye, Pencil, UserX, MoreHorizontal, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface AdminUser {
  id: string
  display_name: string
  email: string
  role: string
  is_active: boolean
  last_login: string | null
  created_at: string
}

const ROLES = [
  { value: "super_admin", label: "Super Admin", description: "Full system access, user management", icon: ShieldCheck },
  { value: "admin", label: "Admin", description: "Manage products, orders, settings", icon: Shield },
  { value: "editor", label: "Editor", description: "Add and edit products, banners", icon: Pencil },
  { value: "viewer", label: "Viewer", description: "View-only access to dashboard", icon: Eye },
]

function getRoleBadge(role: string) {
  switch (role) {
    case "super_admin": return <Badge className="bg-foreground text-background text-[10px]">Super Admin</Badge>
    case "admin": return <Badge variant="secondary" className="text-[10px]">Admin</Badge>
    case "editor": return <Badge variant="outline" className="text-[10px]">Editor</Badge>
    case "viewer": return <Badge variant="outline" className="text-[10px] text-muted-foreground">Viewer</Badge>
    default: return <Badge variant="outline" className="text-[10px]">{role}</Badge>
  }
}

export function UsersManagement() {
  const { data: users = [], mutate } = useSWR<AdminUser[]>("/api/admin/users", fetcher)
  const [editUser, setEditUser] = useState<AdminUser | null>(null)
  const [editForm, setEditForm] = useState({ display_name: "", role: "", is_active: true })
  const [saving, setSaving] = useState(false)

  const openEdit = (u: AdminUser) => {
    setEditUser(u)
    setEditForm({ display_name: u.display_name, role: u.role, is_active: u.is_active })
  }

  const handleSave = async () => {
    if (!editUser) return
    setSaving(true)
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editUser.id, ...editForm }),
    })
    setSaving(false)
    setEditUser(null)
    mutate()
  }

  const handleToggleActive = async (u: AdminUser) => {
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id, is_active: !u.is_active }),
    })
    mutate()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this user?")) return
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" })
    mutate()
  }

  const activeUsers = users.filter((u) => u.is_active)
  const inactiveUsers = users.filter((u) => !u.is_active)

  return (
    <div className="space-y-8">
      {/* Role Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((r) => (
          <div key={r.value} className="flex items-start gap-3 p-4 border border-border rounded-sm bg-secondary/30">
            <r.icon className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">{r.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Users */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Active Users ({activeUsers.length})</h3>
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2.5 bg-secondary text-xs font-medium text-muted-foreground">
            <div className="col-span-4">User</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Login</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {activeUsers.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No active users found</div>
          ) : (
            activeUsers.map((u) => (
              <div key={u.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-4 py-3 border-t border-border">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                </div>
                <div className="col-span-2">{getRoleBadge(u.role)}</div>
                <div className="col-span-2">
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-700 border-green-200">Active</Badge>
                </div>
                <div className="col-span-2 text-xs text-muted-foreground">
                  {u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never"}
                </div>
                <div className="col-span-2 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(u)}>
                        <Pencil className="h-3.5 w-3.5 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(u)}>
                        <UserX className="h-3.5 w-3.5 mr-2" />
                        Deactivate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(u.id)} className="text-destructive">
                        <UserX className="h-3.5 w-3.5 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Inactive Users */}
      {inactiveUsers.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Inactive Users ({inactiveUsers.length})</h3>
          <div className="border border-border rounded-sm overflow-hidden">
            {inactiveUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between px-4 py-3 border-t border-border first:border-t-0 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getRoleBadge(u.role)}
                  <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => handleToggleActive(u)}>
                    Reactivate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => { if (!open) setEditUser(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details and permissions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Display Name</Label>
              <Input
                value={editForm.display_name}
                onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                className="h-10"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Role</Label>
              <Select value={editForm.role} onValueChange={(v) => setEditForm({ ...editForm, role: v })}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {ROLES.find((r) => r.value === editForm.role)?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-muted-foreground">Inactive users cannot log in</p>
              </div>
              <Switch
                checked={editForm.is_active}
                onCheckedChange={(v) => setEditForm({ ...editForm, is_active: v })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="bg-transparent" onClick={() => setEditUser(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-foreground text-background hover:bg-foreground/90">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
