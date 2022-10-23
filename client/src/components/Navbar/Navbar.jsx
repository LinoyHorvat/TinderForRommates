import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logOutBtn = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
    navigate(0);
  };
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
          <li className="navbar-li me" onClick={() => navigate("/me")}>
            <ul className="dropdown">
              <li>
                <a href="#" onClick={() => logOutBtn()}>
                  Log out
                </a>
              </li>
            </ul>

            <h3 className="navbar-text me-text">{user.name}</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
