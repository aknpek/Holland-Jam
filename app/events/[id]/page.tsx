"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { MapPin, Calendar, Clock, Users, Eye, Euro, Navigation } from 'lucide-react'
import { EventMap } from "@/components/event-map"
import { ShareButton } from "@/components/share-button"
import { AddToCalendar } from "@/components/add-to-calendar"
import { fetchEvent } from "@/lib/api"
import type { Event } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetchEvent(params.id as string)
        if (response.success) {
          setEvent(response.data.event)
        }
      } catch (error) {
        console.error('Failed to fetch event:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [params.id])

  const handleGetDirections = () => {
    if (event) {
      // Create Google Maps URL with the venue's coordinates
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${event.coordinates.lat},${event.coordinates.lng}&destination_place_id=${encodeURIComponent(event.location)}`
      window.open(mapsUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-2xl">Event not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-16 pb-8">
      <div className="container mx-auto px-6 py-4">
        <Link href="/events" className="text-blue-400 hover:underline">
          ← Back to Events
        </Link>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="relative w-full aspect-w-16 aspect-h-9 mb-6 lg:mb-0">
            <Image
              src={event.image || "/placeholder.svg?height=400&width=600&text=Event+Image"}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black rounded-lg" />
            <div className="absolute top-4 right-4 w-full h-[200px] sm:w-1/2 sm:h-1/2 z-10">
              <EventMap 
                center={[event.coordinates.lat, event.coordinates.lng]}
                name={event.location}
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{event.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {event.genre.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2 text-white/70">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Users className="w-4 h-4" />
                <span>Capacity: {event.capacity.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Eye className="w-4 h-4" />
                <span>{event.viewCount.toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Euro className="w-4 h-4" />
                <span>€{event.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="prose prose-sm prose-invert max-w-none mb-6">
              <p className="text-white/70">{event.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">Location</h2>
              <p className="text-sm text-white/70 mb-2">{event.address}</p>
            </div>

            <div className="space-y-4">
              {event.status === 'available' ? (
                <button className="w-full bg-white text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
                  Get Tickets
                </button>
              ) : (
                <button disabled className="w-full bg-white/10 text-white/50 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                  Sold Out
                </button>
              )}
              <AddToCalendar event={event} />
              <ShareButton 
                title={event.title}
                text={`Check out ${event.title} at ${event.location}`}
                url={`https://hollandjam.com/events/${event.id}`}
              />
              <Button
                onClick={handleGetDirections}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </Button>
            </div>

            <div className="mt-8">
              <Link href={`/people/${event.organizer.id}`} className="flex items-center space-x-4 mb-4 hover:bg-gray-800 rounded-lg p-2 transition-colors">
                <Image
                  src={event.organizer.image || "/placeholder.svg?height=40&width=40&text=Organizer"}
                  alt={event.organizer.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-sm text-white font-medium">Organized by</h3>
                  <p className="text-xs text-white/70">{event.organizer.name}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

