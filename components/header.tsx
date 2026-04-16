"use client";

import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

const Header: React.FC = () => {
  const [userName, setUserName] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
        const syncLogin = () => {
            const accessToken = sessionStorage.getItem("access_token");
            const userName = sessionStorage.getItem("userName");
            setIsLoggedIn(!!accessToken);

            if (userName) {
              setUserName(userName);
            } else {
              setUserName("Guest");
            }
        };
        syncLogin();
        window.addEventListener("storage", syncLogin);
        return () => window.removeEventListener("storage", syncLogin);
    }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else if (currentHour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  return (
    <header>
      <div className="userinfo">
        <h1>Hello, {userName}</h1>
        <h2>{getGreeting()}</h2>
      </div>
      {isLoggedIn && <LogoutButton />}
    </header>
  );
};

export default Header;