"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import spotifyButton from "./LoginButton";

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const fetchCurrentPlaying = useCallback(async (accessToken: string) => {
        try {
            const res = await fetch('/api/spotify/currentPlaying', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();

            if (data && data.item) {
                setPlaybackState(data);
                setProgress(data.progress_ms);
                scheduleNextFetch(data, accessToken);
            }
        } catch (error) {
            console.error("Error fetching current playing track", error);
        }
    }, []);


    const scheduleNextFetch = (state: PlaybackState, accessToken: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const duration = state.item.duration_ms - state.progress_ms;
        if (duration > 0) {
            timeoutRef.current = setTimeout(() => {
                fetchCurrentPlaying(accessToken);
            }, duration + 1000); // Adding a buffer of 1 second
        }
    };

    const handlePlayback = async (action: 'play' | 'pause' | 'forward' | 'backward') => {
        const accessToken = sessionStorage.getItem("access_token");
        try {
            await fetch(`/api/spotify/${action}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            
            if (action === 'pause') setPlaybackState(s => s ? { ...s, is_playing: false } : null);
            else if (action === 'play') setPlaybackState(s => s ? { ...s, is_playing: true } : null);
            else if (action === 'forward' || action === 'backward') fetchCurrentPlaying(accessToken!);
        } catch (error) {
            console.error(`Error during ${action} action`, error);
        }
    };

    useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    setIsLoggedIn(!!access_token);
    
    if (access_token) {
      fetchCurrentPlaying(access_token);
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (playbackState?.is_playing) {
      interval = setInterval(() => setProgress(p => p + 1000), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [playbackState?.is_playing]);

  const getProgressPercentage = () => playbackState ? (progress / playbackState.item.duration_ms) * 100 : 0;

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
                <button onClick={() => handlePlayback('backward')} className="backwardButton">⏮︎</button>
                <button onClick={() => handlePlayback('play')} className="playButton">⏵︎</button>
                <button onClick={() => handlePlayback('pause')} className="pauseButton">⏸︎</button>
                <button onClick={() => handlePlayback('forward')} className="forwardButton">⏭︎</button>
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