'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, ExternalLink, Map } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/admin', label: 'Pesanan', icon: ClipboardList },
  { href: '/admin/paket', label: 'Paket Tour', icon: Map },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Navigasi admin" className="flex gap-1 lg:flex-col">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white',
              active && 'bg-white/10 text-gold',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        )
      })}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white"
      >
        <ExternalLink className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Lihat Website</span>
      </Link>
    </nav>
  )
}
