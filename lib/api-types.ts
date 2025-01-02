import { Event, Person } from './data'

export type ApiResponse<T> = {
  success: boolean
  data: T
  error?: string
}

export type EventResponse = ApiResponse<{
  event: Event
}>

export type EventsResponse = ApiResponse<{
  events: Event[]
  total: number
}>

export type PersonResponse = ApiResponse<{
  person: Person
}>

export type PeopleResponse = ApiResponse<{
  people: Person[]
  total: number
  page: number
  totalPages: number
}>

export type PeopleQueryParams = {
  search?: string
  role?: string
  instrument?: string
  location?: string
  page?: number
  limit?: number
}

