"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { EventCard } from "@/components/event-card"
import { fetchEvents } from "@/lib/api"
import type { Event } from "@/lib/data"

const ITEMS_PER_PAGE = 12

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("amsterdam")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [events, setEvents] = useState<Event[]>([])
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  const loadEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetchEvents({
        search: searchQuery,
        type: typeFilter,
        location: location
      })
      if (response.success) {
        setEvents(response.data.events)
        setDisplayedEvents(response.data.events.slice(0, ITEMS_PER_PAGE))
        setHasMore(response.data.events.length > ITEMS_PER_PAGE)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [searchQuery, location, typeFilter])

  const loadMore = () => {
    const nextPage = page + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const newEvents = events.slice(startIndex, endIndex)
    
    if (newEvents.length > 0) {
      setDisplayedEvents(prev => [...prev, ...newEvents])
      setPage(nextPage)
      setHasMore(endIndex < events.length)
    } else {
      setHasMore(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (isLoading && events.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Events</h1>
          
          <div className="space-y-4 mb-8">
            {/* Search Bar */}
            <div className="flex items-center gap-2 p-1 bg-zinc-800/80 backdrop-blur-sm border border-white/10 rounded-lg">
              <Select
                value={location}
                onValueChange={setLocation}
              >
                <SelectTrigger className="w-[140px] border-0 bg-transparent text-white focus:ring-0">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amsterdam">Amsterdam</SelectItem>
                  <SelectItem value="rotterdam">Rotterdam</SelectItem>
                  <SelectItem value="the-hague">The Hague</SelectItem>
                  <SelectItem value="utrecht">Utrecht</SelectItem>
                </SelectContent>
              </Select>
              <div className="w-px h-6 bg-gray-700" />
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Artist, Event, Venue"
                  className="pl-10 border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setTypeFilter('all')}
                variant={typeFilter === 'all' ? 'filterActive' : 'filter'}
              >
                All Events
              </Button>
              <Button
                onClick={() => setTypeFilter('music')}
                variant={typeFilter === 'music' ? 'filterActive' : 'filter'}
              >
                Music
              </Button>
              <Button
                onClick={() => setTypeFilter('sports')}
                variant={typeFilter === 'sports' ? 'filterActive' : 'filter'}
              >
                Sports
              </Button>
              <Button
                onClick={() => setTypeFilter('arts')}
                variant={typeFilter === 'arts' ? 'filterActive' : 'filter'}
              >
                Museum & Arts
              </Button>
              <Button
                onClick={() => setTypeFilter('festivals')}
                variant={typeFilter === 'festivals' ? 'filterActive' : 'filter'}
              >
                Fairs & Festivals
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="filter" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Events</SheetTitle>
                    <SheetDescription>
                      Apply filters to narrow down the list of events.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium leading-none">Event Type</h3>
                      <Select
                        value={typeFilter}
                        onValueChange={setTypeFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="music">Music Events</SelectItem>
                          <SelectItem value="sports">Sports Events</SelectItem>
                          <SelectItem value="arts">Museum & Arts Events</SelectItem>
                          <SelectItem value="festivals">Fairs & Festivals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
          
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button onClick={loadMore} variant="filter">
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

