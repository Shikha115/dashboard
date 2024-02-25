import React, { createRef, useEffect, useRef, useState } from "react";
import { images } from "../components/Images";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apis } from "../utils/URL";
import { Alert } from "react-bootstrap";

function MyLeads() {
  const [loading, setLoading] = useState();
  const [offer, setOffer] = useState();

  const [userDetails, setUserDetails] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get("oid");
  const userId = queryParams.get("uid");

  const getOffer = async () => {
    setLoading(true);
    await axios
      .post(apis.getOfferWeb, { id: offerId })
      .then((res) => {
        setOffer(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOffer();
  }, []);

  const SubmitLeads = async (e) => {
    e.preventDefault();

    if (!userDetails?.first_name) {
      alert("First name cannot be empty");
      return;
    } else if (!userDetails?.phone) {
      alert("Phone cannot be empty");
      return;
    } else if (!userDetails?.email) {
      alert("Email cannot be empty");
      return;
    }

    let date = Date.now();
    let click_id = `${offer?.apply_link}&uid=${userId}&cid&=${date}`;

    const data = {
      offer_id: offerId,
      user_id: userId,
      bank_id: offer?.bank_info?._id,
      category_id: offer?.category_info?._id,
      click_id: date,
      customer_url: window?.location?.href,
      apply_link: offer?.apply_link,
      link_with_click_id: click_id,
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      email: userDetails?.email,
      phone: userDetails?.phone,
      earning: 0,
    };
    axios
      .post(apis.createLead, data)
      .then((e) => {
        console.log(e);
        window.location.href = click_id;
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="authentication-bg position-relative">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="lead-card">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                <div className="left-outer">
                  <img src={offer?.bank_info?.image} alt="" />
                  <h4 className="text-primary mb-3">
                    {offer?.bank_info?.bank_name}
                  </h4>
                  <h5 className="title fw-medium">{offer?.title}</h5>
                  <ul>
                    {offer?.desc?.Features?.map((item, i) => {
                      return <li key={i}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-7 col-xl-8">
                <div className="lead-card-data">
                  <form action="#" className="row">
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            first_name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            last_name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Phone no.</label>
                      <input
                        maxLength={10}
                        minLength={10}
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            phone: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <button onClick={SubmitLeads} className="btn btn-purple">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyLeads;
