import React, { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/clock.tsx";
import Date from "./components/date.tsx";
import Header from "./components/header.tsx";
import Player from "./components/player.tsx";
import Footer from "./components/footer.tsx";
import backgroundImageLight from "./assets/1531.png";
import backgroundImageDark from "./assets/1531_dark.png";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const now: Date = new window.Date();
    const hour = now.getHours();
    // 7pm (19) to 7am (7)
    setIsNight(hour >= 19 || hour < 7);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <div className="date-clock-container">
          <Date />
          <Clock />
        </div>
        {isNight ? (
          <img src={backgroundImageDark} alt="Background" className="backgroundImg" />
        ) : (
          <img src={backgroundImageLight} alt="Background" className="backgroundImg" />
        )}
        {isLoggedIn ? (<Player />) : (<Player />)}
      </main>
      <Footer />
    </div>
  );
};

export default App;
