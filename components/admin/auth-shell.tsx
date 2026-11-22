import Image from 'next/image'
import { Logo } from '@/components/site/logo'

export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/images/bali.png" alt="" fill sizes="50vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
        <div className="absolute bottom-12 left-12 max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Panel Admin</p>
          <p className="mt-3 font-serif text-4xl font-semibold text-white">Kelola perjalanan premium dari satu tempat.</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 bg-cream px-4 py-12">
        <Logo />
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-navy">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
