import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apis } from "../utils/URL";
import moment from "moment";

function MyLeads() {
  const [loading, setLoading] = useState();
  const [offer, setOffer] = useState();

  const [userDetails, setUserDetails] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get("oid");
  const userId = queryParams.get("uid");
  const affiliateId = queryParams.get("afid");

  console.log(offer, offerId, userId, affiliateId);

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

    if (!userDetails?.name) {
      alert("First name cannot be empty");
      return;
    } else if (!userDetails?.phone) {
      alert("Phone cannot be empty");
      return;
    } else if (!userDetails?.email) {
      alert("Email cannot be empty");
      return;
    } else if (userDetails?.phone.length < 10) {
      alert("Phone number should be of 10 digits");
      return;
    }

    let now = Date.now();

    let mil = moment().milliseconds();
    let date =
      mil.toString().slice(-2) + moment(now).format("smHDM").toString();
    let click_id = `${offer?.mobile_data?.apply_link}&sub_aff_id=${affiliateId}_${date}`;

    const data = {
      offer_id: offerId,
      user_id: userId,
      bank_id: offer?.bank_info?._id,
      category_id: offer?.category_info?._id,
      click_id: date,
      affiliate_id: affiliateId,
      customer_url: window?.location?.href,
      apply_link: offer?.apply_link,
      link_with_click_id: click_id,

      name: userDetails?.name,
      email: userDetails?.email,
      phone: userDetails?.phone,

      earning: 0,
    };
    // console.log(data);
    // return;
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
                      <label className="form-label">Full Name</label>
                      <input
                        value={userDetails?.name}
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Phone no.</label>
                      <input
                        value={userDetails?.phone}
                        minLength={10}
                        maxLength={10}
                        type="num-pad"
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
                        value={userDetails?.email}
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
