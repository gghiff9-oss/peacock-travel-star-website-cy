import Link from 'next/link'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5', className)}
      aria-label="Peacock Travel Star - Beranda"
    >
      <span className="flex size-9 items-center justify-center rounded-full border border-gold/60 bg-navy">
        <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-serif text-lg font-semibold tracking-wide', light ? 'text-white' : 'text-navy')}>
          Peacock
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">Travel Star</span>
      </span>
    </Link>
  )
}
