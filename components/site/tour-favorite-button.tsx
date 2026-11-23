'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

const STORAGE_KEY = 'peacock-travel-favorites'

export function TourFavoriteButton({ slug }: { slug: string }) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setFavorite(saved.includes(slug))
    } catch {
      setFavorite(false)
    }
  }, [slug])

  function toggleFavorite() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const updated = favorite
        ? saved.filter((item: string) => item !== slug)
        : [...saved, slug]

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setFavorite(!favorite)
    } catch {
      return
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
      aria-pressed={favorite}
      className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-navy shadow-md transition hover:scale-110"
    >
      <Heart
        className="size-5"
        fill={favorite ? 'currentColor' : 'none'}
        color={favorite ? '#dc2626' : 'currentColor'}
      />
    </button>
  )
}
