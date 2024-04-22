import React, { useEffect, useState } from "react";
import { images } from "./Images";
import { Link } from "react-router-dom";
import {
  FaAddressCard,
  FaChevronDown,
  FaChevronRight,
  FaPiggyBank,
  FaUsers,
} from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { GiProgression, GiTakeMyMoney } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import Collapse from "react-bootstrap/Collapse";
import useAuthStore from "../store/authStore";
import useDataStore from "../store/dataStore";

const Sidebar_data = [
  // {
  //   icon: <FaPiggyBank />,
  //   category: "Manage Bank",
  //   subcategory: [],
  //   isActive: false,
  //   link: "/manage-bank",
  // },
  {
    icon: <FaUsers />,
    category: "Users",
    subcategory: [],
    isActive: false,
    link: "/users",
  },
  {
    icon: <FaPiggyBank />,
    category: "Manage Category",
    subcategory: [],
    isActive: false,
    link: "/manage-category",
  },
];

const Sidebar_data2 = [
  {
    icon: <FaStar />,
    category: "Lead Report ",
    subcategory: [],
    isActive: false,
    link: "/lead",
  },
  {
    icon: <FaUsers />,
    category: "Users",
    subcategory: [],
    isActive: false,
    link: "/users",
  },

  {
    icon: <FaUsers />,
    category: "Notification",
    subcategory: [],
    isActive: false,
    link: "/notification",
  },
  {
    icon: <FaUsers />,
    category: "Banner",
    subcategory: [],
    isActive: false,
    link: "/manage-banner",
  },
];
function Sidebar() {
  const { currentPath } = useAuthStore();
  const { category } = useDataStore();
  const [data, setData] = useState();

  const handleOffers = () => {
    let obj = {
      icon: <GiProgression />,
      category: "Offers",
      subcategory: [],
      isActive: true,
      link: "#",
    };

    obj.subcategory = category
      ?.filter((item) => item?.status === true)
      .map((item) => {
        if (!item?.status) {
          return;
        }
        return {
          category: item?.name,
          link: `/offer/${item?._id}`,
        };
      });
    let arr = [...Sidebar_data, obj, ...Sidebar_data2];
    // console.log(arr);
    setData(arr);
    return;
  };

  useEffect(() => {
    handleOffers();
  }, [category]);

  let handleDropdown = (i) => {
    const temp = data.map((item, index) => {
      if (i === index) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setData([...temp]);
  };

  if (!data) return;
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
