export type TourCategory = 'domestik' | 'internasional'

export type Tour = {
  id: string
  slug: string
  title: string
  destination: string
  country: string
  category: TourCategory
  description: string
  price: number
  duration_days: number
  duration_nights: number
  facilities: string[]
  highlights: string[]
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  created_at?: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export type Booking = {
  id: string
  tour_id: string
  full_name: string
  email: string
  phone: string
  departure_date: string
  participants: number
  notes: string | null
  total_price: number | null
  status: BookingStatus
  created_at: string
  tours?: { title: string; slug: string } | null
}
