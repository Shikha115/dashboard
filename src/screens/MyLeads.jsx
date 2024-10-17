import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppInfo, apis } from "../utils/URL";
import moment from "moment";
import useToastStore from "../store/toastStore";
import Loader from "../components/Loader";

function MyLeads() {
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState();
  const { setToastData } = useToastStore();
  const [userDetails, setUserDetails] = useState();
  const [allFeaturedOffers, setAllFeaturedOffers] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get("oid");
  const userId = queryParams.get("uid");
  const affiliateId = queryParams.get("afid");

  const getOffer = async () => {
    await axios
      .post(apis.getOfferByIdWeb, { id: offerId })
      .then((res) => {
        let data = res?.data?.data;
        setOffer(data);
        document.title = data?.mobile_data?.title;
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
          link.href = data?.mobile_data?.product_image_web;
          // console.log(data?.mobile_data?.product_image_web);
        } else {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = data?.mobile_data?.product_image_web;
          document.head.appendChild(newLink);
          console.log(data?.mobile_data?.product_image_web);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFeaturedOffer = async () => {
    await axios
      .get(apis.featuredOffer)
      .then((res) => {
        setAllFeaturedOffers(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getOffer();
      await getFeaturedOffer();
    })();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    // console.log(allFeaturedOffers, "allFeaturedOffers");
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const submitLeads = async (e) => {
    e.preventDefault();
    console.log(e);

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
      category_id: offer?.type_id,
      click_id: date,
      affiliate_id: affiliateId,
      customer_url: window?.location?.href,
      apply_link: offer?.mobile_data?.apply_link,
      link_with_click_id: click_id,

      name: userDetails?.name,
      email: userDetails?.email,
      phone: userDetails?.phone,

      earning: offer?.mobile_data?.earning,
    };

    // console.log(data);

    // return;

    axios
      .post(apis.createLead, data)
      .then((e) => {
        console.log(e);
        setToastData({ message: "Successfull" });
        window.location.href = click_id;
      })
      .catch((err) => {
        console.log(err.response.data.err.message);
        setToastData({
          message: err?.response?.data?.err?.message || "Unknown Error",
          color: "red",
        });
      });
  };

  // console.log(offer);

  const applyLead = (oid) => {
    const url = `${AppInfo.webUrl}/my-leads?oid=${oid}&uid=${userId}&afid=${affiliateId}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <Loader />;
  }
  if (!offer) {
    return <h1>Invalid Offer</h1>;
  }
  const copyLead = (oid) => {
    const url = `${AppInfo.webUrl}/my-leads?oid=${oid}&uid=${userId}&afid=${affiliateId}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToastData({ message: "Url copied to clipboard" });
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return (
    <section className="authentication-bg position-relative">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6 p-lg-0">
              <div className="lead-card mb-4">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="left-outer">
                      <img src={offer?.mobile_data?.product_image_web} alt="" />
                      <h2 className="text-primary mt-3 mb-1">
                        {offer?.mobile_data?.title}
                      </h2>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="lead-card-data">
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
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              if (e?.target?.value?.length === 11) {
                                // setUserDetails({
                                //   ...userDetails,
                                //   phone: e.target.value,
                                // });
                                return;
                              }

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
                            onClick={submitLeads}
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
              <div className="lead-offers">
                <h2 className="text-dark">Featured Offers</h2>
                {allFeaturedOffers?.length > 0 &&
                  allFeaturedOffers?.map((item, i) => (
                    <CardItem
                      key={i}
                      applyLead={applyLead}
                      copyLead={copyLead}
                      offer={item}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyLeads;

const CardItem = ({ offer, applyLead, copyLead }) => {
  return (
    <div className="leads-box position-relative mb-4">
      <img
        src={offer?.mobile_data?.product_image_web}
        alt=""
        className="w-100"
      />
      <p className="mb-0 bg-pink">{offer?.mobile_data?.title}</p>
      <div className="d-flex">
        <button
          className="btn btn-purple rounded-0 flex-fill"
          onClick={() => applyLead(offer?._id)}
        >
          Apply
        </button>
        <button
          className="btn btn-info rounded-0 flex-fill"
          onClick={() => copyLead(offer?._id)}
        >
          Share
        </button>
      </div>
    </div>
  );
};
