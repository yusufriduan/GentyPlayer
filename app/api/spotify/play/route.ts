import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'POST',
            headers: {
                Authorization: authHeader,
            },
        });

        if (response.status === 204 || response.status === 400) {
            return NextResponse.json({ error: 'No track currently playing' }, { status: 204 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}