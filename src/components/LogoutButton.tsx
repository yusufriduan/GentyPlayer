import '../App.css';

function logOutButton() {
    const logOut =  async () => {
      try {
        const response = await fetch("https://spotipy-backend.onrender.com/logout", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          sessionStorage.clear();
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="logOutButton">
        <button onClick={logOut}>Log Out</button>
      </div>
    );
};
  
export default logOutButton;