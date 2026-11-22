'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { whatsappLink } from '@/lib/format'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/paket', label: 'Semua Paket' },
  { href: '/paket?kategori=domestik', label: 'Domestik' },
  { href: '/paket?kategori=internasional', label: 'Internasional' },
  { href: '/#tentang', label: 'Tentang Kami' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/85">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Logo light />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium text-white/80 transition-colors hover:text-gold',
                pathname === item.href && 'text-gold',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappLink('Halo Peacock Travel Star, saya ingin konsultasi paket tour.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-md bg-gold px-5 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
          >
            Konsultasi Gratis
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-md text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Navigasi seluler" className="border-t border-white/10 bg-navy lg:hidden">
          <ul className="flex flex-col px-4 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={whatsappLink('Halo Peacock Travel Star, saya ingin konsultasi paket tour.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center rounded-md bg-gold text-sm font-semibold text-navy"
              >
                Konsultasi via WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
