"use client";

import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className="clock">Loading time...</div>;
  }

  return (
    <div className="clock">
      {time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}
    </div>
  );
}

export default Clock;