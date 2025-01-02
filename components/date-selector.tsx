"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { motion, useAnimation } from "framer-motion"
import { Eye } from 'lucide-react'
import type { Event } from "@/lib/data"

interface DateSelectorProps {
  events: Event[]
}

export function DateSelector({ events }: DateSelectorProps) {
  const controls = useAnimation()
  const containerRef = useRef(null)

  const topEvents = events
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        } else {
          controls.start("hidden")
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-black border-b border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex justify-start overflow-x-scroll scrollbar-hide"
        >
          <div className="flex space-x-6 px-4 py-16">
            {topEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
              >
                <Link
                  href={`/events/${event.id}`}
                  className="flex flex-col items-center group mt-4"
                >
                  <div className="relative w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors mb-3">
                    {event.status === 'sold-out' && (
                      <div className="absolute inset-0 rounded-full bg-black/80 flex items-center justify-center">
                        <span className="text-xs font-medium text-white">SOLD OUT</span>
                      </div>
                    )}
                    <span className="text-3xl font-medium text-white">
                      {format(new Date(event.date), 'dd')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white mb-1">
                    {format(new Date(event.date), 'MMM')}
                  </span>
                  <div className="flex items-center space-x-1 text-white/50 text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{event.viewCount.toLocaleString()}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

