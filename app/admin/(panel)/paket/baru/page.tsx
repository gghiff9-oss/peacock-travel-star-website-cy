import { TourForm } from '@/components/admin/tour-form'

export default function NewTourPage() {
  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-navy">Tambah Paket</h1>
        <p className="text-sm text-muted-foreground">Buat paket tour baru untuk ditampilkan di katalog.</p>
      </header>
      <TourForm />
    </div>
  )
}
