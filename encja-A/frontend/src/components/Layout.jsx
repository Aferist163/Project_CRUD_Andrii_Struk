import { NavLink, Outlet } from "react-router-dom";
import "../css/Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="header-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/edit" className="nav-link">Edit</NavLink>
        <NavLink to="/inspect" className="nav-link">Inspect</NavLink>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}