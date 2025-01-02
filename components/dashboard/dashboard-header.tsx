import Link from 'next/link'
import { Bell, Menu, Users, Search } from 'lucide-react'
import EyeBackground from './animated-eyes'

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="relative bg-gray-900 shadow-sm overflow-hidden">
      <EyeBackground />
      <div className="relative z-20 flex h-16 items-center gap-x-4 border-b border-white/5 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-gray-900/80">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-white lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form className="relative flex flex-1" action="#" method="GET">
            <Search
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Link
              href="/dashboard/people"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">People</span>
              <Users className="h-6 w-6" aria-hidden="true" />
            </Link>
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/5" aria-hidden="true" />
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="ml-3 hidden text-sm font-semibold text-white lg:block">
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

