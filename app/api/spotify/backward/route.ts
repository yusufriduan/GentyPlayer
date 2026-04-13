import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
        console.error("Spotify authentication error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIPY_CLIENT_ID}:${process.env.SPOTIPY_CLIENT_SECRET}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.SPOTIPY_REDIRECT_URI!,
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Error fetching access token:", data.error);
            return NextResponse.json({ error: "Failed to fetch access token" }, { status: 400 });
        }

        const responseRedirect = NextResponse.redirect(new URL("/", req.url));

        const redirectUrl = new URL("/", req.url);
        redirectUrl.searchParams.set("access_token", data.access_token);
        redirectUrl.searchParams.set("refresh_token", data.refresh_token);
        redirectUrl.searchParams.set("expires_in", data.expires_in);

        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.error("Unexpected error during token exchange:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}