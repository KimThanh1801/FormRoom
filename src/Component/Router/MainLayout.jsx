import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div>
      <h2>Welcome Router</h2>
      <header>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? 'nav-link home-link active' : 'nav-link home-link'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-link about-link active' : 'nav-link about-link'
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'nav-link contact-link active' : 'nav-link contact-link'
          }
        >
          Contact
        </NavLink>
      </header>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
