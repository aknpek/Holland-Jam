"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { DateSelector } from "@/components/date-selector"
import { CalendarView } from "@/components/calendar-view"
import { Button } from "@/components/ui/button"
import { EventGrid } from "@/components/event-grid"
import { fetchEvents } from "@/lib/api"
import type { Event } from "@/lib/data"

const ITEMS_PER_PAGE = 8 // Reduced number for landing page

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents()
        if (response.success) {
          // Sort events by view count for initial display
          const sortedEvents = response.data.events.sort((a, b) => b.viewCount - a.viewCount)
          setEvents(sortedEvents)
          setDisplayedEvents(sortedEvents.slice(0, ITEMS_PER_PAGE))
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  const filterEvents = (filterType: string) => {
    const now = new Date()
    let filteredEvents = events
    
    switch (filterType) {
      case 'today':
        filteredEvents = events.filter(event => 
          format(new Date(event.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
        )
        break
      case 'tomorrow':
        const tomorrow = new Date(now)
        tomorrow.setDate(tomorrow.getDate() + 1)
        filteredEvents = events.filter(event =>
          format(new Date(event.date), 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')
        )
        break
      case 'weekend':
        const friday = new Date(now)
        friday.setDate(friday.getDate() + (5 - friday.getDay()))
        const sunday = new Date(friday)
        sunday.setDate(sunday.getDate() + 2)
        filteredEvents = events.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate >= friday && eventDate <= sunday
        })
        break
      default:
        filteredEvents = events
    }

    setFilter(filterType)
    setDisplayedEvents(filteredEvents.slice(0, ITEMS_PER_PAGE))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <DateSelector events={events} />
      <Hero />
      <div className="container mx-auto px-6 pt-16">
        <div className="pt-16 pb-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Popular Events</h2>
        </div>
        
        <CalendarView events={events} onDateSelect={(date) => {
          const filteredEvents = events.filter(event => 
            format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          )
          setDisplayedEvents(filteredEvents.slice(0, ITEMS_PER_PAGE))
        }} />

        <div className="flex flex-wrap justify-center gap-3 my-8">
          <Button
            onClick={() => filterEvents('all')}
            variant={filter === 'all' ? 'filterActive' : 'filter'}
          >
            All Events
          </Button>
          <Button
            onClick={() => filterEvents('today')}
            variant={filter === 'today' ? 'filterActive' : 'filter'}
          >
            Today
          </Button>
          <Button
            onClick={() => filterEvents('tomorrow')}
            variant={filter === 'tomorrow' ? 'filterActive' : 'filter'}
          >
            Tomorrow
          </Button>
          <Button
            onClick={() => filterEvents('weekend')}
            variant={filter === 'weekend' ? 'filterActive' : 'filter'}
          >
            This Weekend
          </Button>
        </div>

        <EventGrid events={displayedEvents} />
        
        {displayedEvents.length === 0 ? (
          <div className="text-center text-gray-400 my-12">
            No events found for the selected filter.
          </div>
        ) : (
          <div className="flex justify-center mt-12 mb-16">
            <Link href="/events">
              <Button variant="filter">
                View All Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

