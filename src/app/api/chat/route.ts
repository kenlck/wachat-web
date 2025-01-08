import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    if (typeof message !== 'string') {
      throw new Error('Invalid message format')
    }

    // Process the message and generate a response
    // This is where you'd integrate with your actual chat logic or external API
    const response = `You said: ${message}`

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}

