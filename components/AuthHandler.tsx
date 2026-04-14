"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        const AuthHandler = async () => {
            const accessToken = searchParams.get("access_token");
            
            if (accessToken) {
                localStorage.setItem("access_token", accessToken);

                //Fetch user data and store in session storage
                const userRes = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const userData = await userRes.json();
                sessionStorage.setItem("userName", userData.display_name);

                setIsLoggedIn(true);

                window.history.replaceState({}, document.title, "/");
                router.refresh();
            } else {
                setIsLoggedIn(false);
                router.push("/");
            }
        };

        AuthHandler();
    }, [searchParams, router]);

    return null;
}