"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, Link2, List, AlignLeft } from 'lucide-react'

export default function DashboardEventsPage() {
  const [eventTitle, setEventTitle] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventDescription, setEventDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ eventTitle, eventDate, eventDescription })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-300">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="event-title" className="text-gray-300">Event Title</Label>
          <Input
            id="event-title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
            placeholder="Enter event title"
          />
        </div>
        <div>
          <Label htmlFor="event-date" className="text-gray-300">Event Date</Label>
          <Input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
        <div>
          <Label htmlFor="event-description" className="text-gray-300">Event Description</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Italic className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Underline className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Link2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <AlignLeft className="h-4 w-4" />
              </Button>
            </div>
            <Textarea 
              id="event-description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="min-h-[200px] bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
              placeholder="Add description"
            />
          </div>
        </div>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
          Create Event
        </Button>
      </form>
    </div>
  )
}

