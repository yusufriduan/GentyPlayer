import { NextResponse } from 'next/server';

export async function GET() {
  const scope = 'user-read-playback-state user-read-currently-playing user-modify-playback-state';
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIPY_CLIENT_ID!,
    scope: scope,
    redirect_uri: process.env.SPOTIPY_REDIRECT_URI!,
    show_dialog: 'true'
  });

  return NextResponse.json({ url: `https://accounts.spotify.com/authorize?${queryParams.toString()}` });
}