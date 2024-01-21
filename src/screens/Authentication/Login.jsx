import React, { useState } from "react";
import logo_dark from "../../assets/images/logo-dark.png";
import axios from "axios";
const url = "https://api.oralfish.new-india-consultants.com/api/v1";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    localStorage.setItem("token","true");
    
  };

  const handleLogin = () => {
    const URL = "https://api.oralfish.new-india-consultants.com/api/v1/auth/login";
    // const URL = url + "/auth/login";
    let data = { email, password };
    axios
      .post(URL, data)
      .then((e) => {
        console.log(e);
        localStorage.setItem("token",e.data);
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
                          <img src={logo_dark} alt="logo" height={22} />
                        </a>
                        <a href="index.html" className="logo-dark">
                          <img src={logo_dark} alt="dark logo" height={52} />
                        </a>
                      </div>
                      <div className="px-4 mb-4">
                        <h4 className="fs-20">Sign In</h4>
                        <p className="text-muted mb-3">
                          Enter your email address and password to access
                          account.
                        </p>
                        {/* form */}
                        <form action="#" onSubmit={handleSubmit}>
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
                              required=""
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <a
                              href="auth-forgotpw.html"
                              className="text-muted float-end"
                            >
                              <small>Forgot your password?</small>
                            </a>
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              required=""
                              id="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
