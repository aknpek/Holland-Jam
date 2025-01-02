"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (search: string) => void
  onLocationChange: (location: string) => void
}

export function SearchBar({ onSearch, onLocationChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, onSearch])

  return (
    <div className="flex items-center gap-2 p-1 bg-zinc-800/80 backdrop-blur-sm border border-white/10 rounded-lg">
      <Select
        defaultValue="amsterdam"
        onValueChange={onLocationChange}
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
  )
}

