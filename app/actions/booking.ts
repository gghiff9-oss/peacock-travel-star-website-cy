'use server'

import { createClient } from '@/lib/supabase/server'

export type BookingState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: Partial<Record<string, string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s-]{8,20}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function createBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const tourId = String(formData.get('tour_id') ?? '')
  const fullName = String(formData.get('full_name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const phone = String(formData.get('phone') ?? '').trim()
  const departureDate = String(formData.get('departure_date') ?? '')
  const participantsRaw = String(formData.get('participants') ?? '')
  const notes = String(formData.get('notes') ?? '').trim()

  const fieldErrors: Record<string, string> = {}
  const participants = Number(participantsRaw)

  if (fullName.length < 2 || fullName.length > 120) fieldErrors.full_name = 'Masukkan nama lengkap Anda.'
  if (!EMAIL_RE.test(email) || email.length > 160) fieldErrors.email = 'Masukkan alamat email yang valid.'
  if (!PHONE_RE.test(phone)) fieldErrors.phone = 'Masukkan nomor WhatsApp yang valid.'
  if (!Number.isInteger(participants) || participants < 1 || participants > 50)
    fieldErrors.participants = 'Jumlah peserta 1 - 50 orang.'
  const today = new Date().toISOString().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate) || departureDate < today)
    fieldErrors.departure_date = 'Pilih tanggal keberangkatan yang akan datang.'
  if (notes.length > 1000) fieldErrors.notes = 'Catatan maksimal 1000 karakter.'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Mohon periksa kembali data Anda.', fieldErrors }
  }

  if (!UUID_RE.test(tourId)) {
    return {
      status: 'error',
      message: 'Booking online belum aktif untuk paket ini. Silakan pesan melalui WhatsApp kami.',
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').insert({
  tour_id: tourId,
  customer_name: fullName,
  email,
  whatsapp: phone,
  travel_date: departureDate,
  participants,
  notes: notes || null,
  payment_status: 'unpaid',
  payment_method: null,
  payment_proof_url: null,
})

  if (error) {
    console.error('[booking] insert failed:', error.message)
    return {
      status: 'error',
      message: 'Maaf, pemesanan gagal diproses. Silakan coba lagi atau hubungi kami via WhatsApp.',
    }
  }

  return {
    status: 'success',
    message: 'Terima kasih! Pemesanan Anda telah kami terima. Tim kami akan menghubungi Anda dalam 1x24 jam.',
  }
}
