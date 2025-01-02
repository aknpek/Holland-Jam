"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { people } from "@/lib/data"

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          person.bio.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || person.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-300">People</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search" className="text-gray-300">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="role-filter" className="text-gray-300">Role</Label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger id="role-filter" className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="organizer">Organizers</SelectItem>
              <SelectItem value="musician">Musicians</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center gap-4">
              <Image
                src={`https://picsum.photos/seed/${person.id}/200/200`}
                alt={person.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <CardTitle className="text-gray-200">{person.name}</CardTitle>
                <p className="text-sm text-gray-400 capitalize">{person.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{person.bio}</p>
              {person.instruments && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Instruments</h4>
                  <div className="flex flex-wrap gap-2">
                    {person.instruments.map((instrument) => (
                      <span
                        key={instrument}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {instrument}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {person.events && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Events</h4>
                  <p className="text-gray-300 text-sm">{person.events.length} event(s)</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

