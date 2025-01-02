"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "https://picsum.photos/id/1078/1920/1080", // Concert crowd scene
  "https://picsum.photos/id/974/1920/1080",   // Night city view
  "https://picsum.photos/id/1067/1920/1080",  // Architectural interior
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -1000 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]}
            alt={`Music event background ${currentImage + 1}`}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">We Bring The Music</h1>
        <p className="text-xl md:text-2xl mb-8">Experience the rhythm of life</p>
      </motion.div>
    </section>
  )
}

