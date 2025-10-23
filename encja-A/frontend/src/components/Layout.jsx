import { NavLink, Outlet } from "react-router-dom";
import "../css/Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="header-nav blur">
        <NavLink to="/" className="nav-link blur">Home</NavLink>
        <NavLink to="/edit" className="nav-link blur">Edit</NavLink>
        <NavLink to="/inspect" className="nav-link blur">Inspect</NavLink>
        <NavLink to="/login" className="nav-link blur">Login</NavLink>
        <div className="Account blur">
          <p>Anonimus</p>
          <div className="Avatar"></div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}