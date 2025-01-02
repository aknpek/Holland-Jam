"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { LoginDialog } from "@/components/login-dialog"

const menuItems = [
  { href: "/people", label: "People" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
]

export function Nav() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="container flex items-center h-16 px-4">
        <Link href="/" className="text-xl font-bold text-white mr-6">
          Holland Jam
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/70">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center ml-auto space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => setShowLoginDialog(true)}
          >
            <User className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full h-full bg-black/90 p-0" aria-describedby="menu-description">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <VisuallyHidden id="menu-description">
                Navigation menu for mobile devices
              </VisuallyHidden>
              <nav className="flex flex-col justify-center h-full space-y-8 text-white/70 p-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="text-2xl font-semibold hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
    </header>
  )
}

