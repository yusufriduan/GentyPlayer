"use client";

import Image from "next/image";
import Clock from "../components/clock";
import Date from "../components/date";
import Player from "../components/player";
import backgroundImageLight from "../public/1531.png";
import backgroundImageDark from "../public/1531_dark.png";

import { useEffect, useState } from "react";

export default function MainComponent() {
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const now: Date = new window.Date();
        const hour = now.getHours();
        // 7pm (19) to 7am (7)
        setIsNight(hour >= 19 || hour < 7);
    }, []);

    return (
        <>
            <div className="date-clock-container">
            <Date />
            <Clock />
            </div>
            {isNight ? (
            <Image src={backgroundImageDark} alt="Background" className="backgroundImg" priority />
            ) : (
            <Image src={backgroundImageLight} alt="Background" className="backgroundImg" priority />
            )}
            <Player />
        </>
    );
}