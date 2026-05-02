import React from "react";
import { useRouter } from "next/navigation";

const logOutButton: React.FC = () => {
  const router = useRouter();

  const logOut =  async () => {
    const response = await fetch("/api/spotify/logout", {method: "POST",});

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("userName");

    window.location.href = "/";
  };

  return (
    <div className="logOutButton">
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
  
export default logOutButton;