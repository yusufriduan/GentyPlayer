// app/api/spotify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/?error=access_denied', req.url));
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange the code for tokens
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(
          process.env.SPOTIPY_CLIENT_ID + ':' + process.env.SPOTIPY_CLIENT_SECRET
        ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIPY_REDIRECT_URI!,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    // Redirect back to the frontend with tokens in the URL hash or query
    // In a production app, you might set these in an HTTP-only cookie instead
    const responseRedirect = NextResponse.redirect(new URL('/', req.url));
    
    // We pass the data back to the frontend via search params so your 
    // useEffect in page.tsx can grab them and put them in sessionStorage
    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('access_token', data.access_token);
    redirectUrl.searchParams.set('refresh_token', data.refresh_token);
    
    return NextResponse.redirect(redirectUrl);

  } catch (err) {
    console.error('Callback Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}