"use client";

import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    const access_token = sessionStorage.getItem("access_token");

    if (storedUserName) setUserName(storedUserName);
    setIsLoggedIn(!!access_token);
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