import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { requireAdmin } from '@/lib/admin'
import { DeleteTourButton } from '@/components/admin/delete-tour-button'
import { formatDuration, formatRupiah } from '@/lib/format'
import { goldButtonClass } from '@/lib/styles'
import type { Tour } from '@/lib/types'

export default async function AdminToursPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('tours')
    .select('id, slug, title, destination, country, category, price, duration_days, duration_nights, image_url, is_featured, is_active')
    .order('created_at', { ascending: false })
  const tours = (data ?? []) as Tour[]

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-navy">Paket Tour</h1>
          <p className="text-sm text-muted-foreground">Tambah, ubah, dan nonaktifkan paket wisata.</p>
        </div>
        <Link href="/admin/paket/baru" className={goldButtonClass}>
          <Plus className="size-4" aria-hidden="true" />
          Tambah Paket
        </Link>
      </header>

      {error && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Gagal memuat paket. Pastikan tabel database sudah disiapkan.
        </p>
      )}

      {tours.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
          Belum ada paket. Klik &quot;Tambah Paket&quot; untuk membuat paket pertama.
        </div>
      ) : (
        <ul className="grid gap-4">
          {tours.map((tour) => (
            <li key={tour.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32">
                {tour.image_url && <Image src={tour.image_url} alt="" fill sizes="128px" className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-sans text-base font-semibold text-navy">{tour.title}</h2>
                  <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[11px] font-medium text-navy capitalize">{tour.category}</span>
                  {tour.is_featured && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-[#8a6a1f]">Unggulan</span>}
                  {!tour.is_active && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">Nonaktif</span>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {tour.destination} {'\u00B7'} {formatDuration(tour.duration_days, tour.duration_nights)} {'\u00B7'}{' '}
                  <span className="font-medium text-navy">{formatRupiah(Number(tour.price))}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/paket/${tour.id}`}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-navy hover:bg-muted"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit
                </Link>
                <DeleteTourButton id={tour.id} title={tour.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
