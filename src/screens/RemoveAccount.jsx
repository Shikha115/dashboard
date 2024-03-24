import React, { useState } from "react";
import { images } from "../components/Images";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Define styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: calc(50% - 16px); /* Half width with margin subtracted */
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.6); /* Change box shadow on focus */
  }
`;
const StyledButton = styled.button`
  background-color: #007bff; /* Primary color */
  color: #fff; /* Text color */
  font-weight: 600; /* Semi-bold */
  padding: 8px 16px; /* Padding */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Cursor style */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
  margin-top: 30px;

  &:hover {
    background-color: #0056b3; /* Darker shade of primary color on hover */
  }
`;

function RemoveAccount() {
  const [confirm, setConfirm] = useState(true);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const onSubmit = async () => {
    setConfirm(false);
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
                  <FormContainer>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                      maxLength={10}
                      type="email"
                      placeholder="Enter email address"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <div className="d-flex gap-2 justify-content-center">
                      <StyledButton
                        // className="btn btn-primary fw-semibold"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmit();
                        }}
                      >
                        Confirm deletion
                      </StyledButton>
                    </div>
                  </FormContainer>
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

export default RemoveAccount;
