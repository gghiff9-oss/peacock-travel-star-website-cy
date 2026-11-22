import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getAdminContext() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, isAdmin: false }

  const { data } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle()
  return { supabase, user, isAdmin: !!data }
}

export async function requireAdmin() {
  const ctx = await getAdminContext()
  if (!ctx.user) redirect('/admin/login')
  if (!ctx.isAdmin) redirect('/admin/akses-ditolak')
  return ctx as typeof ctx & { user: NonNullable<typeof ctx.user> }
}
