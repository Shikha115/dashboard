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
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/home2.css";
import { LogoComp } from "./Landing";

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
    <main>
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
            {/* <Link to="/">
              <img src="assets/img/logo.png" alt="img" />
            </Link> */}
            <LogoComp color={"black"} />
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
                  to="/about"
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

      <div className="about-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="about-thumb-inner">
                <img
                  className="animate-img-3 z-index-2 top_image_bounce"
                  src="assets/img/banner-3/1.png"
                  alt="img"
                />
                {/* <img
                  className='main-img'
                  src='assets/img/banner-2/1.png'
                  alt='img'
                /> */}
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="section-title mb-0 ps-xl-5">
                <h6 className="sub-title-sky-blue">ABOUT COMPANY</h6>
                <h2 className="title">
                  Experience intelligence like never before
                </h2>
                <p className="content mb-4">
                  You can access SaaS applications through a web browser or
                  mobile app, as long as you have an internet connection.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="single-list-inner style-check style-heading style-check mb-3">
                      <li>
                        <FaCheckCircle className="sky" /> Mistakes To Avoid to
                        the
                      </li>
                      <li>
                        <FaCheckCircle className="sky" /> Your Startup industry
                        stan
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="single-list-inner style-check style-heading style-check mb-3">
                      <li>
                        <FaCheckCircle className="sky" /> Mistakes To Avoid to
                        the
                      </li>
                      <li>
                        <FaCheckCircle className="sky" /> Your Startup industry
                        stan
                      </li>
                    </ul>
                  </div>
                </div>
                <Link
                  className="btn btn-base-color border-radius-5"
                  to="/about"
                >
                  Discover More <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="service-area bg-cover pd-top-120 pd-bottom-90 pd-top-110 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/3.png")' }}
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

      {/*================= counter area start {/*=================*/}
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

      {/* Counter Area Two
      <CounterAreaTwo /> */}

      {/* Contact Area Two */}
      {/* <ContactAreaOne /> */}

      {/* Testimonial One */}
      {/* <TestimonialOne /> */}

      {/* Brand Area One */}
      {/* <BrandAreaOne /> */}

      <footer className="footer-area bg-black mt-0 pd-top-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="widget widget_about">
                <div className="thumb">
                  {/* <img src="assets/img/logo2.png" alt="img" /> */}
                  <LogoComp color={"white"} />
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
                <p>© Rojgar 2024 | All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-lg-end">
                <Link to="/term-condition">Terms &amp; Condition</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
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
