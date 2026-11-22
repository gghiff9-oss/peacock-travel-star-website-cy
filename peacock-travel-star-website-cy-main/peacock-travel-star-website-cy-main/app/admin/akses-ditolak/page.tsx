import { ShieldAlert } from 'lucide-react'
import { AuthShell } from '@/components/admin/auth-shell'
import { signOut } from '@/app/admin/actions'
import { navyButtonClass } from '@/lib/styles'

export default function AccessDeniedPage() {
  return (
    <AuthShell title="Akses Ditolak" description="Akun Anda belum memiliki hak akses admin.">
      <div className="flex flex-col items-center gap-5 text-center">
        <ShieldAlert className="size-10 text-gold" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Hubungi pemilik sistem untuk menambahkan akun Anda sebagai admin.</p>
        <form action={signOut} className="w-full">
          <button type="submit" className={`${navyButtonClass} w-full`}>Keluar</button>
        </form>
      </div>
    </AuthShell>
  )
}
