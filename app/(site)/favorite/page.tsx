import type { Metadata } from 'next'
import { getActiveTours } from '@/lib/tours'
import { FavoriteTours } from '@/components/site/favorite-tours'

export const metadata: Metadata = {
  title: 'Paket Favorit | Peacock Travel Star',
  description: 'Lihat paket perjalanan favorit Anda.',
}

export default async function FavoritePage() {
  const { tours } = await getActiveTours()

  return (
    <main className="min-h-screen bg-cream">
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
            Peacock Travel Star
          </p>
          <h1 className="text-3xl font-bold text-navy md:text-4xl">
            Paket Favorit ❤️
          </h1>
          <p className="mt-3 text-muted-foreground">
            Semua perjalanan pilihan yang kamu simpan ada di sini.
          </p>
        </div>

        <FavoriteTours tours={tours} />
      </section>
    </main>
  )
}
