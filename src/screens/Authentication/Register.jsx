import React, { useRef } from "react";

import { images } from "../../components/Images";
import { Link } from "react-router-dom";
import axios from "axios";
import { apis } from "../../utils/URL";

function Register() {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    console.log(data, "abc");
    axios
      .post(apis.register, data)
      .then((e) => {
        console.log(e?.data, "res");
        // localStorage.setItem("token", e.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <section className="authentication-bg">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-lg-10">
              <div className="card overflow-hidden bg-opacity-25">
                <div className="row g-0">
                  <div className="col-lg-6 d-none d-lg-block p-2">
                    <img
                      src={images.auth_img}
                      alt=""
                      className="img-fluid rounded h-100"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex flex-column h-100">
                      <div className="auth-brand p-4">
                        <a href="index.html" className="logo-light">
                          <img src={images.logo} alt="logo" height={22} />
                        </a>
                        <a href="index.html" className="logo-dark">
                          <img
                            src={images.logo_dark}
                            alt="dark logo"
                            height={22}
                          />
                        </a>
                      </div>
                      <div className="p-4 my-auto pt-0">
                        <h4 className="fs-20">Free Sign Up</h4>
                        <p className="text-muted mb-3">
                          Enter your email address and password to access
                          account.
                        </p>
                        {/* form */}
                        <form action="#" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your name"
                              required=""
                              ref={firstName}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your name"
                              required=""
                              ref={lastName}
                            />
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
                              required=""
                              placeholder="Enter your email"
                              ref={email}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              required=""
                              id="password"
                              placeholder="Enter your password"
                              ref={password}
                            />
                          </div>
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="checkbox-signup"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkbox-signup"
                              >
                                I accept{" "}
                                <a
                                  href="javascript: void(0);"
                                  className="text-muted"
                                >
                                  Terms and Conditions
                                </a>
                              </label>
                            </div>
                          </div>
                          <div className="mb-3 d-grid text-center">
                            <button
                              className="btn btn-primary fw-semibold"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="mb-0 text-start">
                            <p className="text-muted text-center mb-3">
                              Already have an account?{" "}
                              <Link to="/login">Login here</Link>
                            </p>
                          </div>
                        </form>
                        {/* end form*/}
                      </div>
                    </div>
                  </div>{" "}
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

      {/* App js */}
    </section>
  );
}

export default Register;
