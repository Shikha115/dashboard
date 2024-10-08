import React, { useEffect, useState } from "react";
import { images } from "./Images";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Collapse from "react-bootstrap/Collapse";
import useAuthStore from "../store/authStore";
import useDataStore from "../store/dataStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { defaultSidebar, setDefaultSidebar, setTheme, theme } = useAuthStore();
  const handleToggle = () => {
    const val = defaultSidebar == "default" ? "condensed" : "default";
    setDefaultSidebar(val);
    // console.log(defaultSidebar, "defaultSidebar");
  };
  const { profile } = useAuthStore();

  return (
    <div className="navbar-custom">
      <div className="topbar container-fluid">
        <div className="d-flex align-items-center gap-1">
          {/* Topbar Brand Logo */}
          <div className="logo-topbar">
            {/* Logo light */}
            <Link to="index.html" className="logo-light">
              <span className="logo-lg">
                <img src={images.logo} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={images.logo_sm} alt="small logo" />
              </span>
            </Link>
            {/* Logo Dark */}
            <Link to="index.html" className="logo-dark">
              <span className="logo-lg">
                <img src={images.logo_dark} alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src={images.logo_sm} alt="small logo" />
              </span>
            </Link>
          </div>
          {/* Sidebar Menu Toggle Button */}
          <button className="button-toggle-menu">
            <FaBars onClick={handleToggle} />
          </button>
          {/* Topbar Search Form */}
          <div className="app-search d-none d-lg-block">
            <form>
              <div className="input-group">
                {/* <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                /> */}
                <span className="search-icon">
                  <CiSearch className="text-muted" />
                </span>
              </div>
            </form>
          </div>
        </div>
        <ul className="topbar-menu d-flex align-items-center gap-3">
          <li className="dropdown d-lg-none">
            <Link
              className="nav-link dropdown-toggle arrow-none"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ri-search-line fs-22" />
            </Link>
            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
              <form className="p-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                />
              </form>
            </div>
          </li>

          <li>
            <div className="switch">
              <label htmlFor="toggle">
                <input
                  id="toggle"
                  className="toggle-switch"
                  type="checkbox"
                  checked={theme === "light" ? true : false}
                  onChange={(e) => {
                    console.log(typeof e.target.checked);
                    setTheme(e.target.checked ? "light" : "dark");
                  }}
                />
                <div className="sun-moon">
                  <div className="dots" />
                </div>
                <div className="background">
                  <div className="stars1" />
                  <div className="stars2" />
                </div>
              </label>
            </div>
          </li>
          <li className="dropdown">
            <Link
              className="nav-link arrow-none nav-user"
              to="#"
              role="button"
              aria-controls="account-dropdown"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span className="account-user-avatar">
                <img
                  src={images.avatar_1}
                  alt="user-image"
                  width={32}
                  className="rounded-circle"
                />
              </span>
              <span className="d-lg-block d-none">
                <h5 className="my-0 fw-normal">
                  {profile?.name}{" "}
                  <FaChevronDown className="fs-10 ms-1 d-none d-sm-inline-block align-middle" />
                </h5>
              </span>
            </Link>
            <Collapse in={open}>
              <div
                id="account-dropdown"
                className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown"
              >
                <div className=" dropdown-header noti-title">
                  <h6 className="text-overflow m-0">
                    Welcome {profile?.name} !
                  </h6>
                </div>

                <Link to="/profile" className="dropdown-item">
                  <i className="ri-account-circle-line fs-18 align-middle me-1" />
                  <span>Profile</span>
                </Link>

                {/* <Link to="pages-profile.html" className="dropdown-item">
                  <i className="ri-settings-4-line fs-18 align-middle me-1" />
                  <span>Access</span>
                </Link> */}

                <Link
                  to="/logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    useAuthStore.getState().reset();
                    useDataStore.getState().reset();
                  }}
                  className="dropdown-item"
                >
                  <i className="ri-logout-box-line fs-18 align-middle me-1" />
                  <span>Logout</span>
                </Link>
              </div>
            </Collapse>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
