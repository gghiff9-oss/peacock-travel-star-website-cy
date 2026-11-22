import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { whatsappLink } from '@/lib/format'

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed">
            Biro perjalanan premium yang menghadirkan pengalaman wisata domestik dan internasional berkelas, dirancang
            dengan detail dan pelayanan sepenuh hati.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Paket Wisata</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link href="/paket?kategori=domestik" className="hover:text-gold">Tour Domestik</Link></li>
            <li><Link href="/paket?kategori=internasional" className="hover:text-gold">Tour Internasional</Link></li>
            <li><Link href="/paket" className="hover:text-gold">Semua Paket</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Perusahaan</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link href="/#tentang" className="hover:text-gold">Tentang Kami</Link></li>
            <li><Link href="/admin/login" className="hover:text-gold">Login Admin</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Hubungi Kami</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={whatsappLink('Halo Cliffton')} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                +62 821-1933-3131
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>info@peacocktravelstar.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>Bandung, Jawa Barat, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/50 md:px-8">
          {'\u00A9'} {new Date().getFullYear()} Peacock Travel Star. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}
