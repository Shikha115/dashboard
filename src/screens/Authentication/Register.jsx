import React from 'react'


import { images } from '../../components/Images';



function Register() {
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
                        <img
                          src={images.logo}
                          alt="logo"
                          height={22}
                        />
                      </a>
                      <a href="index.html" className="logo-dark">
                        <img
                          src={images.logo_dark}
                          alt="dark logo"
                          height={22}
                        />
                      </a>
                    </div>
                    <div className="p-4 my-auto">
                      <h4 className="fs-20">Free Sign Up</h4>
                      <p className="text-muted mb-3">
                        Enter your email address and password to access account.
                      </p>
                      {/* form */}
                      <form action="#">
                        <div className="mb-3">
                          <label htmlFor="fullname" className="form-label">
                            Full Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="fullname"
                            placeholder="Enter your name"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="emailaddress" className="form-label">
                            Email address
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="emailaddress"
                            required=""
                            placeholder="Enter your email"
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
                        <div className="mb-0 d-grid text-center">
                          <button
                            className="btn btn-primary fw-semibold"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-muted fs-16">Sign in with</p>
                          <div className="d-flex gap-2 justify-content-center mt-3">
                            <a
                              href="javascript: void(0);"
                              className="btn btn-soft-primary"
                            >
                              <i className="ri-facebook-circle-fill" />
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="btn btn-soft-danger"
                            >
                              <i className="ri-google-fill" />
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="btn btn-soft-info"
                            >
                              <i className="ri-twitter-fill" />
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="btn btn-soft-dark"
                            >
                              <i className="ri-github-fill" />
                            </a>
                          </div>
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
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-dark-emphasis">
              Already have account?{" "}
              <a
                href="auth-login.html"
                className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"
              >
                <b>Log In</b>
              </a>
            </p>
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
    {/* end page */}
    <footer className="footer footer-alt fw-medium">
      <span className="text-dark-emphasis">© Velonic - Theme by Techzaa</span>
    </footer>
    {/* Vendor js */}
    {/* App js */}
  </section>
  
  )
}

export default Register