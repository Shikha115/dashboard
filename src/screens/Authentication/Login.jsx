import React, { useRef } from "react";
import axios from "axios";
import { images } from "../../components/Images";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useToastStore from "../../store/toastStore";
import { apis } from "../../utils/URL";
import useAuthStore from "../../store/authStore";

function Login() {
  const navigate = useNavigate();
  const { setToastData, setShowToast } = useToastStore();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const path = queryParams.get("path");
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2650);
    handleLogin();
  };

  const handleLogin = () => {
    let data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post(apis.login, data)
      .then((e) => {
        localStorage.setItem("token", e?.data?.token);
        localStorage.setItem("id", e?.data?._id);

        navigate(`${path ? path : "/manage-category"}`);
        setToastData({
          color: "#33b0e0",
          message: `Login Successfully`,
        });
      })
      .catch((error) => {
        setToastData({
          color: "#d03f3f",
          message: error?.response.data?.message,
        });
      });
  };

  return (
    <section className="authentication-bg position-relative">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-lg-6">
              <div className="card overflow-hidden">
                <div className="row g-0">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <div className="d-flex flex-column h-100">
                      <div className="auth-brand px-4 pt-4 text-center">
                        <a href="index.html" className="logo-light">
                          <img src={images.logo} alt="logo" height={22} />
                        </a>
                        <a href="index.html" className="logo-dark">
                          <img
                            src={images.logo_dark}
                            alt="dark logo"
                            height={52}
                          />
                        </a>
                      </div>
                      <div className="px-4 mb-4">
                        <h4 className="fs-20">Sign In</h4>
                        <p className="text-muted mb-3">
                          Enter your email address and password to access
                          account.
                        </p>
                        {/* form */}
                        <form action="/" onSubmit={handleSubmit}>
                          {/* <div className="mb-3">
                              <label
                                htmlFor="emailaddress"
                                className="form-label"
                              >
                                Type
                              </label>
                              <select className="form-select">
                                <option value="1">Admin</option>
                                <option value="2">Manager</option>
                              </select>
                            </div> */}
                          <div className="mb-3">
                            <label
                              htmlFor="emailaddress"
                              className="form-label"
                            >
                              Email address
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              id="emailaddress"
                              placeholder="Enter your email"
                              ref={emailRef}
                              // value={email}
                              // onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <Link
                              to="/forgot-password"
                              className="text-muted float-end"
                            >
                              <small>Forgot your password?</small>
                            </Link>
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              // value={password}
                              ref={passwordRef}
                              // onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          {/* <div className="mb-3">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="checkbox-signin"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="checkbox-signin"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div> */}
                          <div className="mb-3 text-start">
                            <button
                              className="btn btn-soft-primary w-100"
                              type="submit"
                            >
                              <i className="ri-login-circle-fill me-1" />
                              <span className="fw-bold">Log In</span>
                            </button>
                          </div>
                          {/* <div className="mb-0 text-start">
                            <p className="text-muted text-center mb-3">
                              Don't have an account?{" "}
                              <Link to="/register">Register here</Link>
                            </p>
                          </div> */}
                        </form>
                        {/* end form*/}
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                </div>
              </div>
            </div>
            {/* end row */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
    </section>
  );
}

export default Login;
