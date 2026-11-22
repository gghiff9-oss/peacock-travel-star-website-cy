import { CalendarCheck, Clock, Wallet, XCircle } from 'lucide-react'
import { requireAdmin } from '@/lib/admin'
import { updateBookingStatus } from '@/app/admin/actions'
import { formatDate, formatRupiah } from '@/lib/format'
import type { Booking, BookingStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: 'Menunggu',
  confirmed: 'Dikonfirmasi',
  cancelled: 'Dibatalkan',
}

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: 'bg-gold/15 text-[#8a6a1f]',
  confirmed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-destructive/10 text-destructive',
}

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('bookings')
    .select('id, tour_id, full_name, email, phone, departure_date, participants, notes, total_price, status, created_at, tours(title, slug)')
    .order('created_at', { ascending: false })
    .limit(200)

  const bookings = (data ?? []) as unknown as Booking[]
  const count = (s: BookingStatus) => bookings.filter((b) => b.status === s).length
  const revenue = bookings.filter((b) => b.status === 'confirmed').reduce((sum, b) => sum + Number(b.total_price ?? 0), 0)

  const stats = [
    { label: 'Menunggu konfirmasi', value: String(count('pending')), icon: Clock },
    { label: 'Dikonfirmasi', value: String(count('confirmed')), icon: CalendarCheck },
    { label: 'Dibatalkan', value: String(count('cancelled')), icon: XCircle },
    { label: 'Nilai terkonfirmasi', value: formatRupiah(revenue), icon: Wallet },
  ]

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-navy">Pesanan</h1>
        <p className="text-sm text-muted-foreground">Pantau dan kelola semua booking yang masuk.</p>
      </header>

      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy">
              <Icon className="size-5 text-gold" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col-reverse">
              <dd className="truncate font-serif text-xl font-semibold text-navy">{value}</dd>
              <dt className="text-xs text-muted-foreground">{label}</dt>
            </div>
          </div>
        ))}
      </dl>

      {error && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Gagal memuat pesanan. Pastikan tabel database sudah disiapkan.
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Pemesan</th>
                <th scope="col" className="px-5 py-3 font-medium">Paket</th>
                <th scope="col" className="px-5 py-3 font-medium">Berangkat</th>
                <th scope="col" className="px-5 py-3 font-medium">Peserta</th>
                <th scope="col" className="px-5 py-3 font-medium">Total</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">Belum ada pesanan.</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-medium text-navy">{b.full_name}</p>
                      <p className="text-xs text-muted-foreground">{b.email}</p>
                      <a href={`https://wa.me/${b.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${b.full_name}, terkait booking Anda di Peacock Travel Star.`)}`}
                        target="_blank" rel="noopener noreferrer" className="text-xs text-navy underline underline-offset-2 hover:text-gold">
                        {b.phone}
                      </a>
                      {b.notes && <p className="mt-1 max-w-xs text-xs text-muted-foreground italic">{b.notes}</p>}
                    </td>
                    <td className="px-5 py-4 text-navy">{b.tours?.title ?? '-'}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{formatDate(b.departure_date)}</td>
                    <td className="px-5 py-4">{b.participants}</td>
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-navy">
                      {b.total_price != null ? formatRupiah(Number(b.total_price)) : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn('mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold', STATUS_STYLE[b.status])}>
                        {STATUS_LABEL[b.status]}
                      </span>
                      <form action={updateBookingStatus} className="flex gap-2">
                        <input type="hidden" name="id" value={b.id} />
                        <label htmlFor={`status-${b.id}`} className="sr-only">Ubah status</label>
                        <select id={`status-${b.id}`} name="status" defaultValue={b.status}
                          className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                          <option value="pending">Menunggu</option>
                          <option value="confirmed">Konfirmasi</option>
                          <option value="cancelled">Batalkan</option>
                        </select>
                        <button type="submit" className="h-8 rounded-md bg-navy px-3 text-xs font-semibold text-white hover:bg-navy/90">
                          Simpan
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
