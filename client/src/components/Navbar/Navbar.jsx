import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <header className="navbar-all">
      <nav>
        <ul className="navbar-ul">
          <li className="navbar-li" onClick={() => navigate("/")}>
            <h3 className="navbar-text">Home</h3>
          </li>
          <li className="navbar-li" onClick={() => navigate("/apartments")}>
            <h3 className="navbar-text">Apartments</h3>
          </li>
          <li className="navbar-li" onClick={() => navigate("/profiles")}>
            <h3 className="navbar-text">Profiles</h3>
          </li>
          <li className="navbar-li" onClick={() => navigate("/me")}>
            <h3 className="navbar-text">{user.name}</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
