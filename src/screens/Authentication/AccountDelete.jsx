import React, { useState } from "react";
import { images } from "../../components/Images";
import { Link } from "react-router-dom";

function AccountDelete() {
  const [comfirm, setComfirm] = useState(true);
  return (
    <section className="authentication-bg">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-lg-6">
              {comfirm ? (
                <div className="card overflow-hidden text-center bg-opacity-25 p-4">
                  <div className="auth-brand">
                    <Link to="/" className="logo-light">
                      <img src={images.logo} alt="logo" height={22} />
                    </Link>
                    <Link to="/" className="logo-dark">
                      <img src={images.logo_dark} alt="dark logo" height={22} />
                    </Link>
                  </div>
                  <h2 className="text-dark my-2">Confirm account deletion</h2>
                  <p className="text-muted mb-3">
                    We're sorry to see you go. Once your account is deleted, all
                    of your content will be permanently gone, including your
                    profile, stories, publications, notes, and responses.
                    Deleting your Medium account will not delete any Stripe
                    account you have connected to your Medium account. If you're
                    not sure about that, we suggest you deactivate or contact
                    yourfriends@medium.com instead.
                  </p>
                  <p className="fs-16 fw-semibold text-dark mb-3">
                    To confirm deletion, type "delete" below:
                  </p>
                  <form action="#">
                    <div className="mb-3">
                      <input className="form-control" type="text" required="" />
                    </div>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-primary fw-semibold"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setComfirm(false);
                        }}
                      >
                        Confirm deletion
                      </button>
                      <button
                        className="btn btn-outline-secondary fw-semibold"
                        type="submit"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="card overflow-hidden text-center bg-opacity-25 p-4">
                  <div className="auth-brand">
                    <Link to="/" className="logo-light">
                      <img src={images.logo} alt="logo" height={22} />
                    </Link>
                    <Link to="/" className="logo-dark">
                      <img src={images.logo_dark} alt="dark logo" height={22} />
                    </Link>
                  </div>
                  <h2 className="text-dark my-2">Congratulations</h2>
                  <p className="text-muted mb-3">
                    Congratulations, your account has been successfuly
                    deleted.Hope to see you back.
                  </p>
                  <Link
                    className="btn btn-primary fw-semibold mx-auto"
                    to="/register"
                  >
                    Register Again
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountDelete;
