import React, {useEffect, useRef, useState} from 'react';
import {images} from '../components/Images';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {apis} from '../utils/URL';

function MyLeads() {
  const [loading, setLoading] = useState();
  const [Offer, setOffer] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get('oid');
  const userId = queryParams.get('uid');

  const getOffer = async () => {
    setLoading(true);
    await axios
      .post(apis.getOfferWeb, {id: offerId})
      .then(res => {
        setOffer(res?.data?.data);
        console.log(res?.data?.data, 'offer');

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOffer();
  }, []);

  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="page-title-right">
                {/* <button type="button" className="btn btn-primary">
                My leads
              </button> */}
              </div>
              <h4 className="page-title">My Leads</h4>
            </div>
            <div className="lead-card">
              <img src={images.avatar_1} />
              <div className="lead-card-data">
                <UserForm Offer={Offer} userId={userId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UserForm({Offer, userId}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    offer_id: '',
    user_id: '',
    click_id: '',
    customer_url: '',
    apply_link: '',
  });
  console.log(formData);

  useEffect(() => {
    if (Offer) {
      let date = Date.now;
      setFormData(prevState => ({
        ...prevState,
        offer_id: Offer?._id,
        apply_link: Offer?.apply_link,
        user_id: userId,
        click_id: Date.now(),
        customer_url: `${Offer?.apply_link}&uid${userId}&cid${date}`,
      }));
    }
  }, [Offer]);

  const handleChange = e => {
    const {id, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can perform any action with the form data, like sending it to a server
    console.log(formData);

    let date = Date.now();
    let data = {
      ...formData,
      click_id: date,
      customer_url: `${Offer?.apply_link}&uid=${userId}&cid=${date}`,
    };

    console.log(data);
  };

  return (
    <div>
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="First Name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Last Name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="Phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <small>Enter a 10-digit mobile number</small>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MyLeads;
