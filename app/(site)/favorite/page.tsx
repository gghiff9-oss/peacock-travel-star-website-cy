'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'peacock-travel-favorites'

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved)) setFavorites(saved)
    } catch {
      setFavorites([])
    }
  }, [])

  function removeFavorite(slug: string) {
    const updated = favorites.filter((item) => item !== slug)
    setFavorites(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
          Peacock Travel Star
        </p>
        <h1 className="text-3xl font-bold text-navy">
          Paket Favorit <Heart className="inline size-7 text-red-500" fill="currentColor" />
        </h1>
        <p className="mt-2 text-muted-foreground">
          Daftar paket perjalanan yang kamu simpan.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
          <Heart className="mx-auto mb-4 size-12 text-muted-foreground" />
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
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((slug) => (
            <div
              key={slug}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-5"
            >
              <Link
                href={/paket/${slug}}
                className="break-all font-semibold text-navy hover:text-gold"
              >
                Paket {slug.replaceAll('-', ' ')}
              </Link>
              <button
                type="button"
                onClick={() => removeFavorite(slug)}
                aria-label="Hapus dari favorit"
                className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
