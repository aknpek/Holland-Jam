import { Event, Person } from './data'

export type ApiResponse<T> = {
  success: boolean
  data: T
  error?: string
}

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

