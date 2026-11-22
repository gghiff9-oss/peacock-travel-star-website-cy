import Link from 'next/link'
import { whatsappLink } from '@/lib/format'
import { goldButtonClass } from '@/lib/styles'

export function Cta() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Siap Berangkat?</p>
        <h2 className="text-3xl font-semibold text-navy md:text-5xl">Rencanakan Perjalanan Impian Anda Bersama Kami</h2>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Butuh bantuan memilih destinasi atau paket wisata? Hubungi tim Peacock Travel Star untuk mendapatkan informasi perjalanan.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/paket" className="inline-flex h-11 items-center justify-center rounded-md bg-navy px-6 text-sm font-semibold text-white hover:bg-navy/90">
            Jelajahi Paket
          </Link>
          <a
            href={whatsappLink('Halo Cliffton, saya ingin bertanya tentang rencana perjalanan.')}
            target="_blank"
            rel="noopener noreferrer"
            className={goldButtonClass}
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
