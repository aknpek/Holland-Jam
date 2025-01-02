import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holland Jam',
  description: 'Organizing OpenMics and Jam sessions in Amsterdam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black flex flex-col`}>
        {!isDashboardRoute() && <Nav />}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function isDashboardRoute() {
  // This is a simple check. In a real application, you might want to use
  // Next.js routing utilities for a more robust solution.
  return typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')
}

