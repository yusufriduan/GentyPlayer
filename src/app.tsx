import React, { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/clock.tsx";
import Date from "./components/date.tsx";
import Header from "./components/header.tsx";
import Player from "./components/player.tsx";
import Footer from "./components/footer.tsx";
import backgroundImage from "./assets/1531.png";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
        <img src={backgroundImage} alt="Background" className="backgroundImg" />
        <Player />
      </main>
      <Footer />
    </div>
  );
};

export default App;
