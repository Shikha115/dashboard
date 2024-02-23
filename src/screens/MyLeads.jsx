import React, { useEffect, useState } from "react";
import { images } from "../components/Images";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apis } from "../utils/URL";

function MyLeads() {
  const [loading, setLoading] = useState();
  const [offer, setOffer] = useState();

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
        console.log(res?.data?.data, "offer");

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
                  <h2>Create a Lead</h2>
                  <form action="#" className="row">
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Phone no.</label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-purple">Submit</button>
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
