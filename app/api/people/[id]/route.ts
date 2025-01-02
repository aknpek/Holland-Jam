import { NextResponse } from 'next/server'
import { people } from '@/lib/data'
import type { PersonResponse } from '@/lib/api-types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const person = people.find(p => p.id === params.id)

    if (!person) {
      return NextResponse.json(
        {
          success: false,
          data: { person: null },
          error: 'Person not found'
        },
        { status: 404 }
      )
    }

    const response: PersonResponse = {
      success: true,
      data: { person }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: { person: null },
        error: 'Failed to fetch person'
      },
      { status: 500 }
    )
  }
}

