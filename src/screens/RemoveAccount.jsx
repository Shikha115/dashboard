import React, { useState } from "react";
import { images } from "../components/Images";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import  axios  from 'axios';

function RemoveAccount() {
  const [confirm, setConfirm] = useState(true);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const { setToastData, setShowToast } = useAuthStore();

  const onSubmit = async (e) => {
    e.preventDefault();

 axios.post()


    setConfirm(false);
    setShowToast(true);
    setToastData({
      color: "#3fba4f",
      message: `Verification Email sended successfully`,
    });
    setTimeout(() => {
      setShowToast(false);
    }, 2650);
  };

  return (
    <section className="authentication-bg">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-lg-6">
              {confirm ? (
                <div className="card overflow-hidden text-center bg-opacity-25 p-4">
                  <div className="auth-brand">
                    <Link className="logo-light">
                      <img src={images.logo} alt="logo" height={22} />
                    </Link>
                    <Link className="logo-dark">
                      <img src={images.logo_dark} alt="dark logo" height={22} />
                    </Link>
                  </div>
                  <h2 className="text-dark my-2">Confirm account deletion</h2>
                  <p className="text-muted mb-3">
                    We're sorry to see you go. Once your account is deleted, all
                    of your content will be permanently gone, including your
                    profile, leads, earnings, and responses.
                  </p>
                  <p className="fs-16 fw-semibold text-dark mb-3">
                    To confirm deletion, provide your email and phone number
                  </p>
                  <form
                    action="#"
                    onSubmit={onSubmit}
                    className="row justify-content-center"
                  >
                    <div className="col-12 col-lg-8 mb-1">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="col-12 col-lg-8 mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter phone number"
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value?.toString())}
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Confirm deletion
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
                  <h2 className="text-dark my-2">Email Sent</h2>
                  <p className="text-muted mb-3">
                    A Verification email has been sended to you, kindly verify
                    that email for successfull deletion
                  </p>
                  <button className="btn btn-primary fw-semibold mx-auto">
                    Check your mail
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RemoveAccount;
