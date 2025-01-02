"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EyeBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const eyeVariants = {
    default: { scale: 1 },
    hover: { scale: 1.1 }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gray-700 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: mousePosition.x / 20,
            y: mousePosition.y / 20,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        >
          <motion.div
            className="w-2 h-2 bg-gray-300 rounded-full"
            variants={eyeVariants}
            whileHover="hover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default EyeBackground

