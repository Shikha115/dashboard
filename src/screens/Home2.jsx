import { useState } from "react";
import React from "react";
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPlus,
  FaSearch,
  FaDownload,
  FaYoutube,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/home2.css";
import { images } from "../components/Images";

// Control sidebar navigation
let items = document.querySelectorAll(".menu-item-has-children > a");
for (let i in items) {
  if (items.hasOwnProperty(i)) {
    items[i].onclick = function () {
      this.parentElement.querySelector(".sub-menu").classList.toggle("active");
      this.classList.toggle("open");
    };
  }
}

const Home2 = () => {
  const [active, setActive] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const menuActive = () => {
    setActive(!active);
  };
  const searchActive = () => {
    setSearchShow(!searchShow);
    console.log("hell");
  };

  return (
    <main id="home2">
      {/* search popup start*/}
      <div
        className={searchShow ? "td-search-popup active" : "td-search-popup "}
        id="td-search-popup"
      >
        <form action="/" className="search-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search....."
            />
          </div>
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </div>
      {/* search popup end*/}
      <div
        onClick={searchActive}
        className={searchShow ? "body-overlay active" : "body-overlay"}
        id="body-overlay"
      ></div>
      {/* ==================== Navbar Two Start ====================*/}
      <nav className="navbar navbar-area navbar-area-2 navbar-expand-lg">
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              onClick={menuActive}
              className={
                active
                  ? "menu toggle-btn d-block d-lg-none open"
                  : "menu toggle-btn d-block d-lg-none"
              }
              data-target="#itech_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <img src="assets/img/logo.png" alt="img" />
            </Link>
            {/* <LogoComp color={"black"} /> */}
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            <span className="search-bar-btn" onClick={searchActive}>
              <FaSearch />
            </span>
          </div>
          <div
            className={
              active
                ? "collapse navbar-collapse sopen"
                : "collapse navbar-collapse"
            }
            id="itech_main_menu"
          >
            <ul className="navbar-nav menu-open text-lg-end">
              <li>
                <a href="#">Rajgarpay Seekers</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#"> Rojgarpay Providers </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#"> About us </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="bg-relative banner-area-2 bg-cover"
        style={{ backgroundImage: 'url("./assets/img/bg/8.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="banner-inner">
                <h2
                  className="title "
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  {" "}
                  Work & Earn AnyWhere{" "}
                </h2>
                <p
                  className="content pe-xl-5 "
                  data-aos="fade-right"
                  data-aos-delay="250"
                  data-aos-duration="1500"
                >
                  And In Order To Make A Business, Brand Advertising And
                  Marketing Plays An Important Role. Similarly, In Making
                  Cultivation Business Are Necessary.
                </p>
                <Link
                  className="btn btn-border-base me-2 btn-primary"
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="1500"
                  to="https://rojgarapp.in/app-release.apk"
                >
                  Download App <FaDownload />
                </Link>

                <Link
                  className="btn btn-border-base btn-black"
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="1500"
                  to="/dashboard"
                >
                  Continue on Web <FaChevronRight />
                </Link>

                <div
                  className="d-inline-block align-self-center "
                  data-aos="fade-right"
                  data-aos-delay="350"
                  data-aos-duration="1500"
                ></div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-9 "
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-duration="1500"
            >
              <div className="banner-thumb-2 mt-4 mt-lg-0">
                <div className="main-img-wrap">
                  <img
                    className="main-img"
                    src="assets/img/banner-2/rojgarpaymain.png"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="service-area bg-cover pd-top-120 pd-bottom-90 pd-top-110 pd-bottom-90"
        style={{ backgroundImage: 'url("assets/img/bg/3.png")' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center">
                <h6 className="sub-title"> WHAT WE OFFER </h6>
                <h2 className="title"> How to Work & Earn </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-4">
                  <img src="assets/img/icon/18.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3"> Register </h5>
                  <p className="content mb-3">
                    {" "}
                    Getting started is easy. Simply download the Rojgar Pay app
                    or continue on the web, and create your account. We'll guide
                    you through the process, ensuring a smooth and hassle-free
                    registration.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/16.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3"> Select Task </h5>
                  <p className="content mb-3">
                    {" "}
                    Explore a wide range of tasks available on our platform.
                    With various options to choose from, you can select tasks
                    that align with your skill set and interests. We believe in
                    leveraging your strengths to maximize your earning
                    potential.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/17.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3"> Get Training </h5>
                  <p className="content mb-3">
                    {" "}
                    Enhance your skills and become an expert in your chosen
                    field. We offer convenient training programs that you can
                    enroll in at your preferred time. Our training modules are
                    designed to equip you with the knowledge and tools necessary
                    to excel in your tasks.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/20.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3"> Start Working </h5>
                  <p className="content mb-3">
                    {" "}
                    Once you've selected a task and completed the training,
                    you're ready to start working. Whether it's onboarding
                    customers for different platforms or performing other tasks,
                    you have the freedom to work on projects that suit your
                    expertise and interests.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/20.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Earning </h5>
                  <p className="content mb-3">
                    {" "}
                    At Rojgar Pay, we value your hard work and dedication. After
                    you complete a task, our team will verify your work and
                    credit your earnings. Typically, you can expect your
                    earnings to be credited within 48 hours, ensuring a prompt
                    and reliable payment process.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/20.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Support</h5>
                  <p className="content mb-3">
                    {" "}
                    We believe in providing excellent support to our users. Our
                    support team is available from 6 AM to 12 PM, ready to
                    assist you with any questions or concerns you may have.
                    Whether through chat or call, we're here to ensure your
                    experience with Rojgar Pay is smooth and enjoyable.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area Two */}
      <div
        className="counter-area bg-relative bg-cover pd-top-110 pd-bottom-100"
        style={{ backgroundImage: 'url("./assets/img/bg/10.png")' }}
      >
        <div className="container pd-bottom-90">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center">
                <h2 className="title"> Our Success Story </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="col-lg-3 col-md-6 "
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1500"
            >
              <div className="single-counter-inner media">
                <div className="thumb media-left pe-4">
                  <img src="assets/img/icon/16.svg" alt="img" />
                </div>
                <div className="media-body">
                  <h4 className="mb-1">
                    <span className="counter">972765 +</span>
                  </h4>
                  <p className="mb-0">Task Completed </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 "
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1500"
            >
              <div className="single-counter-inner media">
                <div className="thumb media-left pe-4">
                  <img src="assets/img/icon/17.svg" alt="img" />
                </div>
                <div className="media-body">
                  <h4 className="mb-1">
                    <span className="counter">775469 k+</span>
                  </h4>
                  <p className="mb-0"> Users </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 "
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="single-counter-inner media">
                <div className="thumb media-left pe-4">
                  <img src="assets/img/icon/18.svg" alt="img" />
                </div>
                <div className="media-body">
                  <h4 className="mb-1">
                    <span className="counter">31725284 +</span>
                  </h4>
                  <p className="mb-0"> Earning Created </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 "
              data-aos="fade-up"
              data-aos-delay="250"
              data-aos-duration="1500"
            >
              <div className="single-counter-inner media">
                <div className="thumb media-left pe-4">
                  <img src="assets/img/icon/19.svg" alt="img" />
                </div>
                <div className="media-body">
                  <h4 className="mb-1">
                    <span className="counter">12063 +</span>
                  </h4>
                  <p className="mb-0"> Pincode </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Area Two */}
      <div className="contact-area">
        <div className="container">
          <div className="contact-inner-1">
            <img
              className="top_image_bounce animate-img-1"
              src="assets/img/banner/2.png"
              alt="img"
            />
            <img
              className="top_image_bounce animate-img-2"
              src="assets/img/about/6.png"
              alt="img"
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
                  alt="img"
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
                    Bringing Your <span>Vision</span> To Life
                  </h2>
                  <p className="content">
                    For your car we will do everything advice design in us
                    repairs and maintenance. We are the some preferred.
                  </p>
                  <form className="mt-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Email" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Phone" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Subject" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="single-input-inner style-border">
                          <textarea placeholder="Message" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-12">
                        <a
                          className="btn btn-black mt-0 w-100 border-radius-5"
                          href="#"
                        >
                          Submit now
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial One */}
      <div
        className="testimonial-area pd-top-120 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/11.png")' }}
      >
        <div className="container">
          <div className="section-title">
            <h2 className="title"> Client Says </h2>
            <p className="w-75">
              {" "}
              We offer a diverse range of work opportunities that cater to
              various skills and interests. Here are some of the types of work
              that individuals can engage in on our platform:{" "}
            </p>
          </div>
          <div className="testimonial-slider-1  slider-control-round slider-control-dots slider-control-right-top">
            <Carousel>
              <Carousel.Item>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="single-testimonial-inner style-1 text-center">
                      <h5>Devon Lane</h5>
                      <p className="designation mb-3">Marketing Coordinator</p>
                      <div className="icon mb-2">
                        <img src="assets/img/icon/25.png" alt="img" />
                      </div>
                      <p>
                        {" "}
                        Become a valuable asset for top-notch brands by
                        onboarding customers. You will earn a fixed payout for
                        every customer you successfully bring onboard. This role
                        allows you to showcase your persuasion and networking
                        skills while earning a rewarding income.
                      </p>
                      <div className="ratting-inner mt-4">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="thumb">
                        <img src={images.avatar_1} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Brand Area One */}
      <div className="about-area bg-gray pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center">
                <h2 className="title"> Brands we served </h2>
              </div>
            </div>
          </div>

            <div className="client-slider">
          <marquee width="100%" direction="left" >
              <div className="thumb">
                <img src="assets/img/client/7.svg" alt="img" />
              </div>
              <div className="thumb">
                <img src="assets/img/client/8.svg" alt="img" />
              </div>
              <div className="thumb">
                <img src="assets/img/client/9.svg" alt="img" />
              </div>
              <div className="thumb">
                <img src="assets/img/client/11.svg" alt="img" />
              </div>
              <div className="thumb">
                <img src="assets/img/client/8.svg" alt="img" />
              </div>
              <div className="thumb">
                <img src="assets/img/client/9.svg" alt="img" />
              </div>
          </marquee>
            </div>
        </div>
      </div>

      <footer className="footer-area bg-black mt-0 pd-top-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="widget widget_about">
                <div className="thumb">
                  <img src="assets/img/logo2.png" alt="img" />
                  {/* <LogoComp color={"white"} /> */}
                </div>
                <div className="details">
                  <p>
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <ul className="social-media">
                    <li>
                      <a href="#">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 offset-xl-2 col-md-6 ps-xl-5">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">Our Service</h4>
                <ul>
                  <li>
                    <Link to="/service">
                      <FaChevronRight /> Digital Marketing
                    </Link>
                  </li>
                  <li>
                    <Link to="/service">
                      <FaChevronRight /> Video Editing
                    </Link>
                  </li>
                  <li>
                    <Link to="/service">
                      <FaChevronRight /> Pc Repairs{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/service">
                      <FaChevronRight /> Web Development
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 offset-xl-1 col-md-6">
              <div className="widget widget_about">
                <h4 className="widget-title">Our Service</h4>
                <div className="details">
                  <p>
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <div className="subscribe mt-4">
                    <input type="text" placeholder="E-mail" />
                    <button>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom bg-gray-black">
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <p>© Yoursitename 2023 | All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-lg-end">
                <a href="#">Trams &amp; Condition</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home2;
