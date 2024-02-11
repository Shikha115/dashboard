import React, { useState } from "react";
import { images } from "./Images";
import { Link } from "react-router-dom";
import {
  FaAddressCard,
  FaChevronDown,
  FaChevronRight,
  FaPiggyBank,
} from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { GiProgression, GiTakeMyMoney } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import Collapse from "react-bootstrap/Collapse";

function Sidebar() {
  const [data, setData] = useState([
    {
      icon: <FaPiggyBank />,
      category: "Manage Bank",
      subcategory: [],
      isActive: false,
      link: "/manage-bank",
    },
    {
      icon: <FaAddressCard />,
      category: "Credit Card",
      subcategory: [],
      isActive: false,
      link: "/manage-credit-card",
    },
    {
      icon: <MdAccountBox />,
      category: "Savings Account",
      subcategory: [],
      isActive: false,
      link: "/manage-saving",
    },
    {
      icon: <GiTakeMyMoney />,
      category: "Loan",
      subcategory: [],
      isActive: false,
      link:"/manage-loan"
    },
    {
      icon: <GiProgression />,
      category: " Investment",
      subcategory: [
        { category: "Manage Mutual Fund", link: "#" },
        { category: "Mutual Demat", link: "#" },
        { category: "Manage Fixed Deposit", link: "#" },
      ],
      isActive: false,
      link: "#",
    },
    {
      icon: <FaStar />,
      category: "Lead Report ",
      subcategory: [],
      isActive: false,
    },
  ]);
  let handleDropdown = (i) => {
    const temp = data.map((item, index) => {
      if (i === index) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setData([...temp]);
  };

  return (
    <div className="leftside-menu menuitem-active">
      {/* Brand Logo Light */}
      <Link to="/" className="logo logo-light">
        <span className="logo-lg">
          <img src={images.logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={images.logo_sm} alt="small logo" />
        </span>
      </Link>
      {/* Brand Logo Dark */}
      <Link to="/" className="logo logo-dark">
        <span className="logo-lg">
          <img src={images.logo_dark} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <img src={images.logo_sm} alt="small logo" />
        </span>
      </Link>
      {/* Sidebar -left */}
      <div className="h-100" id="leftside-menu-container">
        {/*- Sidemenu */}
        <ul className="side-nav">
          <li className="side-nav-title">Admin</li>
          {data.map((item, i) => {
            if (item.subcategory.length === 0) {
              return (
                <li className="side-nav-item" key={i}>
                  <Link to={item.link} className="side-nav-link">
                    <div>
                      <i>{item.icon}</i>
                      <span> {item.category}</span>
                    </div>
                  </Link>
                </li>
              );
            } else {
              return (
                <li className="side-nav-item" key={i}>
                  <Link
                    to={item.link}
                    onClick={() => handleDropdown(i)}
                    aria-controls={`sidebarPages_${i}`}
                    aria-expanded={item.isActive}
                    className="side-nav-link"
                  >
                    <div>
                      <i>{item.icon}</i>
                      <span> {item.category} </span>
                    </div>
                    <span className="side-arrow">
                      {item.isActive ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  </Link>
                  <Collapse in={item.isActive}>
                    <ul
                      className="side-nav-second-level"
                      id={`sidebarPages_${i}`}
                    >
                      {item.subcategory.map((e, index) => {
                        return (
                          <li key={index}>
                            <Link to={e.link}>{e.category}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Collapse>
                </li>
              );
            }
          })}
        </ul>
        {/*- End Sidemenu */}
        <div className="clearfix" />
      </div>
    </div>
  );
}

export default Sidebar;
