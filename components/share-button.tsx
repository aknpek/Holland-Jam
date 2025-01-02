"use client"

import { Share } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (error) {
        // Fallback to WhatsApp share if Web Share API fails or is cancelled
        shareOnWhatsApp()
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      shareOnWhatsApp()
    }
  }

  return (
    <button
      onClick={handleShare}
      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
    >
      <Share className="w-4 h-4" />
      <span>Share on WhatsApp</span>
    </button>
  )
}

