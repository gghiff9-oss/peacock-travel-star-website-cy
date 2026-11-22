import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/format'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Halo Peacock Travel Star, saya ingin bertanya tentang paket tour.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp dengan Peacock Travel Star"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  )
}
