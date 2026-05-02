"use client";
import React, { useEffect, useState } from "react";

const DateDisplay: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});

    if (!mounted) {
        return <div className="date">Loading date...</div>;
    }

    return <div className="date">{dateFormatter.format(date)}</div>;
};

export default DateDisplay;