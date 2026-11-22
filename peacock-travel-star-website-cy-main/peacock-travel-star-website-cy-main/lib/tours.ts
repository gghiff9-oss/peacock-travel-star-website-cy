import { createClient } from '@/lib/supabase/server'
import { sampleTours } from '@/lib/sample-tours'
import type { Tour } from '@/lib/types'

const TOUR_COLUMNS =
  'id, slug, title, destination, country, category, description, price, duration_days, duration_nights, facilities, highlights, image_url, is_featured, is_active, created_at'

export async function getActiveTours(): Promise<{ tours: Tour[]; isSample: boolean }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tours')
      .select(TOUR_COLUMNS)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return { tours: sampleTours, isSample: true }
    }
    return { tours: data as Tour[], isSample: false }
  } catch {
    return { tours: sampleTours, isSample: true }
  }
}

export async function getTourBySlug(slug: string) {
  const { tours, isSample } = await getActiveTours()
  return { tour: tours.find((t) => t.slug === slug) ?? null, isSample }
}

export type TourFilters = {
  q?: string
  kategori?: string
  durasi?: string
  harga?: string
  urut?: string
}

export function filterTours(tours: Tour[], filters: TourFilters) {
  const q = filters.q?.trim().toLowerCase()
  let result = tours.filter((tour) => {
    if (q) {
      const haystack = `${tour.title} ${tour.destination} ${tour.country}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (filters.kategori === 'domestik' || filters.kategori === 'internasional') {
      if (tour.category !== filters.kategori) return false
    }
    if (filters.durasi === 'pendek' && tour.duration_days > 4) return false
    if (filters.durasi === 'sedang' && (tour.duration_days < 5 || tour.duration_days > 7)) return false
    if (filters.durasi === 'panjang' && tour.duration_days < 8) return false
    if (filters.harga === '10' && tour.price > 10_000_000) return false
    if (filters.harga === '25' && tour.price > 25_000_000) return false
    if (filters.harga === '50' && tour.price > 50_000_000) return false
    return true
  })

  if (filters.urut === 'termurah') result = [...result].sort((a, b) => a.price - b.price)
  if (filters.urut === 'termahal') result = [...result].sort((a, b) => b.price - a.price)
  if (filters.urut === 'durasi') result = [...result].sort((a, b) => a.duration_days - b.duration_days)

  return result
}
