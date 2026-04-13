"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        const accessToken = searchParams.get("access_token");

        if (accessToken) {
            sessionStorage.setItem("access_token", accessToken);
            router.replace("/");
        }
    }, [searchParams, router]);

    return null;
}