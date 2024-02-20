import React, { useState } from "react";
import { images } from "../components/Images";

function MyLeads() {

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
                <h2>Kaye Morris</h2>
                <h3>UX Developer</h3>
                <p>
                  Empowering users through captivating interfaces, turning ideas
                  into pixel-perfect realities.
                </p>
                <button>Follow Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default MyLeads;
