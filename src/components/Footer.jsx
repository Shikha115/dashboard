import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-2">
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <p className="mb-0">Copyright © 2024 Rojgar. All rights reserved</p>
          <ul className="m-0 p-0">
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <b>|</b>
            </li>
            <li>
              <Link to="/term-condition">Term & Condition</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
