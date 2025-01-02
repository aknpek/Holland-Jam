import { NextResponse } from 'next/server'
import { events } from '@/lib/data'
import type { EventResponse } from '@/lib/api-types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find(e => e.id === params.id)

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          data: { event: null },
          error: 'Event not found'
        },
        { status: 404 }
      )
    }

    const response: EventResponse = {
      success: true,
      data: { event }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: { event: null },
        error: 'Failed to fetch event'
      },
      { status: 500 }
    )
  }
}

