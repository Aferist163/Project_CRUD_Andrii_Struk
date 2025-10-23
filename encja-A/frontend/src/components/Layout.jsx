import { NavLink, Outlet } from "react-router-dom";
import "../css/Layout.css";
import { useState, useEffect } from "react";
import adminAvatar from "../assets/img/admin.svg";
import userAvatar from "../assets/img/user.svg";
import anonimAvatar from "../assets/img/anonim.svg";

export default function Layout() {

  const [username, setUsername] = useState("Anonimus");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username || "Anonimus");
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);

 const { avatarSrc } =
    username.toLowerCase() === "admin"
      ? { avatarSrc: adminAvatar}
      : username.toLowerCase() === "anonimus"
      ? { avatarSrc: anonimAvatar,}
      : { avatarSrc: userAvatar,};

  return (
    <>
      <nav className="header-nav blur">
        <NavLink to="/" className="nav-link blur">Home</NavLink>
        <NavLink to="/edit" className="nav-link blur">Edit</NavLink>
        <NavLink to="/inspect" className="nav-link blur">Inspect</NavLink>
        <NavLink to="/login" className="nav-link blur">Login</NavLink>
        <div className="Account blur">
          <p>{username}</p>
          <div className="Avatar"> <img src={avatarSrc} alt="avatar" /></div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet context={{ setUsername }}/>
      </main>
    </>
  );
}