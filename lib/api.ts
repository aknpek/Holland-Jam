import type { EventsResponse, EventResponse, PeopleResponse, PersonResponse, PeopleQueryParams } from './api-types'

const API_BASE_URL = '/api'

export async function fetchEvents(params?: {
  search?: string
  type?: string
  date?: string
  location?: string
}): Promise<EventsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.search) searchParams.append('search', params.search)
  if (params?.type) searchParams.append('type', params.type)
  if (params?.date) searchParams.append('date', params.date)
  if (params?.location) searchParams.append('location', params.location)

  const queryString = searchParams.toString()
  const url = `${API_BASE_URL}/events${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export async function fetchEvent(id: string): Promise<EventResponse> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch event')
  }
  return response.json()
}

export async function fetchPeople(params?: PeopleQueryParams): Promise<PeopleResponse> {
  const searchParams = new URLSearchParams()
  if (params?.search) searchParams.append('search', params.search)
  if (params?.role) searchParams.append('role', params.role)
  if (params?.instrument) searchParams.append('instrument', params.instrument)
  if (params?.location) searchParams.append('location', params.location)
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())

  const queryString = searchParams.toString()
  const url = `${API_BASE_URL}/people${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch people')
  }
  return response.json()
}

export async function fetchPerson(id: string): Promise<PersonResponse> {
  const response = await fetch(`${API_BASE_URL}/people/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch person')
  }
  return response.json()
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

