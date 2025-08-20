import { createServerClient } from "@/lib/supabase/server"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
  const supabase = createServerClient()
  if (!supabase) {
    return <div>Database not configured</div>
  }

  // For now, we'll skip authentication and go directly to dashboard
  // In production, you'd want proper admin authentication here

  return <AdminDashboard />
}
