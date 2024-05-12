import { useEffect, useState } from "react";
import React from "react";
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSearch,
  FaDownload,
  FaYoutube,
  FaStar,
  FaArrowRight,
  FaPlus,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/home2.css";
import { images } from "../components/Images";
import { LogoComp } from "./Landing";
import Slider from "react-slick";
import ModalVideo from "react-modal-video";
import AOS from "aos";
import "aos/dist/aos.css";
import Accordion from "react-bootstrap/Accordion";

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
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);

  const menuActive = () => {
    setActive(!active);
  };
  const searchActive = () => {
    setSearchShow(!searchShow);
    console.log("hell");
  };
  // Control sidebar navigation
  let items = document.querySelectorAll(".menu-item-has-children > a");
  for (let i in items) {
    if (items.hasOwnProperty(i)) {
      items[i].onclick = function () {
        this.parentElement
          .querySelector(".sub-menu")
          .classList.toggle("active");
        this.classList.toggle("open");
      };
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
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
      <nav className="navbar navbar-area navbar-area-3 navbar-expand-lg">
        <div className="container nav-container custom-container">
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
              <img src={images.logo} alt="img" />
            </Link>
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
            <ul className="navbar-nav menu-open text-lg-center ps-lg-5 navbarFive">
              <li>
                <Link to="#">RajgarApp Seekers</Link>
              </li>
              <li>
                <Link to="#">RojgarApp Providers</Link>
              </li>
              <li>
                <a href="#home2-about">About Us</a>
              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop align-self-center">
            <a
              className="btn btn-base-color border-radius-5 d-flex align-items-center"
              href="#home2-about"
            >
              Get a quote <FaArrowRight className="mt-0" />
            </a>
          </div>
        </div>
      </nav>
      {/* ==================== Navbar Two end ====================*/}

      {/* ================== BannerFive Start ==================*/}
      <div
        className="banner-area bg-relative banner-area-1 pb-0 bg-cover"
        style={{ backgroundImage: 'url("./assets/img/banner-5/5.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="banner-inner pe-xl-4 pb-3">
                <h6
                  className="bg-base-2 text-white subtitle"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="1500"
                >
                  Designing for the future
                </h6>
                <h2
                  className="title text-white"
                  data-aos="fade-right"
                  data-aos-delay="250"
                  data-aos-duration="1500"
                >
                  Empowering Your Business With Artificial
                </h2>
                <p
                  className="content pe-xl-4"
                  data-aos="fade-right"
                  data-aos-delay="350"
                  data-aos-duration="1500"
                >
                  And In Order To Make A Business, Brand Advertising And
                  Marketing Plays An Important Role. Similarly, In
                </p>
                <Link
                  className="btn btn-border-base-2"
                  data-aos="fade-right"
                  data-aos-delay="450"
                  data-aos-duration="1500"
                  to="/about"
                >
                  Discover More <FaPlus />
                </Link>
                <div
                  className="d-inline-block align-self-center "
                  data-aos="fade-right"
                  data-aos-delay="350"
                  data-aos-duration="1500"
                >
                  <a
                    href="javascript:void(0)"
                    onClick={() => setOpen(true)}
                    className="video-play-btn-hover"
                  >
                    <img src="assets/img/video.svg" alt="img" />{" "}
                    <h6 className="d-inline-block text-white">how we work</h6>
                  </a>

                  <div></div>
                </div>
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isOpen}
                  videoId="XM6kTQPzzpQ"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-9 align-self-end">
              <div className="banner-thumb-2 mt-4 mt-lg-0">
                <div className="main-img-wrap">
                  <img
                    className="banner-animate-img banner-animate-img-1 left_image_bounce"
                    src="assets/img/banner-5/4.png"
                    alt="img"
                  />
                  <img
                    className="banner-animate-img banner-animate-img-3 top_image_bounce"
                    src="assets/img/banner-5/3.png"
                    alt="img"
                  />
                  <div>
                    <img className="main-img" src={images.app_7} alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== BannerFive End ==================*/}

      {/* =============== About Area Five End ===============*/}
      <div className="about-area pd-top-120 pd-bottom-120" id="home2-about">
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
                  src={images.logo}
                  alt="img"
                />
                <img className="main-img" src={images.app_4} alt="img" />
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
                <div className="mt-3 d-flex gap-2">
                  <Link to="#">
                    <img
                      src={images.play_store}
                      alt=""
                      className="play-store h-100"
                    />
                  </Link>
                  <Link
                    className="btn btn-base-color border-radius-5 mt-0"
                    to="#"
                  >
                    Discover More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =============== About Area Five End ===============*/}

      {/*=================== service area five start ===================*/}
      <div className="service-area bg-gray bg-relative pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h6 className="sub-title-sky-blue">Our Best Service</h6>
                <h2 className="title">
                  One Stop Platform for India’s Top Financial Products…
                </h2>
              </div>
            </div>
          </div>
          <div className="row custom-no-gutter">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner-3 single-service-inner-3-left">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/7.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">Credit Cards</Link>
                  </h5>
                  <p className="mb-0">
                    Empower Your Lifestyle, Swipe with Confidence with our
                    Credit cards
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-left">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/8.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">Bank Accounts</Link>
                  </h5>
                  <p className="mb-0">
                    Secure your saving and financial journey with our instant
                    Bank Accounts.
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-left mb-0">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/9.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">IntelliSense</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 bg-blue-right d-lg-inline-block d-none">
              <div className="service-thumb service-middle-section align-self-end">
                <img src={images.app_6} alt="img" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner-3 single-service-inner-3-right">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/10.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">Instant Loans</Link>
                  </h5>
                  <p className="mb-0">
                    Turning dreams into Reality with hassle-free personal loans
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-right">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/11.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">Demat Account</Link>
                  </h5>
                  <p className="mb-0">
                    Seamless investing & trading your gateway to a digital
                    wealth journey.
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-right mb-0">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/12.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link to="/service-details">Smart Vision</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== service area end ===================*/}

      {/*==================== Work Process Three start ====================*/}
      <div
        className="work-process-area bg-position-right pd-top-120 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/16.png")' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center pb-5">
                <h6 className="sub-title-sky-blue">WORK PROCESS</h6>
                <h2 className="title">Start earning with easy steps</h2>
              </div>
            </div>
          </div>
          <div className="work-process-area-inner-2">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/29.png"
                    alt="img"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/36.svg" alt="img" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Install Rojgar App</h5>
                    <p className="content">
                      Research ipsum dolor sit consec tetur sed diam in the
                      aliquam tempor
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/30.png"
                    alt="img"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/37.svg" alt="img" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">Register Yourself</h5>
                    <p className="content">
                      Create ipsum dolor sit consec tetur sed diam in the
                      aliquam tempor
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-process-inner style-2 text-center">
                  <img
                    className="line-img"
                    src="assets/img/about/29.png"
                    alt="img"
                  />
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/38.svg" alt="img" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">
                      Attend trainings and share financial product links
                    </h5>
                    <p className="content">
                      Develope ipsum dolor sit consec tetur sed diam in the
                      aliquam tempor
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-process-inner style-2 text-center">
                  <div className="thumb mb-3">
                    <img src="assets/img/icon/39.svg" alt="img" />
                  </div>
                  <div className="details">
                    <h5 className="mb-3">
                      Start earning more than ₹1 Lakh every month
                    </h5>
                    <p className="content">
                      Shop ipsum dolor sit consec tetur Malesuada sed diam in
                      the
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Work Process Three end ====================*/}
      {/* Brand Area One */}
      <div
        className="about-area bg-relative bg-cover pd-top-110 pd-bottom-100"
        style={{ backgroundImage: "url('./assets/img/bg/10.png')" }}
      >
        <div className="container pd-bottom-90">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center">
                <h2 className="title"> We are Featured In </h2>
              </div>
            </div>
          </div>

          <div className="client-slider">
            <div className="slider-container">
              <Slider {...settings}>
                <div className="thumb">
                  <img src={images.Bajaj_Finserv} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.HDFC_SKY} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.HSBC_mf} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.Loot_Mogule} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.money_control} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.MStock} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.PhonePe_Share_Market} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.SBI_Logo} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.tvs} alt="img" />
                </div>
                <div className="thumb">
                  <img src={images.Yes_Bank} alt="img" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Area One end */}

      {/* Contact Area Two */}
      <div className="contact-area pd-bottom-100" id="home2-contact">
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

      {/* Contact Area Two end */}

      {/*==================== Faq area start ====================*/}
      <div className="faq-area pd-bottom-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6 col-md-8 order-lg-last">
              <div className="about-thumb-inner video-thumb">
                <img className="main-img" src={images.app_5} alt="img" />
                <span
                  onClick={() => setOpen(true)}
                  className="video-play-btn-hover"
                >
                  <img src="assets/img/video.svg" alt="img" />{" "}
                  <h6 className="d-inline-block">how we work</h6>
                </span>
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isOpen}
                  videoId="XM6kTQPzzpQ"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 align-self-center">
              <div className="section-title mb-0 mt-4 mt-lg-0">
                <h6 className="sub-title">YOUR ANSWER</h6>
                <h2 className="title">
                  Have Any <span>Question</span> Please?
                </h2>
              </div>
              <Accordion
                defaultActiveKey="0"
                flush
                className="accordion-inner style-2 accordion-icon-left mt-3"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    What services do you offer?
                  </Accordion.Header>
                  <Accordion.Body>
                    Many desktop publishing packages and web page editors now
                    use Lorem Ipsum as their default model text, search for
                    'lorem ipsum' will uncover
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How experienced is your team?
                  </Accordion.Header>
                  <Accordion.Body>
                    Many desktop publishing packages and web page editors now
                    use Lorem Ipsum as their default model text, search for
                    'lorem ipsum' will uncover
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Can you provide of past projects?
                  </Accordion.Header>
                  <Accordion.Body>
                    Many desktop publishing packages and web page editors now
                    use Lorem Ipsum as their default model text, search for
                    'lorem ipsum' will uncover
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Faq area end ====================*/}

      {/* ================== Footer Four Start ==================*/}

      <footer
        className="footer-area bg-cover mt-0 pd-top-100"
        style={{ backgroundImage: 'url("assets/img/bg/14.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-recent-post">
                <img src={images.logo} alt="" className="logo" />
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Omnis, similique temporibus adipisci quaerat odio aspernatur
                  dolor!
                </p>
                <Link to="#">
                  <img src={images.play_store} alt="" className="play-store" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 ps-xl-5">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">Products</h4>
                <ul>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight />
                      Credit Card
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight />
                      Savings Account
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight />
                      Demat Account
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight />
                      Loan
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight />
                      Line of Credit
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Investment
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 ps-xl-5">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">Company</h4>
                <ul>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Credit industrys
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Reasearch sector
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Finance Sector{" "}
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Credit industrys
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Reasearch sector
                    </Link>
                  </li>
                  <li className="sky">
                    <Link to="/service">
                      <FaChevronRight /> Finance Sector
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-recent-post">
                <h4 className="widget-title">Contact us</h4>
                <div className="widget widget_contact">
                  <ul className="details text-white">
                    <li>
                      <FaMapMarkerAlt className="sky" />
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </li>
                    <li className="mt-3">
                      <FaPhoneAlt className="sky" /> (+888) 123 456 765
                    </li>
                    <li className="mt-2">
                      <FaEnvelope className="sky" /> infoname@mail.com
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
                <p>© Rojgar 2024 | All Rights Reserved</p>
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

      {/* ================== Footer Two  end ==================*/}
    </main>
  );
};

export default Home2;
