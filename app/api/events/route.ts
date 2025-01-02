import { NextResponse } from 'next/server'
import { events } from '@/lib/data'
import type { EventsResponse } from '@/lib/api-types'
import { isToday, isTomorrow, isWeekend, parseISO, startOfDay, endOfDay, addDays } from "date-fns"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const type = searchParams.get('type')
  const date = searchParams.get('date')
  const location = searchParams.get('location')

  try {
    let filteredEvents = events

    if (search) {
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (location) {
      filteredEvents = filteredEvents.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase()) ||
        event.address.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (type && type !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === type)
    }

    if (date) {
      switch (date) {
        case 'today':
          filteredEvents = filteredEvents.filter(event => isToday(parseISO(event.date)))
          break
        case 'tomorrow':
          filteredEvents = filteredEvents.filter(event => isTomorrow(parseISO(event.date)))
          break
        case 'weekend':
          const today = new Date()
          const saturday = startOfDay(addDays(today, (6 - today.getDay() + 7) % 7))
          const sunday = endOfDay(addDays(saturday, 1))
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = parseISO(event.date)
            return eventDate >= saturday && eventDate <= sunday
          })
          break
      }
    }

    const response: EventsResponse = {
      success: true,
      data: {
        events: filteredEvents,
        total: filteredEvents.length
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: { events: [], total: 0 },
        error: 'Failed to fetch events'
      },
      { status: 500 }
    )
  }
}

