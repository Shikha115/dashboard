import React, { useState } from "react";
import { images } from "./Images";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsEnvelope } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Collapse from "react-bootstrap/Collapse";
import useAuthStore from "../store/authStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { defaultSidebar, setDefaultSidebar } = useAuthStore();

  const handleToggle = () => {
    const val = defaultSidebar == "default" ? "condensed" : "default";
    setDefaultSidebar(val);
  };

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
          <button className="button-toggle-menu" onClick={handleToggle}>
            <FaBars />
          </button>
          {/* Topbar Search Form */}
          <div className="app-search d-none d-lg-block">
            <form>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                />
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
          {/* <li className="dropdown notification-list">
            <Link
              className="nav-link dropdown-toggle arrow-none"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i>
                <BsEnvelope className="fs-22" />
              </i>
              <span className="noti-icon-badge badge text-bg-purple">4</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
              <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0 fs-16 fw-semibold"> Messages</h6>
                  </div>
                  <div className="col-auto">
                    <Link
                      to="#"
                      className="text-dark text-decoration-underline"
                    >
                      <small>Clear All</small>
                    </Link>
                  </div>
                </div>
              </div>
              <div style={{ maxHeight: 300 }} data-simplebar="">
                <Link
                  to="#"
                  className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img
                            src={images.avatar_1}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold fs-14">
                          Cristina Pride{" "}
                          <small className="fw-normal text-muted float-end ms-1">
                            1 day ago
                          </small>
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          Hi, How are you? What about our next meeting
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="#"
                  className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img
                            src={images.avatar_2}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold fs-14">
                          Sam Garret{" "}
                          <small className="fw-normal text-muted float-end ms-1">
                            2 day ago
                          </small>
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          Yeah everything is fine
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="#"
                  className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img
                            src={images.avatar_3}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold fs-14">
                          Karen Robinson{" "}
                          <small className="fw-normal text-muted float-end ms-1">
                            2 day ago
                          </small>
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          Wow that's great
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="#"
                  className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img
                            src={images.avatar_4}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold fs-14">
                          Sherry Marshall{" "}
                          <small className="fw-normal text-muted float-end ms-1">
                            3 day ago
                          </small>
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          Hi, How are you? What about our next meeting
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="#"
                  className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img
                            src={images.avatar_5}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold fs-14">
                          Shawn Millard{" "}
                          <small className="fw-normal text-muted float-end ms-1">
                            4 day ago
                          </small>
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          Yeah everything is fine
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <Link
                to="#"
                className="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2"
              >
                View All
              </Link>
            </div>
          </li> */}
          {/* <li className="dropdown notification-list">
            <Link
              className="nav-link dropdown-toggle arrow-none"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i>
                <GoBell className="fs-22" />
              </i>
              <span className="noti-icon-badge badge text-bg-pink">3</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
              <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0 fs-16 fw-semibold"> Notification</h6>
                  </div>
                  <div className="col-auto">
                    <Link
                      to="#"
                      className="text-dark text-decoration-underline"
                    >
                      <small>Clear All</small>
                    </Link>
                  </div>
                </div>
              </div>
              <div style={{ maxHeight: 300 }} data-simplebar="">
                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-primary-subtle">
                    <i className="mdi mdi-comment-account-outline text-primary" />
                  </div>
                  <p className="notify-details">
                    Caleb Flakelar commented on Admin
                    <small className="noti-time">1 min ago</small>
                  </p>
                </Link>

                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-warning-subtle">
                    <i className="mdi mdi-account-plus text-warning" />
                  </div>
                  <p className="notify-details">
                    New user registered.
                    <small className="noti-time">5 hours ago</small>
                  </p>
                </Link>

                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-danger-subtle">
                    <i className="mdi mdi-heart text-danger" />
                  </div>
                  <p className="notify-details">
                    Carlos Crouch liked
                    <small className="noti-time">3 days ago</small>
                  </p>
                </Link>

                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-pink-subtle">
                    <i className="mdi mdi-comment-account-outline text-pink" />
                  </div>
                  <p className="notify-details">
                    Caleb Flakelar commented on Admi
                    <small className="noti-time">4 days ago</small>
                  </p>
                </Link>

                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-purple-subtle">
                    <i className="mdi mdi-account-plus text-purple" />
                  </div>
                  <p className="notify-details">
                    New user registered.
                    <small className="noti-time">7 days ago</small>
                  </p>
                </Link>

                <Link to="#" className="dropdown-item notify-item">
                  <div className="notify-icon bg-success-subtle">
                    <i className="mdi mdi-heart text-success" />
                  </div>
                  <p className="notify-details">
                    Carlos Crouch liked <b>Admin</b>.
                    <small className="noti-time">Carlos Crouch liked</small>
                  </p>
                </Link>
              </div>
              <Link
                to="#"
                className="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2"
              >
                View All
              </Link>
            </div>
          </li> */}
          <li>
            <div className="switch">
              <label htmlFor="toggle">
                <input id="toggle" className="toggle-switch" type="checkbox" />
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
                  Admin{" "}
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
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>

                <Link to="pages-profile.html" className="dropdown-item">
                  <i className="ri-account-circle-line fs-18 align-middle me-1" />
                  <span>My Account</span>
                </Link>

                <Link to="pages-profile.html" className="dropdown-item">
                  <i className="ri-settings-4-line fs-18 align-middle me-1" />
                  <span>Access</span>
                </Link>

                <Link
                  to="/logout"
                  onClick={() => {
                    localStorage.removeItem("token");
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
