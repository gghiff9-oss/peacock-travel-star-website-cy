import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Compass } from 'lucide-react'
import { PageBanner } from '@/components/site/page-banner'
import { TourCard } from '@/components/site/tour-card'
import { TourFilters } from '@/components/catalog/tour-filters'
import { filterTours, getActiveTours, type TourFilters as Filters } from '@/lib/tours'

export const metadata: Metadata = {
  title: 'Katalog Paket Tour',
  description: 'Temukan paket tour domestik dan internasional premium dari Peacock Travel Star.',
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const pick = (key: string) => (typeof params[key] === 'string' ? (params[key] as string) : undefined)
  const filters: Filters = {
    q: pick('q'),
    kategori: pick('kategori'),
    durasi: pick('durasi'),
    harga: pick('harga'),
    urut: pick('urut'),
  }

  const { tours } = await getActiveTours()
  const results = filterTours(tours, filters)

  const title =
    filters.kategori === 'domestik'
      ? 'Paket Tour Domestik'
      : filters.kategori === 'internasional'
        ? 'Paket Tour Internasional'
        : 'Katalog Paket Tour'

  return (
    <>
      <PageBanner
        eyebrow="Katalog Perjalanan"
        title={title}
        description="Pilih perjalanan yang paling sesuai dengan impian, waktu, dan anggaran Anda."
        image="/images/japan.png"
        alt="Gunung Fuji dengan bunga sakura dan pagoda merah"
      />

      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[300px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense>
              <TourFilters />
            </Suspense>
          </aside>

          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Menampilkan <span className="font-semibold text-navy">{results.length}</span> paket wisata
              {filters.q ? (
                <>
                  {' '}untuk <span className="font-semibold text-navy">{`"${filters.q}"`}</span>
                </>
              ) : null}
            </p>

            {results.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-20 text-center">
                <Compass className="size-10 text-gold" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-navy">Paket tidak ditemukan</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Coba ubah kata kunci atau filter Anda, atau hubungi kami via WhatsApp untuk paket custom.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
