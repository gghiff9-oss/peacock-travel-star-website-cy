'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { inputClass, labelClass } from '@/lib/styles'

const SELECTS = [
  {
    name: 'kategori',
    label: 'Kategori',
    options: [
      { value: '', label: 'Semua kategori' },
      { value: 'domestik', label: 'Domestik' },
      { value: 'internasional', label: 'Internasional' },
    ],
  },
  {
    name: 'durasi',
    label: 'Durasi',
    options: [
      { value: '', label: 'Semua durasi' },
      { value: 'pendek', label: '1 - 4 hari' },
      { value: 'sedang', label: '5 - 7 hari' },
      { value: 'panjang', label: '8 hari ke atas' },
    ],
  },
  {
    name: 'harga',
    label: 'Anggaran',
    options: [
      { value: '', label: 'Semua harga' },
      { value: '10', label: 'Hingga Rp 10 juta' },
      { value: '25', label: 'Hingga Rp 25 juta' },
      { value: '50', label: 'Hingga Rp 50 juta' },
    ],
  },
  {
    name: 'urut',
    label: 'Urutkan',
    options: [
      { value: '', label: 'Terbaru' },
      { value: 'termurah', label: 'Harga terendah' },
      { value: 'termahal', label: 'Harga tertinggi' },
      { value: 'durasi', label: 'Durasi terpendek' },
    ],
  },
]

export function TourFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function update(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    const url = query
      ? pathname + '?' + query
      : pathname

    startTransition(() => {
      router.replace(url, { scroll: false })
    })
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')

    const query = params.toString()
    const url = query
      ? pathname + '?' + query
      : pathname

    startTransition(() => {
      router.replace(url, { scroll: false })
    })
  }

  function resetFilters() {
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }

  return (
    <form
      role="search"
      aria-label="Filter paket wisata"
      onSubmit={(e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const q = formData.get('q')?.toString() ?? ''

        update('q', q.trim())
      }}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
      data-pending={isPending ? '' : undefined}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-navy">
        <SlidersHorizontal
          className="size-4 text-gold"
          aria-hidden="true"
        />
        Smart Search & Filter
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="filter-q" className={labelClass}>
          Cari Destinasi
        </label>

        <div className="flex gap-2">
          <input
            id="filter-q"
            name="q"
            type="search"
            defaultValue={searchParams.get('q') ?? ''}
            placeholder="Contoh: Bali, Jepang, Korea..."
            className={inputClass}
          />

          <button
            type="submit"
            disabled={isPending}
            className="flex size-11 shrink-0 items-center justify-center rounded-md bg-navy text-white hover:bg-navy/90 disabled:opacity-50"
            aria-label="Cari destinasi"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>
        </div>

        {searchParams.get('q') && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex items-center gap-1 text-left text-xs text-muted-foreground hover:text-gold"
          >
            <X className="size-3" aria-hidden="true" />
            Hapus pencarian
          </button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        {SELECTS.map((select) => (
          <div
            key={select.name}
            className="flex flex-col gap-2"
          >
            <label
              htmlFor={'filter-' + select.name}
              className={labelClass}
            >
              {select.label}
            </label>

            <select
              id={'filter-' + select.name}
              name={select.name}
              value={searchParams.get(select.name) ?? ''}
              onChange={(e) => update(select.name, e.target.value)}
              className={inputClass}
            >
              {select.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {searchParams.toString() && (
        <button
          type="button"
          onClick={resetFilters}
          className="text-left text-sm font-medium text-navy underline underline-offset-4 hover:text-gold"
        >
          Reset semua filter
        </button>
      )}
    </form>
  )
}
