import Image from 'next/image'
import { Award, Headphones, ShieldCheck, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const POINTS = [
  { icon: Award, title: 'Kurasi Premium', text: 'Hotel, restoran, dan pengalaman dipilih langsung oleh tim kami.' },
  { icon: ShieldCheck, title: 'Aman & Terpercaya', text: 'Berizin resmi, transparan, dan dilengkapi asuransi perjalanan.' },
  { icon: Headphones, title: 'Layanan 24/7', text: 'Tim travel consultant siap membantu sebelum hingga setelah perjalanan.' },
  { icon: Sparkles, title: 'Pengalaman Personal', text: 'Itinerary fleksibel yang dapat disesuaikan dengan keinginan Anda.' },
]

export function WhyUs() {
  return (
    <section id="tentang" className="bg-navy py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:order-2">
          <Image
            src="/images/turkey.png"
            alt="Balon udara di atas lembah Cappadocia saat fajar"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 p-5 shadow-xl">
            <p className="font-serif text-3xl font-semibold text-navy">4.9/5</p>
            <p className="text-xs text-muted-foreground">Rating kepuasan pelanggan</p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Mengapa Peacock Travel Star"
            title="Standar Pelayanan Kelas Atas di Setiap Perjalanan"
            description="Lebih dari satu dekade kami melayani keluarga, pasangan, dan perusahaan untuk menciptakan perjalanan yang tak terlupakan."
            light
          />
          <ul className="grid gap-8 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-3">
                <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                </span>
                <h3 className="font-sans text-base font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
