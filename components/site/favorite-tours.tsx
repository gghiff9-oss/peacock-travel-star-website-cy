'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Trash2, Heart } from 'lucide-react'
import { formatDuration, formatRupiah } from '@/lib/format'
import type { Tour } from '@/lib/types'

const STORAGE_KEY = 'peacock-travel-favorites'

export function FavoriteTours({ tours }: { tours: Tour[] }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved)) setFavorites(saved)
    } catch {
      setFavorites([])
    }
    setLoaded(true)
  }, [])

  function removeFavorite(slug: string) {
    const updated = favorites.filter((item) => item !== slug)
    setFavorites(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  if (!loaded) return <p>Memuat paket favorit...</p>

  const favoriteTours = tours.filter((tour) => favorites.includes(tour.slug))

  if (favoriteTours.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
        <Heart className="mx-auto mb-4 size-12 text-red-400" />
        <h2 className="text-xl font-semibold text-navy">
          Belum ada paket favorit
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tekan tombol hati pada paket tour untuk menyimpannya.
        </p>
        <Link
          href="/paket"
          className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white"
        >
          Lihat Paket Tour
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteTours.map((tour) => (
        <article
          key={tour.id}
          className="group overflow-hidden rounded-xl border border-border bg-card"
        >
          <Link
            href={`/paket/${tour.slug}`}
            className="relative block aspect-[4/3] overflow-hidden"
          >
            <Image
              src={tour.image_url || '/placeholder.jpg'}
              alt={Pemandangan ${tour.destination}}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <div className="flex flex-col gap-3 p-5">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-gold" />
              {tour.destination}
            </p>

            <Link
              href={/paket/${tour.slug}}
              className="text-lg font-semibold text-navy hover:text-gold"
            >
              {tour.title}
            </Link>

            <div className="flex items-end justify-between border-t border-border pt-3">
              <div>
                <p className="text-xs text-muted-foreground">Mulai dari</p>
                <p className="font-serif text-xl font-semibold text-navy">
                  {formatRupiah(tour.price)}
                </p>
                <p className="text-xs text-muted-foreground">per orang</p>
              </div>

              <p className="flex items-center gap-1 text-sm text-navy">
                <Clock className="size-4 text-gold" />
                {formatDuration(tour.duration_days, tour.duration_nights)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeFavorite(tour.slug)}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <Trash2 className="size-4" />
              Hapus Favorit
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
