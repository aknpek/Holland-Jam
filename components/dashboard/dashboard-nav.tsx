"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, CalendarIcon, CogIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard/events", label: "Events", icon: CalendarIcon },
  { href: "/dashboard/settings", label: "Settings", icon: CogIcon },
]

export function DashboardNav({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <nav className={`relative bg-gray-900 text-white transition-all duration-300 pt-16 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 z-20 hidden h-8 w-8 rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800 lg:block"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      <div className="space-y-4">
        <div className="px-3">
          <div className="mt-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-800 hover:text-gray-200 ${
                  pathname === item.href 
                    ? "bg-gray-800 text-gray-200" 
                    : "text-gray-400"
                }`}
              >
                <item.icon className={`h-5 w-5 ${pathname === item.href ? "text-gray-200" : "text-gray-400"}`} />
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

