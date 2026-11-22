import Image from 'next/image'
import { Search } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Gugusan pulau karst Raja Ampat saat matahari terbenam"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-24 md:px-8">
        <div className="flex max-w-2xl flex-col gap-6">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Premium Travel Experience
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-white md:text-6xl md:leading-[1.1]">
            Jelajahi Dunia dengan <span className="text-gold italic">Kemewahan</span> dan Ketenangan
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Paket tour domestik dan internasional yang dikurasi secara eksklusif. Hotel pilihan, pemandu profesional,
            dan perjalanan yang dirancang sempurna untuk Anda.
          </p>
        </div>

        <form
          action="/paket"
          method="get"
          role="search"
          className="flex w-full max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 shadow-2xl shadow-black/30 md:flex-row md:items-center"
        >
          <label htmlFor="hero-q" className="sr-only">Cari destinasi</label>
          <div className="flex flex-1 items-center gap-3 px-3">
            <Search className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <input
              id="hero-q"
              name="q"
              type="search"
              placeholder="Mau ke mana? Bali, Jepang, Swiss..."
              className="h-12 w-full bg-transparent text-sm text-navy placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <label htmlFor="hero-kategori" className="sr-only">Kategori</label>
          <select
            id="hero-kategori"
            name="kategori"
            defaultValue=""
            className="h-12 rounded-md border border-border bg-cream px-3 text-sm text-navy md:w-48"
          >
            <option value="">Semua Kategori</option>
            <option value="domestik">Domestik</option>
            <option value="internasional">Internasional</option>
          </select>
          <button
            type="submit"
            className="h-12 rounded-md bg-navy px-8 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            Cari Paket
          </button>
        </form>

        <dl className="grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-8">
          {[
            { value: '12+', label: 'Tahun Pengalaman' },
            { value: '25K+', label: 'Traveler Puas' },
            { value: '40+', label: 'Destinasi' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-xs text-white/70 md:text-sm">{stat.label}</dt>
              <dd className="font-serif text-2xl font-semibold text-gold md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
