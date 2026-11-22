import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const CATEGORIES = [
  {
    href: '/paket?kategori=domestik',
    title: 'Pesona Nusantara',
    label: 'Tour Domestik',
    description: 'Bali, Labuan Bajo, Raja Ampat, dan keajaiban Indonesia lainnya.',
    image: '/images/labuan-bajo.png',
    alt: 'Kapal phinisi di perairan Labuan Bajo',
  },
  {
    href: '/paket?kategori=internasional',
    title: 'Jelajah Mancanegara',
    label: 'Tour Internasional',
    description: 'Jepang, Swiss, Turki, dan destinasi impian di seluruh dunia.',
    image: '/images/switzerland.png',
    alt: 'Desa di Pegunungan Alpen Swiss dengan danau biru',
  },
]

export function Categories() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-8">
        <SectionHeading
          eyebrow="Kategori Perjalanan"
          title="Pilih Petualangan Anda"
          description="Dari keindahan tropis Indonesia hingga ikon-ikon dunia, kami siap mengantar Anda ke mana saja."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-8 md:p-10"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/40 to-transparent" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{cat.label}</p>
              <div className="mt-2 flex items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-semibold text-white">{cat.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-white/80">{cat.description}</p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
