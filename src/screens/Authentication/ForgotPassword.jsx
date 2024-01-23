import React from 'react'
import { images } from '../../components/Images'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <section className='authentication-bg'>
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-lg-10">
            <div className="card overflow-hidden">
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
                      <h4 className="fs-20">Forgot Password?</h4>
                      <p className="text-muted mb-3">
                        Enter your email address and we'll send you an email with
                        instructions to reset your password.
                      </p>
                      {/* form */}
                      <form action="#">
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
                        <div className="mb-0 text-start">
                          <button
                            className="btn btn-soft-primary w-100"
                            type="submit"
                          >
                            <i className="ri-loop-left-line me-1 fw-bold" />{" "}
                            <span className="fw-bold">Reset Password</span>{" "}
                          </button>
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
              Back To{" "}
              <Link
                to="/login"
                className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"
              >
                <b>Log In</b>
              </Link>
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
      <span className="text-dark-emphasis"> © Velonic - Theme by Techzaa</span>
    </footer>
    {/* Vendor js */}
    {/* App js */}
  </section>
  
  )
}

export default ForgotPassword