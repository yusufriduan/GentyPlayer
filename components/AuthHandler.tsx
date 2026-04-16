"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            const accessToken = searchParams.get("access_token");

            if (accessToken) {
                sessionStorage.setItem("access_token", accessToken);

                try {
                    const res = await fetch('https://api.spotify.com/v1/me', {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                    const data = await res.json();
                    sessionStorage.setItem("userName", data.display_name);
                } catch (e) {
                    console.error("Profile fetch failed", e);
                }

                window.history.replaceState({}, document.title, "/");
                window.dispatchEvent(new Event("storage"));
                router.refresh();
            }
        };

        handleAuth();
    }, [searchParams, router]);

    return null;
}
