import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { TourCard } from '@/components/site/tour-card'
import type { Tour } from '@/lib/types'

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Paket Unggulan"
            title="Perjalanan Pilihan Musim Ini"
            description="Koleksi paket favorit para traveler kami, dirancang dengan akomodasi terbaik dan itinerary yang seimbang."
          />
          <Link
            href="/paket"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:text-gold hover:underline"
          >
            Lihat semua paket
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
