import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apis } from "../utils/URL";
import moment from "moment";
import useToastStore from "../store/toastStore";

function MyLeads() {
  const [loading, setLoading] = useState();
  const [offer, setOffer] = useState();
  const { setToastData } = useToastStore();
  const [userDetails, setUserDetails] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get("oid");
  const userId = queryParams.get("uid");
  const affiliateId = queryParams.get("afid");

  // console.log(offer, offerId, userId, affiliateId);

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
      alert("Name cannot be empty");
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
    setLoading(true);
    let now = Date.now();

    let mil = moment().milliseconds();
    let date =
      mil.toString().slice(-2) + moment(now).format("smHDM").toString();
    let click_id = `${offer?.mobile_data?.apply_link}&sub_aff_id=${affiliateId}_${date}`;

    const data = {
      offer_id: offerId,
      user_id: userId,
      // bank_id: offer?.bank_info?._id,
      category_id: offer?.category_info?._id,
      click_id: date,
      affiliate_id: affiliateId,
      customer_url: window?.location?.href,
      apply_link: offer?.mobile_data?.apply_link,
      link_with_click_id: click_id,

      name: userDetails?.name,
      email: userDetails?.email,
      phone: userDetails?.phone,

      earning: 0,
    };

    axios
      .post(apis.createLead, data)
      .then((e) => {
        console.log(e);
        setToastData({ message: "Successfull" });
        window.location.href = click_id;
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Unknown error occured", color: "red" });
      });
  };

  if (!offer) {
    return <h1>Invalid Offer</h1>;
  }
  return (
    <section className="authentication-bg position-relative">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center align-items-start gx-lg-5 mb-4">
            <div className="lead-card col-12 col-lg-6">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="left-outer">
                    <img src={offer?.mobile_data?.product_image_web} alt="" />
                    <h4 className="text-primary mt-3 mb-1">
                      {offer?.bank_info?.bank_name}
                    </h4>
                    {/* <h5 className="title fw-medium mb-1">
                      {offer?.mobile_data?.title}
                    </h5> */}
                    <p className="mb-0">
                      abc@gmail.com<b className="fw-bold text-primary"> | </b>
                      9856534523
                    </p>
                    <p className="mb-0">
                      abc@gmail.com<b className="fw-bold text-primary"> | </b>
                      9856534523
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="lead-card-data">
                    <h1 className="title text-dark">My Leads</h1>
                    <form action="#" className="row">
                      <div className="col-12 mb-3">
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
                      <div className="col-12 mb-3">
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
                      <div className="col-12 mb-3">
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
                        <button
                          onClick={SubmitLeads}
                          className="btn btn-purple ms-0"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="leads-box position-relative">
                <img
                  src={offer?.mobile_data?.product_image_web}
                  alt=""
                  className="w-100"
                />
                <p className="mb-0 bg-pink">Axis Credit card</p>
                <div className="d-flex">
                  <button className="btn btn-purple rounded-0 flex-fill">
                    Apply
                  </button>
                  <button className="btn btn-info rounded-0 flex-fill">
                    Share
                  </button>
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
