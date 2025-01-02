"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { fetchPeople } from "@/lib/api"
import type { Person } from "@/lib/data"
import { useDebounce } from "@/hooks/use-debounce"

const ITEMS_PER_PAGE = 9

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("amsterdam")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [instrumentFilter, setInstrumentFilter] = useState<string>("all")
  const [people, setPeople] = useState<Person[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  const debouncedSearch = useDebounce(searchQuery, 300)

  const loadPeople = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetchPeople({
        search: debouncedSearch,
        role: roleFilter,
        instrument: instrumentFilter,
        location,
        page,
        limit: ITEMS_PER_PAGE
      })
      
      if (response.success) {
        setPeople(response.data.people)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch people:', error)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, roleFilter, instrumentFilter, location, page])

  useEffect(() => {
    loadPeople()
  }, [loadPeople])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, roleFilter, instrumentFilter, location])

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

  const allInstruments = [
    "Guitar",
    "Piano",
    "Drums",
    "Bass",
    "Violin",
    "Saxophone",
    "Vocals"
  ] // In a real app, this would come from the API

  if (isLoading && people.length === 0) {
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
          <h1 className="text-4xl font-bold mb-8">People</h1>
          
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
                  placeholder="Search people..."
                  className="pl-10 border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setRoleFilter('all')}
                variant={roleFilter === 'all' ? 'filterActive' : 'filter'}
              >
                All Roles
              </Button>
              <Button
                onClick={() => setRoleFilter('organizer')}
                variant={roleFilter === 'organizer' ? 'filterActive' : 'filter'}
              >
                Organizers
              </Button>
              <Button
                onClick={() => setRoleFilter('musician')}
                variant={roleFilter === 'musician' ? 'filterActive' : 'filter'}
              >
                Musicians
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="filter" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter People</SheetTitle>
                    <SheetDescription>
                      Apply filters to narrow down the list of people.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium leading-none">Instrument</h3>
                      <Select
                        value={instrumentFilter}
                        onValueChange={setInstrumentFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select instrument" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Instruments</SelectItem>
                          {allInstruments.map((instrument) => (
                            <SelectItem key={instrument} value={instrument}>
                              {instrument}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {people.length === 0 ? (
            <div className="text-center text-gray-400 my-12">
              No people found matching your search criteria.
            </div>
          ) : (
            <>
              <motion.div 
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {people.map((person) => (
                  <motion.div
                    key={person.id}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <Link href={`/people/${person.id}`}>
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <Image
                          src={person.image || `https://picsum.photos/seed/${person.id}/800/450`}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start">
                          <Image
                            src={person.image || `https://picsum.photos/seed/${person.id}-avatar/200/200`}
                            alt=""
                            width={64}
                            height={64}
                            className="rounded-full"
                          />
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold">{person.name}</h3>
                            <p className="text-sm text-gray-400 capitalize">{person.role}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-300 text-sm line-clamp-3">{person.bio}</p>
                        {person.instruments && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Instruments</h4>
                            <div className="flex flex-wrap gap-2">
                              {person.instruments.slice(0, 3).map((instrument) => (
                                <span
                                  key={`${person.id}-${instrument}`}
                                  className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                >
                                  {instrument}
                                </span>
                              ))}
                              {person.instruments.length > 3 && (
                                <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                                  +{person.instruments.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {page < totalPages && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => setPage(p => p + 1)} 
                    variant="filter"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

