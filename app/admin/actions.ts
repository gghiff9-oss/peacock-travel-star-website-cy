'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin'
import { createClient } from '@/lib/supabase/server'

export type TourFormState = { status: 'idle' | 'error'; message: string }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function lines(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export async function saveTour(_prev: TourFormState, formData: FormData): Promise<TourFormState> {
  const { supabase } = await requireAdmin()

  const id = String(formData.get('id') ?? '')
  const title = String(formData.get('title') ?? '').trim()
  const slug = slugify(String(formData.get('slug') ?? '') || title)
  const destination = String(formData.get('destination') ?? '').trim()
  const country = String(formData.get('country') ?? '').trim()
  const category = String(formData.get('category') ?? '')
  const description = String(formData.get('description') ?? '').trim()
  const price = Number(formData.get('price'))
  const durationDays = Number(formData.get('duration_days'))
  const durationNights = Number(formData.get('duration_nights'))
  const imageUrl = String(formData.get('image_url') ?? '').trim()

  if (!title || !slug || !destination || !country || !description)
    return { status: 'error', message: 'Lengkapi semua kolom wajib.' }
  if (category !== 'domestik' && category !== 'internasional')
    return { status: 'error', message: 'Kategori tidak valid.' }
  if (!Number.isFinite(price) || price <= 0) return { status: 'error', message: 'Harga harus lebih dari 0.' }
  if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 60)
    return { status: 'error', message: 'Durasi hari tidak valid (1 - 60).' }
  if (!Number.isInteger(durationNights) || durationNights < 0 || durationNights > 60)
    return { status: 'error', message: 'Durasi malam tidak valid.' }
  if (imageUrl && !/^(\/|https:\/\/)/.test(imageUrl))
    return { status: 'error', message: 'URL gambar harus diawali "/" atau "https://".' }

  const payload = {
    title,
    slug,
    destination,
    country,
    category,
    description,
    price,
    duration_days: durationDays,
    duration_nights: durationNights,
    facilities: lines(formData.get('facilities')),
    highlights: lines(formData.get('highlights')),
    image_url: imageUrl || null,
    is_featured: formData.get('is_featured') === 'on',
    is_active: formData.get('is_active') === 'on',
  }

  const { error } = id
    ? UUID_RE.test(id)
      ? await supabase.from('tours').update(payload).eq('id', id)
      : { error: { message: 'invalid id', code: '' } }
    : await supabase.from('tours').insert(payload)

  if (error) {
    console.error('[admin] save tour failed:', error.message)
    return {
      status: 'error',
      message: error.code === '23505' ? 'Slug sudah digunakan paket lain.' : 'Gagal menyimpan paket. Coba lagi.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/paket')
}

export async function deleteTour(formData: FormData) {
  const { supabase } = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!UUID_RE.test(id)) return
  const { error } = await supabase.from('tours').delete().eq('id', id)
  if (error) console.error('[admin] delete tour failed:', error.message)
  revalidatePath('/', 'layout')
}

export async function updateBookingStatus(formData: FormData) {
  const { supabase } = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!UUID_RE.test(id) || !['pending', 'confirmed', 'cancelled'].includes(status)) return
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
  if (error) console.error('[admin] update booking failed:', error.message)
  revalidatePath('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
