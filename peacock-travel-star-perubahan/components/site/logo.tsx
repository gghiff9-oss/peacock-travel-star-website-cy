import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center', className)}
      aria-label="Peacock Travel Star - Beranda"
    >
      <Image
        src="/images/peacock-travel-star-logo.png"
        alt="Peacock Travel Star"
        width={72}
        height={72}
        priority
        className="h-12 w-auto object-contain md:h-14"
      />
    </Link>
  )
}
