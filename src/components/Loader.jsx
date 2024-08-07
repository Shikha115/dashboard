import React from "react";
import "./Loader.css"; // Import the CSS file for styling
import { images } from "./Images";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">{/* <img src={images.loader} alt="" /> */}</div>
    </div>
  );
};

export default Loader;
