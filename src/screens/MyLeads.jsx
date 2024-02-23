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
              <div className="row">
                <div className="col-12 col-md-5 col-lg-4">
                  <div className="left bg-primary">
                    <ul className="m-0 p-0">
                      <li>
                        Name: <span>Sanju</span>
                      </li>
                      <li>
                        Email: <span>Sanju@gmail.com</span>
                      </li>
                      <li>
                        Phone no: <span>9753568643</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-7 col-lg-8">
                  <div className="lead-card-data">
                    <h2>Create a Lead</h2>
                    <form action="#" className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Phone no.</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-12">
                        <button className="btn btn-purple">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLeads;
