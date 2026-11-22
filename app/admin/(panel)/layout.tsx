import type { Metadata } from 'next'
import { LogOut } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { AdminNav } from '@/components/admin/admin-nav'
import { requireAdmin } from '@/lib/admin'
import { signOut } from '@/app/admin/actions'

export const metadata: Metadata = { title: 'Dashboard Admin', robots: { index: false } }

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin()

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      <aside className="flex flex-col gap-6 bg-navy px-4 py-5 lg:sticky lg:top-0 lg:h-svh lg:w-64 lg:shrink-0 lg:px-5 lg:py-8">
        <Logo light />
        <AdminNav />
        <div className="mt-auto hidden flex-col gap-3 border-t border-white/10 pt-5 lg:flex">
          <p className="truncate text-xs text-white/60" title={user.email}>{user.email}</p>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold">
              <LogOut className="size-4" aria-hidden="true" />
              Keluar
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 px-4 py-8 md:px-8 lg:py-10">
        {children}
        <form action={signOut} className="mt-10 lg:hidden">
          <button type="submit" className="flex items-center gap-2 text-sm font-medium text-navy">
            <LogOut className="size-4" aria-hidden="true" />
            Keluar ({user.email})
          </button>
        </form>
      </main>
    </div>
  )
}
