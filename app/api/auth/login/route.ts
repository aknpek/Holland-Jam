import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Check for dummy credentials
    if (email === 'admin' && password === 'admin') {
      return NextResponse.json({
        success: true,
        data: {
          token: 'dummy_jwt_token',
          user: {
            id: '1',
            email: 'admin',
            name: 'Admin User',
            role: 'admin'
          }
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

