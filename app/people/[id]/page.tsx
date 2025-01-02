"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Music } from 'lucide-react'
import { fetchPerson, fetchEvents } from "@/lib/api"
import { EventCard } from "@/components/event-card"
import type { Person, Event } from "@/lib/data"

export default function PersonPage() {
  const params = useParams()
  const [person, setPerson] = useState<Person | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPersonAndEvents = async () => {
      try {
        const personResponse = await fetchPerson(params.id as string)
        if (personResponse.success && personResponse.data.person) {
          setPerson(personResponse.data.person)
          
          // Fetch events if the person is an organizer
          if (personResponse.data.person.role === 'organizer') {
            const eventsResponse = await fetchEvents()
            if (eventsResponse.success) {
              const personEvents = eventsResponse.data.events.filter(
                event => event.organizer.id === personResponse.data.person?.id
              )
              setEvents(personEvents)
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch person or events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPersonAndEvents()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-2xl">Person not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Image
              src={person.image || `https://picsum.photos/seed/${person.id}/200/200`}
              alt={person.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-bold">{person.name}</h1>
              <p className="text-xl text-gray-400 capitalize">{person.role}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-300">{person.bio}</p>
          </div>

          {person.instruments && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instruments</h2>
              <div className="flex flex-wrap gap-2">
                {person.instruments.map((instrument) => (
                  <span
                    key={instrument}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                  >
                    <Music className="inline-block w-4 h-4 mr-1" />
                    {instrument}
                  </span>
                ))}
              </div>
            </div>
          )}

          {person.role === 'organizer' && events.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          <Link href="/people" className="text-blue-400 hover:underline">
            ← Back to People
          </Link>
        </div>
      </div>
    </div>
  )
}

