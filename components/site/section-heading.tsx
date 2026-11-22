import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center')}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className={cn('text-3xl font-semibold md:text-4xl', light ? 'text-white' : 'text-navy')}>{title}</h2>
      {description && (
        <p className={cn('leading-relaxed', light ? 'text-white/75' : 'text-muted-foreground')}>{description}</p>
      )}
    </div>
  )
}
