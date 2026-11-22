'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { AuthShell } from '@/components/admin/auth-shell'
import { createClient } from '@/lib/supabase/client'
import { inputClass, labelClass, navyButtonClass } from '@/lib/styles'

function describeError(message: string, status?: number) {
  const m = message.toLowerCase()
  if (m.includes('email not confirmed')) return 'Email belum dikonfirmasi. Periksa kotak masuk Anda.'
  if (status === 429 || m.includes('rate limit')) return 'Terlalu banyak percobaan. Coba lagi beberapa saat.'
  if (m.includes('invalid login credentials')) return 'Email atau kata sandi salah.'
  return 'Terjadi kesalahan tak terduga. Coba lagi.'
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get('email')),
      password: String(form.get('password')),
    })
    if (error) {
      setError(describeError(error.message, error.status))
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <AuthShell title="Login Admin" description="Masuk untuk mengelola paket tour dan pesanan.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={labelClass}>Kata sandi</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
        </div>
        {error && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className={navyButtonClass}>
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <Link href="/admin/daftar" className="font-medium text-navy underline underline-offset-4 hover:text-gold">Daftar</Link>
        </p>
        <Link href="/" className="text-center text-xs text-muted-foreground hover:text-navy">Kembali ke website</Link>
      </form>
    </AuthShell>
  )
}
