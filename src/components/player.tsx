import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";
import spotifyButton from "./LoginButton.tsx";

interface PlaybackState {
  item: {
    name: string;
    artists: { name: string }[];
    duration_ms: number;
  };
  progress_ms: number;
  is_playing: boolean;
}

function Player() {
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      setIsLoggedIn(true);
      fetchCurrentPlaying(access_token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchCurrentPlaying = (access_token: string) => {
    axios.get("https://spotipy-backend.onrender.com/currentPlaying", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setPlaybackState(response.data);
        scheduleNextFetch(response.data);
        setProgress(response.data.progress_ms);
      })
      .catch((error) => console.error("Error fetching playback state", error));
  };

  const scheduleNextFetch = (state: PlaybackState) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const duration = state.item.duration_ms - state.progress_ms;
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        fetchCurrentPlaying(sessionStorage.getItem("access_token")!);
      }, duration + 1000); // Adding a buffer of 1 second
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (playbackState?.is_playing) {
      interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1000);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playbackState?.is_playing]);

  const handlePlay = async () => {
    try {
      await axios.get("https://spotipy-backend.onrender.com/play", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      setPlaybackState((prevState) => prevState && { ...prevState, is_playing: true });
    } catch (error) {
      console.error("Error playing the song", error);
    }
  };

  const handlePause = async () => {
    try {
      await axios.get("https://spotipy-backend.onrender.com/pause", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      setPlaybackState((prevState) => prevState && { ...prevState, is_playing: false });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } catch (error) {
      console.error("Error pausing the song", error);
    }
  };

  const handleForward = async () => {
    try {
      await axios.get("https://spotipy-backend.onrender.com/forward", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      fetchCurrentPlaying(sessionStorage.getItem("access_token")!);
    } catch (error) {
      console.error("Error skipping to the next track", error);
    }
  };

  const handleBackward = async () => {
    try {
      await axios.get("https://spotipy-backend.onrender.com/backward", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      fetchCurrentPlaying(sessionStorage.getItem("access_token")!);
    } catch (error) {
      console.error("Error skipping to the previous track", error);
    }
  };

  const getProgressPercentage = () => {
    if (playbackState) {
      return (progress / playbackState.item.duration_ms) * 100;
    }
    return 0;
  };

  return (
    <div className="player">
      {isLoggedIn ? (
        <>
          <div className="TrackInfo">
            <h2 style={{ textAlign: "center"}}>{playbackState?.item?.name}</h2>
            <h3>{playbackState?.item?.artists[0]?.name}</h3>
          </div>
          <div className="progressBar">
            <div className="progress"style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <div className="playerControls">
            <button onClick={handleBackward} className="backwardButton">⏮︎</button>
            <button onClick={handlePlay} className="playButton">⏵︎</button>
            <button onClick={handlePause} className="pauseButton">⏸︎</button>
            <button onClick={handleForward} className="forwardButton">⏭︎</button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", alignSelf: "center" }}>
          <h3 className="LoggedOut">You're not logged in</h3>
          {spotifyButton()}
        </div>
      )}
    </div>
  );
}

export default Player;