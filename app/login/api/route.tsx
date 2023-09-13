import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json()

    const res = await fetch('http://localhost:1323/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()


    cookies().set({
        name: 'token',
        value: data,
        httpOnly: true,
    })

    return new NextResponse(null, {
        status: 200
    })
}

export async function GET(request: Request) {
    const cookie = cookies().get('token')
    if (cookie) {
        // YODO: verify token sign and ttl
        return NextResponse.json({
            cookie: cookie,
        }, { status: 200 })
    } else {
        return new NextResponse(null, {
            status: 401,
        })
    }
}