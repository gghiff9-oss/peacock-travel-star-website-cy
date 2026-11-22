'use client'

import { useActionState, useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { createBooking, type BookingState } from '@/app/actions/booking'
import { formatRupiah, whatsappLink } from '@/lib/format'
import { goldButtonClass, inputClass, labelClass } from '@/lib/styles'
import type { Tour } from '@/lib/types'

const initialState: BookingState = { status: 'idle', message: '' }

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs text-destructive">
      {message}
    </p>
  )
}

export function BookingForm({ tour }: { tour: Tour }) {
  const [state, formAction, isPending] = useActionState(createBooking, initialState)
  const [participants, setParticipants] = useState(2)
  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  const total = tour.price * (Number.isFinite(participants) ? Math.max(participants, 0) : 0)
  const errors = state.fieldErrors ?? {}

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-gold/40 bg-card p-8 text-center" role="status">
        <CheckCircle2 className="size-12 text-gold" aria-hidden="true" />
        <h3 className="text-2xl font-semibold text-navy">Booking Berhasil</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{state.message}</p>
        <a
          href={whatsappLink(`Halo, saya baru saja booking paket ${tour.title}. Mohon konfirmasinya.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={goldButtonClass}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Konfirmasi via WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8" noValidate>
      <input type="hidden" name="tour_id" value={tour.id} />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-navy">Booking Online</h2>
        <p className="text-sm text-muted-foreground">Isi formulir di bawah, tim kami akan segera menghubungi Anda.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="full_name" className={labelClass}>Nama lengkap</label>
        <input id="full_name" name="full_name" required autoComplete="name" className={inputClass}
          aria-invalid={!!errors.full_name} aria-describedby="full_name-error" />
        <FieldError id="full_name-error" message={errors.full_name} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass}
            aria-invalid={!!errors.email} aria-describedby="email-error" />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>No. WhatsApp</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="08xxxxxxxxxx" className={inputClass}
            aria-invalid={!!errors.phone} aria-describedby="phone-error" />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="departure_date" className={labelClass}>Tanggal keberangkatan</label>
          <input id="departure_date" name="departure_date" type="date" required min={minDate} className={inputClass}
            aria-invalid={!!errors.departure_date} aria-describedby="departure_date-error" />
          <FieldError id="departure_date-error" message={errors.departure_date} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="participants" className={labelClass}>Jumlah peserta</label>
          <input id="participants" name="participants" type="number" min={1} max={50} required
            value={participants} onChange={(e) => setParticipants(Number(e.target.value))} className={inputClass}
            aria-invalid={!!errors.participants} aria-describedby="participants-error" />
          <FieldError id="participants-error" message={errors.participants} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className={labelClass}>
          Catatan <span className="font-normal text-muted-foreground">(opsional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} maxLength={1000}
          placeholder="Permintaan khusus, kebutuhan diet, dll."
          className={`${inputClass} h-auto py-3`} />
        <FieldError id="notes-error" message={errors.notes} />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-cream px-4 py-3">
        <span className="text-sm text-muted-foreground">Estimasi total</span>
        <span className="font-serif text-xl font-semibold text-navy">{formatRupiah(total)}</span>
      </div>

      {state.status === 'error' && (
        <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={isPending} className={goldButtonClass}>
        {isPending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {isPending ? 'Memproses...' : 'Pesan Sekarang'}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Harga final dihitung oleh sistem dan dikonfirmasi oleh tim kami sebelum pembayaran.
      </p>
    </form>
  )
}
