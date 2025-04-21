import { useEffect, useState, useRef } from "react";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaStar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import "../assets/css/home2.scss";
import { images } from "../components/Images";
import { LogoComp } from "./Landing";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { apis } from "../utils/URL";
import axios from "axios";
import ToastComponent from "../components/ToastComponent";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";

const Home2 = () => {
  const { setToastData } = useToastStore();
  const location = useLocation();
  const formRef = useRef();
  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: formRef.current.elements.name.value,
      email: formRef.current.elements.email.value,
      phone: formRef.current.elements.phone.value,
      subject: formRef.current.elements.subject.value,
      message: formRef.current.elements.message.value,
    };

    try {
      const response = await axios.post(apis.createContact, formData);
      const result = await response.data;
      setToastData({
        color: "#3fba4f",
        message: `Message sent. We'll contact you shortly`,
      });
      formRef.current.reset();
    } catch (error) {
      console.error("Error:", error);
      setToastData({
        color: "red",
        message: `Failed try again!`,
      });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const brandSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaAngleRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaAngleLeft className={className} onClick={onClick} />;
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const userReviews = [
    {
      name: "Rahul S.",
      role: "Freelancer",
      quote:
        "RojgarAPP has completely changed the way I earn online. The Training is simple, and I started making money within the first week!",
      rating: 5,
      image: images.avatar_1,
    },
    {
      name: "Priya M.",
      role: "Student",
      quote:
        "I never thought earning 1 lakh a month from home was possible. Thanks to RojgarApp, I now have a stable source of income!",
      rating: 5,
      image: images.avatar_2,
    },
    {
      name: "Ankit R.",
      role: "Content Creator",
      quote:
        "Great platform for students and freelancers! Easy to use, and the best part is that payments are always on time.",
      rating: 5,
      image: images.avatar_3,
    },
    {
      name: "Sneha K.",
      role: "Homemaker",
      quote:
        "The training sessions are super helpful, and sharing financial product link is effortless. Highly recommended!",
      rating: 5,
      image: images.avatar_4,
    },
    {
      name: "Anjali T.",
      role: "Teacher",
      quote:
        "RojgarApp is amazing! I started earning without any investment, and the process was so simple. Highly recommended for anyone looking to make extra income!",
      rating: 5,
      image: images.avatar_5,
    },
  ];

  const services = [
    {
      title: "Hot and Trending Tasks",
      description:
        "Promote New popular apps and websites, helping them gain users while you earn commissions for every successful registration.",
      icon: "assets/img/service-icon/7.svg",
    },
    {
      title: "Banking & Financial Offers",
      description:
        "Promote a wide range of financial services, including savings accounts, loans, credit cards, demat accounts, mutual funds, and more, earning rewards for every successful lead.",
      icon: "assets/img/service-icon/8.svg",
    },
    {
      title: "Educational Offers",
      description:
        "Promote educational courses, platforms, and resources while earning commissions for successful enrolments and sign-ups.",
      icon: "assets/img/service-icon/10.svg",
    },
    {
      title: "Automotive Offers",
      description:
        "Promote new passenger vehicles, commercial four-wheelers, and two-wheelers by generating leads, scheduling test drives, and engaging in similar activities to earn rewards.",
      icon: "assets/img/service-icon/11.svg",
    },

    {
      title: "Users Registrations ",
      description:
        "Generate leads for companies by registering users for the products and services, earn rewards for every successful lead.",
      icon: "assets/img/service-icon/12.svg",
    },
    {
      title: "And Many More",
      description:
        "Explore a variety of categories that are regularly updated to bring you fresh earning opportunities.",
      icon: "assets/img/service-icon/12.svg",
    },
  ];

  return (
    <main id="home2">
      {/* ================== Banner Section ==================*/}
      <div
        className="banner-area bg-relative banner-area-1 bg-cover pt-2 m-0"
        style={{ backgroundImage: 'url("./assets/img/banner/0.png")' }}
      >
        <div className="container">
          <div
            className="logo text-start position-relative"
            style={{ filter: "invert(1)" }}
          >
            <Link to="/">
              <LogoComp color={"white"} />
            </Link>
          </div>
          <div className="row pt-4 pb-5">
            <div className="col-lg-6 align-self-center">
              <div className="banner-inner pe-xl-4">
                <h6
                  className="bg-base-2 text-white subtitle fs-11 mb-1"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="1500"
                >
                  Designing for the future
                </h6>
                <h2
                  className="title"
                  data-aos="fade-right"
                  data-aos-delay="250"
                  data-aos-duration="1500"
                >
                  Work & Earn AnyWhere
                </h2>
                <p
                  className="content pe-xl-4"
                  data-aos="fade-right"
                  data-aos-delay="350"
                  data-aos-duration="1500"
                >
                  Turn your time into income with RojgarApp. Our platform
                  connects you with the best Offers, allowing you to earn
                  through simple tasks, referrals, and promotions. Whether
                  you're a student, freelancer, or looking for side business,
                  RojgarApp.in makes online earning easy and accessible. Join us
                  without any investment and start earning right away with our
                  simple and hassle-free registration process.
                </p>
                <div className="btns">
                  <Link
                    className="ms-2"
                    data-aos="fade-right"
                    data-aos-delay="450"
                    data-aos-duration="1500"
                    to="#"
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.rojgarapp.rojgar",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <img
                      src={images.play_store}
                      alt="Download from Play Store"
                      className="play-store h-100"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-9 align-self-end">
              <div className="banner-thumb-2 mt-4 mt-lg-0">
                <div className="main-img-wrap">
                  <div className="three-name">
                    <img
                      className="main-img"
                      src={images.app_8}
                      alt="RojgarApp Screenshot 1"
                    />
                    <img
                      className="main-img"
                      src={images.app_9}
                      alt="RojgarApp Screenshot 2"
                    />
                    <img
                      className="main-img"
                      src={images.app_10}
                      alt="RojgarApp Screenshot 3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== How It Works Section ==================*/}
      <div className="work-process-area bg-position-right pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center pb-5">
                <h2 className="title">Start earning with easy steps</h2>
              </div>
            </div>
          </div>
          <div className="work-process-area-inner-2">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/29.png"
                    alt="process"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/36.svg" alt="install" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Install Rojgar App</h5>
                    <p className="content">
                      Download the RojgarApp and get started on your journey to
                      earning online.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/30.png"
                    alt="process"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/37.svg" alt="register" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Register Yourself</h5>
                    <p className="content">
                      Sign up with your details and create your account in just
                      a few minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/29.png"
                    alt="process"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/38.svg" alt="training" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Attend trainings and share links</h5>
                    <p className="content">
                      Learn how to promote financial products effectively and
                      start sharing referral links.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/29.png"
                    alt="process"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/39.svg" alt="earn" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Start earning 1 Lakh+ monthly</h5>
                    <p className="content">
                      The more you share, the more you earn - unlock unlimited
                      income potential!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== About App Section ==================*/}
      <div
        className="about-area bg-gradient-gray pd-top-100 pd-bottom-100"
        id="home2-about"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="d-flex justify-content-center left-img">
                <div className="mobile-container">
                  <div className="inner">
                    <div className="screen">
                      <div className="screen-img">
                        <img
                          src={images.app_4}
                          alt="RojgarApp mobile screenshot"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="section-title mb-0 ps-xl-5">
                <h6 className="sub-title-sky-blue">ABOUT Our App</h6>
                <h2 className="title">Download the App Now</h2>
                <p className="content mb-4">
                  Unlock your earning potential with RojgarApp! Start your
                  journey to financial freedom with just a few simple steps.
                  Whether you're a beginner or an expert, our platform makes
                  earning easy and rewarding.
                </p>

                <h5 className="mt-4">Why Choose RojgarApp?</h5>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <ul className="single-list-inner style-check style-heading style-check mb-3">
                      <li>
                        <FaCheckCircle className="sky" /> Start Without
                        Investment
                      </li>
                      <li>
                        <FaCheckCircle className="sky" /> Free Training
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="single-list-inner style-check style-heading style-check mb-3">
                      <li>
                        <FaCheckCircle className="sky" /> Flexible Work Hours
                      </li>
                      <li>
                        <FaCheckCircle className="sky" /> Unlimited Earnings
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <Link
                    to="#"
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.rojgarapp.rojgar",
                        "_blank"
                      )
                    }
                  >
                    <img
                      src={images.play_store}
                      alt="Download from Play Store"
                      className="play-store h-100"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Services Section ==================*/}
      <div
        className="service-area bg-gray bg-relative pd-top-120 pd-bottom-120"
        style={{ backgroundImage: "url('./assets/img/bg/10.png')" }}
      >
        <div className="container pd-bottom-90">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h6 className="sub-title-sky-blue">Our Best Service</h6>
                <h2 className="title">
                  One Stop Platform for India's Top Financial Products
                </h2>
              </div>
            </div>
          </div>
          <div className="row custom-no-gutter">
            <div className="col-lg-4 col-md-6">
              {services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="single-service-inner-3 single-service-inner-3-left"
                >
                  <div className="thumb">
                    <div className="thumb-inner">
                      <img src={service.icon} alt={service.title} />
                    </div>
                  </div>
                  <div className="details">
                    <h5 className="mb-3">{service.title}</h5>
                    <p className="mb-0">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-md-6 bg-blue-right d-lg-inline-block d-none">
              <div className="service-thumb service-middle-section align-self-end">
                <img src={images.app_6} alt="RojgarApp services" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              {services.slice(3).map((service, index) => (
                <div
                  key={index}
                  className="single-service-inner-3 single-service-inner-3-right"
                >
                  <div className="thumb">
                    <div className="thumb-inner">
                      <img src={service.icon} alt={service.title} />
                    </div>
                  </div>
                  <div className="details">
                    <h5 className="mb-3">{service.title}</h5>
                    <p className="mb-0">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================== Testimonials Section ==================*/}
      <div
        className="testimonial-area pd-top-120 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/11.png")' }}
      >
        <div className="container">
          <div className="section-title">
            <h2 className="title">Client Says</h2>
            <p className="w-75">
              Want to be the next success story? Join RojgarApp today and start
              earning!
            </p>
          </div>
          <div className="testimonial-slider-1 slider-control-round slider-control-dots slider-control-right-top">
            <Slider {...settings}>
              {userReviews.map((review, index) => (
                <div key={index} className="item">
                  <div className="single-testimonial-inner style-1 text-center">
                    <h5>{review.name}</h5>
                    <p className="designation mb-3">{review.role}</p>
                    <div className="icon mb-2">
                      <img src="assets/img/icon/25.png" alt="quote" />
                    </div>
                    <p>{review.quote}</p>
                    <div className="ratting-inner mt-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <div className="thumb">
                      <img src={review.image} alt={review.name} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* ================== Brands Section ==================*/}
      <div
        className="about-area bg-gray pt-5 pb-5"
        style={{ marginBottom: 100 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center">
                <h2 className="title">We are in the News</h2>
              </div>
            </div>
          </div>

          <div className="client-slider">
            <div className="slider-container">
              <Slider {...brandSettings}>
                <div className="thumb">
                  <img src={images.Bajaj_Finserv} alt="Bajaj Finserv" />
                </div>
                <div className="thumb">
                  <img src={images.HDFC_SKY} alt="HDFC Sky" />
                </div>
                <div className="thumb">
                  <img src={images.HSBC_mf} alt="HSBC" />
                </div>
                <div className="thumb">
                  <img src={images.Loot_Mogule} alt="Loot Mogule" />
                </div>
                <div className="thumb">
                  <img src={images.money_control} alt="Money Control" />
                </div>
                <div className="thumb">
                  <img src={images.MStock} alt="MStock" />
                </div>
                <div className="thumb">
                  <img src={images.PhonePe_Share_Market} alt="PhonePe" />
                </div>
                <div className="thumb">
                  <img src={images.SBI_Logo} alt="SBI" />
                </div>
                <div className="thumb">
                  <img src={images.tvs} alt="TVS" />
                </div>
                <div className="thumb">
                  <img src={images.Yes_Bank} alt="Yes Bank" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Contact Section ==================*/}
      <div className="contact-area" id="home2-contact">
        <div className="container">
          <div className="contact-inner-1">
            <img
              className="top_image_bounce animate-img-1"
              src="assets/img/banner/2.png"
              alt="decoration"
            />
            <img
              className="top_image_bounce animate-img-2"
              src="assets/img/about/6.png"
              alt="decoration"
            />
            <div className="row">
              <div
                className="col-lg-8"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="1500"
              >
                <img
                  className="w-100"
                  src="assets/img/bg/contact-us.jpg"
                  alt="contact us"
                />
              </div>
              <div
                className="col-lg-4 wow animated fadeInRight"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1500"
              >
                <div className="section-title mb-0">
                  <h6 className="sub-title">GET IN TOUCH</h6>
                  <h2 className="title">
                    Helping You Build the Future You Envision!
                  </h2>
                  <p className="content">
                    Have questions or need support? Fill out the form below, and
                    our team will get back to you shortly!
                  </p>
                  <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            style={{ backgroundColor: "white", color: "black" }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            style={{ backgroundColor: "white", color: "black" }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input
                            name="phone"
                            maxLength={10}
                            type="tel"
                            placeholder="Your Phone"
                            style={{ backgroundColor: "white", color: "black" }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input
                            name="subject"
                            type="text"
                            placeholder="Your Subject"
                            style={{ backgroundColor: "white", color: "black" }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="single-input-inner style-border">
                          <textarea
                            name="message"
                            style={{ backgroundColor: "white", color: "black" }}
                            placeholder="Message"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-black mt-0 w-100 border-radius-5"
                        >
                          Submit now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Footer Section ==================*/}
      <footer
        className="footer-area bg-cover mt-0 pd-top-100"
        style={{ backgroundImage: 'url("assets/img/bg/14.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6">
              <div className="widget widget-recent-post">
                <LogoComp color={"white"} />
                <p className="text-white">
                  At RojgarApp, we are dedicated to empowering individuals with
                  earning opportunities. Our platform connects users with
                  high-demand products, trending apps & websites, and services,
                  enabling them to earn by promoting and generating leads.
                  <br /> <br />
                  Our mission is to create a platform where hard work meets
                  opportunity, helping users achieve financial growth and
                  success. Join us today and start turning your efforts into
                  earnings!
                </p>
                <Link
                  to="#"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.rojgarapp.rojgar",
                      "_blank"
                    )
                  }
                >
                  <img
                    src={images.play_store}
                    alt="Download from Play Store"
                    className="play-store"
                  />
                </Link>
              </div>
            </div>
            <div id="contact" className="col-lg-3 col-md-6">
              <div className="widget widget-recent-post">
                <h4 className="widget-title">Contact us</h4>
                <div className="widget widget_contact">
                  <ul className="details text-white">
                    <li>
                      <FaMapMarkerAlt className="sky" />
                      India
                    </li>
                    <li className="mt-3">
                      <FaPhoneAlt className="sky" /> +91 98702 12330
                    </li>
                    <li className="mt-2">
                      <FaEnvelope className="sky" /> support@rojgarapp.in
                    </li>
                  </ul>
                  <ul className="social-media mt-4">
                    <li>
                      <a href="#" className="sky">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sky">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sky">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sky">
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <p>© RojgarApp 2024 | All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-lg-end">
                <Link to="/term-condition">Terms &amp; Condition</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <a href="#home2-contact">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home2;
