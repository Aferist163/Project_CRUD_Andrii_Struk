import { NavLink, Outlet } from "react-router-dom";
import "../css/Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="header-nav blur">
        <NavLink to="/" className="nav-link blur">Home</NavLink>
        <NavLink to="/edit" className="nav-link blur">Edit</NavLink>
        <NavLink to="/inspect" className="nav-link blur">Inspect</NavLink>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}