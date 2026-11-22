'use client'

import { Trash2 } from 'lucide-react'
import { deleteTour } from '@/app/admin/actions'

export function DeleteTourButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteTour}
      onSubmit={(e) => {
        if (!confirm(`Hapus paket "${title}"? Pesanan terkait juga akan terhapus.`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-destructive/30 px-3 text-sm font-medium text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Hapus
      </button>
    </form>
  )
}
