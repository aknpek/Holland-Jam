"use client"

import { Button } from "@/components/ui/button"
import { Event } from "@/lib/data"

interface AddToCalendarProps {
  event: Event
}

export function AddToCalendar({ event }: AddToCalendarProps) {
  const handleAddToCalendar = () => {
    const startDate = new Date(event.date + 'T' + event.time)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Assume 2 hours duration

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <Button 
      onClick={handleAddToCalendar}
      className="w-full bg-white/10 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
    >
      Add to Calendar
    </Button>
  )
}

