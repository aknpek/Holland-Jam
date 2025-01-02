import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Eye, User, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Event } from '@/lib/data'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <motion.div 
        className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={event.previewImage || `https://picsum.photos/seed/${event.id}-preview/400/300`}
              alt={event.title}
              layout="fill"
              objectFit="cover"
            />
            {event.status === 'sold-out' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <span className="text-sm font-medium text-white">SOLD OUT</span>
              </div>
            )}
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{event.title}</h3>
          
          <div className="flex flex-col space-y-2 text-sm text-white/70">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(new Date(event.date), 'MMM d, yyyy')} at {event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="line-clamp-1">Organised by {event.organizer.name}</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <div className="flex flex-wrap gap-1">
                {event.genre.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-0.5 bg-white/10 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              <span>{event.viewCount.toLocaleString()} views</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-white font-medium">€{event.price.toFixed(2)}</span>
            {event.status === 'available' ? (
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                Available
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

