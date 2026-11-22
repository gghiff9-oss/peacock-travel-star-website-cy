'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Loader2, MailCheck } from 'lucide-react'
import { AuthShell } from '@/components/admin/auth-shell'
import { createClient } from '@/lib/supabase/client'
import { inputClass, labelClass, navyButtonClass } from '@/lib/styles'

export default function AdminSignUpPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = String(form.get('password'))
    if (password !== String(form.get('confirm'))) {
      setError('Konfirmasi kata sandi tidak cocok.')
      return
    }
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: String(form.get('email')),
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)
    if (error) {
      const m = error.message.toLowerCase()
      if (m.includes('password')) setError('Kata sandi terlalu lemah. Gunakan minimal 8 karakter.')
      else if (error.status === 429 || m.includes('rate limit')) setError('Terlalu banyak percobaan. Coba lagi nanti.')
      else setError('Pendaftaran gagal. Coba lagi.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <AuthShell title="Cek email Anda" description="Kami telah mengirim tautan konfirmasi.">
        <div className="flex flex-col items-center gap-4 text-center">
          <MailCheck className="size-10 text-gold" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Setelah email dikonfirmasi, akun Anda perlu diberi akses admin oleh pemilik sistem sebelum dapat masuk ke dashboard.
          </p>
          <Link href="/admin/login" className="text-sm font-medium text-navy underline underline-offset-4">Ke halaman login</Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Daftar Akun Admin" description="Akun baru memerlukan persetujuan sebelum aktif.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={labelClass}>Kata sandi</label>
          <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm" className={labelClass}>Ulangi kata sandi</label>
          <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
        </div>
        {error && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className={navyButtonClass}>
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{' '}
          <Link href="/admin/login" className="font-medium text-navy underline underline-offset-4 hover:text-gold">Masuk</Link>
        </p>
      </form>
    </AuthShell>
  )
}
