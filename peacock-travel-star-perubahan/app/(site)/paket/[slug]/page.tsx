import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Clock, Globe, MapPin, MessageCircle, Star } from 'lucide-react'
import { BookingForm } from '@/components/tour/booking-form'
import { getTourBySlug } from '@/lib/tours'
import { formatDuration, formatRupiah, whatsappLink } from '@/lib/format'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { tour } = await getTourBySlug(slug)
  if (!tour) return { title: 'Paket tidak ditemukan' }
  return { title: tour.title, description: tour.description.slice(0, 160) }
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const { tour } = await getTourBySlug(slug)
  if (!tour) notFound()

  const facts = [
    { icon: Clock, label: 'Durasi', value: formatDuration(tour.duration_days, tour.duration_nights) },
    { icon: MapPin, label: 'Destinasi', value: tour.destination },
    { icon: Globe, label: 'Kategori', value: tour.category === 'domestik' ? 'Domestik' : 'Internasional' },
  ]

  return (
    <>
      <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={tour.image_url || '/placeholder.jpg'}
          alt={`Pemandangan ${tour.destination}`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/50 to-navy/10" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pt-24 pb-12 md:px-8">
          <Link href="/paket" className="inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-gold">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali ke katalog
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{tour.country}</p>
          <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-6xl">{tour.title}</h1>
          <p className="flex items-center gap-2 text-white/85">
            <MapPin className="size-4 text-gold" aria-hidden="true" />
            {tour.destination}
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1fr_440px]">
          <div className="flex flex-col gap-10">
            <dl className="grid gap-4 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col-reverse">
                    <dd className="text-sm font-semibold text-navy">{value}</dd>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                  </div>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-navy">Tentang Perjalanan</h2>
              <p className="leading-relaxed text-muted-foreground">{tour.description}</p>
            </div>

            {tour.highlights.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-navy">Highlight Perjalanan</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 text-sm text-navy">
                      <Star className="size-4 shrink-0 fill-gold text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.facilities.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-navy">Fasilitas Termasuk</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.facilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                        <Check className="size-3.5 text-gold" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-navy p-6">
              <div>
                <p className="text-xs text-white/70">Harga mulai dari</p>
                <p className="font-serif text-3xl font-semibold text-gold">{formatRupiah(tour.price)}</p>
                <p className="text-xs text-white/70">per orang</p>
              </div>
              <a
                href={whatsappLink(`Halo Cliffton, saya tertarik dengan paket ${tour.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                Tanya
              </a>
            </div>
            <BookingForm tour={tour} />
          </aside>
        </div>
      </section>
    </>
  )
}
