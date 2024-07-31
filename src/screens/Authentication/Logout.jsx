import React from "react";
import { images } from "../../components/Images";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <section className="authentication-bg position-relative">
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
                      <div className="p-4 my-auto">
                        <div className="my-auto">
                          {/* title*/}
                          <div className="text-center">
                            <h4 className="mt-0 fs-20">See You Again !</h4>
                            <p className="text-muted mb-4">
                              You are now successfully sign out.
                            </p>
                          </div>
                          {/* Logout icon */}
                          <div className="logout-icon m-auto">
                            <img
                              src={images.shield}
                              alt=""
                              className="img-fluid"
                            />
                            <p className="text-muted text-center mb-3">
                              Back To <Link to="/login">Log In</Link>
                            </p>
                          </div>
                          {/* end logout-icon*/}
                        </div>
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
    </section>
  );
}

export default Logout;
