"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon, MapPin, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/data"

interface CalendarViewProps {
  events: Event[]
  onDateSelect: (date: Date) => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function CalendarView({ events, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)

  const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="py-16">
      <div className="flex items-center justify-between text-white mb-4">
        <Button variant="ghost" size="icon" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </div>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-px rounded-lg bg-white/10 text-sm">
        {weekDays.map((day) => (
          <div key={day} className="py-2 text-center font-semibold text-white/70">
            {day[0]}
          </div>
        ))}
        {days.map((day, dayIdx) => {
          const hasEvent = events.some(event => isSameDay(new Date(event.date), day))
          const isToday = isSameDay(day, new Date())
          const isCurrentMonth = isSameMonth(day, currentDate)
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={classNames(
                'py-6 focus:z-10',
                isCurrentMonth ? 'bg-black' : 'bg-black/50',
                (isToday || hasEvent) && 'font-semibold',
                isToday && 'text-white',
                !isToday && isCurrentMonth && !hasEvent && 'text-white/70',
                !isToday && !isCurrentMonth && !hasEvent && 'text-white/30',
                hasEvent && 'text-blue-500',
                (hasEvent || isToday) && 'hover:bg-white/10',
                dayIdx === 0 && 'rounded-tl-lg',
                dayIdx === 6 && 'rounded-tr-lg',
                dayIdx === days.length - 7 && 'rounded-bl-lg',
                dayIdx === days.length - 1 && 'rounded-br-lg'
              )}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
            </button>
          )
        })}
      </div>
    </div>
  )
}

