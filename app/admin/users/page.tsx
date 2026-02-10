import { AdminShell } from "@/components/admin/admin-shell"
import { UsersManagement } from "@/components/admin/users"

export default function AdminUsersPage() {
  return (
    <AdminShell title="Users & Roles">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage admin users, roles, and permissions</p>
      </div>
      <UsersManagement />
    </AdminShell>
  )
}
