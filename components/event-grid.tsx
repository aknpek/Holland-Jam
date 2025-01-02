import { motion } from 'framer-motion'
import { Event } from '@/lib/data'
import { EventCard } from './event-card'

interface EventGridProps {
  events: Event[]
  lastEventRef?: (node: HTMLDivElement | null) => void
}

export function EventGrid({ events, lastEventRef }: EventGridProps) {
  return (
    <motion.div 
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          ref={index === events.length - 1 ? lastEventRef : null}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  )
}

