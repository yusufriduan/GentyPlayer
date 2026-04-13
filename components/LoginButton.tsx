function spotifyButton() {
  const sendDataToBackend = async () => {
    try {
      const response = await fetch('/api/spotify/login');
      const data = await response.json();

      if (data.url) {
        console.log(data.url);
        window.location.href = data.url;
      }
    } catch (error) {
      console.log("Failed to fetch login URL", error);
      alert("Authentication service is currently unavailable.");
    }
  };
  return (
    <div className="spotifyButton">
      <button onClick={sendDataToBackend}>Login with Spotify</button>
    </div>
  );
}

export default spotifyButton;