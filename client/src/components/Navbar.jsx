import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const naviagte = useNavigate();
  const { logout } = useLogout();
  // const { user } = useContext(AuthContext); // Get the user object from your context
  const [userExist, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(JSON.parse(localStorage.getItem("user")));
    if (token) {
      setLoggedIn(true);
    }
  }, [loggedIn]);
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    naviagte("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/vite.svg" alt="r" className="img-fluid" />
          HMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">
                Contact
              </Link>
            </li>
            {userExist?.userType === "doctor" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/doctor">
                    Doctor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/doctor/appointments"
                  >
                    Future
                  </Link>
                </li>
              </>
            ) : (
              <div></div>
            )}
          </ul>
          {loggedIn ? (
            <div className="d-flex">
              {userExist?.userType === "employee" ? (
                <Link
                  className="btn btn-info mx-2"
                  aria-current="page"
                  to="/appointment"
                >
                  <small>Make Appointment</small>
                </Link>
              ) : (
                <div></div>
              )}
              <div className="bg-warning btn">
                <small>{userExist.userName} </small>
              </div>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login" className="btn btn-dark mx-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-light mx-2">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
