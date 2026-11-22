import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { formatDuration, formatRupiah } from '@/lib/format'
import type { Tour } from '@/lib/types'

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-navy/10">
      <Link href={`/paket/${tour.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image_url || '/placeholder.jpg'}
          alt={`Pemandangan ${tour.destination}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur">
          {tour.category === 'domestik' ? 'Domestik' : 'Internasional'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <MapPin className="size-3.5 text-gold" aria-hidden="true" />
            {tour.destination}
          </p>
          <h3 className="text-xl font-semibold text-navy">
            <Link href={`/paket/${tour.slug}`} className="hover:text-gold">
              {tour.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Mulai dari</p>
            <p className="font-serif text-xl font-semibold text-navy">{formatRupiah(tour.price)}</p>
            <p className="text-xs text-muted-foreground">per orang</p>
          </div>
          <p className="flex items-center gap-1.5 text-sm font-medium text-navy">
            <Clock className="size-4 text-gold" aria-hidden="true" />
            {formatDuration(tour.duration_days, tour.duration_nights)}
          </p>
        </div>
      </div>
    </article>
  )
}
