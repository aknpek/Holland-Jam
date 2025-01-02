import { NextResponse } from 'next/server'
import { people } from '@/lib/data'
import type { PeopleResponse, PeopleQueryParams } from '@/lib/api-types'

const ITEMS_PER_PAGE = 9

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase()
    const role = searchParams.get('role')
    const instrument = searchParams.get('instrument')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE))

    let filteredPeople = [...people]

    // Apply filters
    if (search) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(search) ||
        person.bio.toLowerCase().includes(search)
      )
    }

    if (role && role !== 'all') {
      filteredPeople = filteredPeople.filter(person => person.role === role)
    }

    if (instrument && instrument !== 'all') {
      filteredPeople = filteredPeople.filter(person => 
        person.instruments?.includes(instrument)
      )
    }

    if (location && location !== 'all') {
      // In a real app, you would filter by location
      // For now, we'll keep all results as we don't have location data
    }

    // Calculate pagination
    const total = filteredPeople.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Get paginated results
    const paginatedPeople = filteredPeople.slice(startIndex, endIndex)

    const response: PeopleResponse = {
      success: true,
      data: {
        people: paginatedPeople,
        total,
        page,
        totalPages
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: { people: [], total: 0, page: 1, totalPages: 1 },
        error: 'Failed to fetch people'
      },
      { status: 500 }
    )
  }
}

