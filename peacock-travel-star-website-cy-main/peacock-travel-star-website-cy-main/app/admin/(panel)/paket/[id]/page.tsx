import { notFound } from 'next/navigation'
import { TourForm } from '@/components/admin/tour-form'
import { requireAdmin } from '@/lib/admin'
import type { Tour } from '@/lib/types'

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()

  const { supabase } = await requireAdmin()
  const { data } = await supabase
    .from('tours')
    .select('id, slug, title, destination, country, category, description, price, duration_days, duration_nights, facilities, highlights, image_url, is_featured, is_active')
    .eq('id', id)
    .maybeSingle()
  if (!data) notFound()

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-navy">Edit Paket</h1>
        <p className="text-sm text-muted-foreground">{(data as Tour).title}</p>
      </header>
      <TourForm tour={data as Tour} />
    </div>
  )
}
