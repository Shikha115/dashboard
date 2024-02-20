import React, { useRef, useState } from "react";
import axios from "axios";
import { images } from "../../components/Images";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
const url = "https://api.oralfish.new-india-consultants.com/api/v1";

function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useAuthStore();
  console.log(token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setToken(50);
    console.log(emailRef.current.value);
    passwordRef.current.focus();
    // navigate("/");
    return;
    console.log(email);
    console.log(password);
    localStorage.setItem("token", "true");
    handleLogin();
  };

  const handleLogin = () => {
    // const URL = "https://api.oralfish.new-india-consultants.com/api/v1/auth/login";
    const URL = url + "/auth/login";
    let data = { email, password };
    axios
      .post(URL, data)
      .then((e) => {
        console.log(e);
        localStorage.setItem("token", e.data);
      })
      .catch((error) => {
        console.log(error);
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
                          <img src={images.logo_dark} alt="logo" height={22} />
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
                          <div className="mb-3">
                            <label
                              htmlFor="emailaddress"
                              className="form-label"
                            >
                              Type
                            </label>
                            <select className="form-select">
                              <option value="1" selected>
                                Admin
                              </option>
                              <option value="2">Manager</option>
                            </select>
                          </div>
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
                          <div className="mb-3">
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
                          </div>
                          <div className="mb-0 text-start">
                            <button
                              className="btn btn-soft-primary w-100"
                              type="submit"
                            >
                              <i className="ri-login-circle-fill me-1" />
                              <span className="fw-bold">Log In</span>
                            </button>
                          </div>
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
