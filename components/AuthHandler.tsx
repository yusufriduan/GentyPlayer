"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");

        if (accessToken) {
            sessionStorage.setItem("access_token", accessToken);
            if (refreshToken) {
                sessionStorage.setItem("refresh_token", refreshToken);
            }
            setIsLoggedIn(true);
            window.history.replaceState({}, document.title, "/");

            router.refresh();
        } else {
            setIsLoggedIn(false);
        }
    }, [searchParams, router]);

    return null;
}