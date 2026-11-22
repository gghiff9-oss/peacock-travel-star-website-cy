'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { saveTour, type TourFormState } from '@/app/admin/actions'
import { goldButtonClass, inputClass, labelClass, outlineButtonClass } from '@/lib/styles'
import type { Tour } from '@/lib/types'

const initial: TourFormState = { status: 'idle', message: '' }

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function TourForm({ tour }: { tour?: Tour }) {
  const [state, action, pending] = useActionState(saveTour, initial)

  return (
    <form action={action} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 md:p-8">
      {tour && <input type="hidden" name="id" value={tour.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="title" label="Nama paket *">
          <input id="title" name="title" required maxLength={120} defaultValue={tour?.title} className={inputClass} />
        </Field>
        <Field id="slug" label="Slug URL" hint="Kosongkan untuk dibuat otomatis dari nama paket.">
          <input id="slug" name="slug" maxLength={80} defaultValue={tour?.slug} className={inputClass} />
        </Field>
        <Field id="destination" label="Destinasi *">
          <input id="destination" name="destination" required defaultValue={tour?.destination} placeholder="Tokyo - Kyoto - Osaka" className={inputClass} />
        </Field>
        <Field id="country" label="Negara *">
          <input id="country" name="country" required defaultValue={tour?.country} placeholder="Jepang" className={inputClass} />
        </Field>
        <Field id="category" label="Kategori *">
          <select id="category" name="category" required defaultValue={tour?.category ?? 'domestik'} className={inputClass}>
            <option value="domestik">Domestik</option>
            <option value="internasional">Internasional</option>
          </select>
        </Field>
        <Field id="price" label="Harga per orang (Rp) *">
          <input id="price" name="price" type="number" min={1} step={1000} required defaultValue={tour?.price} className={inputClass} />
        </Field>
        <Field id="duration_days" label="Durasi (hari) *">
          <input id="duration_days" name="duration_days" type="number" min={1} max={60} required defaultValue={tour?.duration_days ?? 4} className={inputClass} />
        </Field>
        <Field id="duration_nights" label="Durasi (malam) *">
          <input id="duration_nights" name="duration_nights" type="number" min={0} max={60} required defaultValue={tour?.duration_nights ?? 3} className={inputClass} />
        </Field>
      </div>

      <Field id="image_url" label="URL gambar" hint='Contoh: /images/bali.png atau https://...'>
        <input id="image_url" name="image_url" defaultValue={tour?.image_url ?? ''} className={inputClass} />
      </Field>

      <Field id="description" label="Deskripsi *">
        <textarea id="description" name="description" required rows={4} defaultValue={tour?.description} className={`${inputClass} h-auto py-3`} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="facilities" label="Fasilitas" hint="Satu fasilitas per baris.">
          <textarea id="facilities" name="facilities" rows={6} defaultValue={tour?.facilities?.join('\n')} className={`${inputClass} h-auto py-3`} />
        </Field>
        <Field id="highlights" label="Highlight" hint="Satu highlight per baris.">
          <textarea id="highlights" name="highlights" rows={6} defaultValue={tour?.highlights?.join('\n')} className={`${inputClass} h-auto py-3`} />
        </Field>
      </div>

      <fieldset className="flex flex-wrap gap-6">
        <legend className="sr-only">Pengaturan tampilan</legend>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" name="is_active" defaultChecked={tour?.is_active ?? true} className="size-4 accent-[var(--navy)]" />
          Tampilkan di website
        </label>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" name="is_featured" defaultChecked={tour?.is_featured ?? false} className="size-4 accent-[var(--navy)]" />
          Jadikan paket unggulan
        </label>
      </fieldset>

      {state.status === 'error' && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/admin/paket" className={outlineButtonClass}>Batal</Link>
        <button type="submit" disabled={pending} className={goldButtonClass}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {tour ? 'Simpan Perubahan' : 'Tambah Paket'}
        </button>
      </div>
    </form>
  )
}
