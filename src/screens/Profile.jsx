import React, { useEffect, useState } from "react";
import AddManager from "./Manager/AddManager";
import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";
import { apis } from "../utils/URL";
import axios from "axios";
import { INITIAL_DATA } from "../utils/extraData";

const Profile = () => {
  const { setToastData } = useToastStore();
  const {
    profile: { name, phone, password, email, access },
  } = useAuthStore();

  const whichAccess = (myAccess) => {
    switch (true) {
      case myAccess?.delete:
        return (
          <div className="custom-table-btn">
            <div className="btn btn-purple">Read</div>
            <div className="btn btn-pink">Edit</div>
            <div className="btn btn-warning">Delete</div>
          </div>
        );
      case myAccess?.edit:
        return (
          <div className="custom-table-btn">
            <div className="btn btn-purple">Read</div>
            <div className="btn btn-pink">Edit</div>
          </div>
        );
      case myAccess?.read:
        return (
          <div className="custom-table-btn">
            <div className="btn btn-purple">Read</div>
          </div>
        );
      default:
        return (
          <div className="custom-table-btn">
            <div className="">No Access Provided</div>
          </div>
        );
    }
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="manage-bank">
          <div className="page-title-box">
            <div className="page-title-right"></div>
            <h4 className="page-title">My Profile</h4>
          </div>

          <div className="row gy-6">
            <div className="col-12 col-lg-9">
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-17 text-dark flex-col">Information</h5>
                  <ul className="view-user-list">
                    <li>
                      <b>Name: </b>
                      <span>{name}</span>
                    </li>
                    <li>
                      <b>Email: </b>
                      <span>{email}</span>
                    </li>
                    <li>
                      <b>Phone Number: </b>
                      <span>{phone}</span>
                    </li>
                    <li>
                      <b>Password </b>
                      <span>{password}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-17 text-dark flex-col">Has access to</h5>
                  <ul className="view-user-list">
                    <li>
                      <b>Category </b>
                      {whichAccess(access?.category)}
                    </li>
                    <li>
                      <b>Users </b>
                      {whichAccess(access?.user)}
                    </li>
                    <li>
                      <b>Offers </b>
                      {whichAccess(access?.offer)}
                    </li>
                    <li>
                      <b>Leads </b>
                      {whichAccess(access?.lead)}
                    </li>
                    <li>
                      <b>Payments </b>
                      {whichAccess(access?.payment)}
                    </li>
                    <li>
                      <b>Notification </b>
                      {whichAccess(access?.notification)}
                    </li>
                    <li>
                      <b>Banner</b>
                      {whichAccess(access?.banner)}
                    </li>
                    <li>
                      <b>Sponsored Ad </b>
                      {whichAccess(access?.sponsored_ad)}
                    </li>
                    <li>
                      <b>Managers </b>
                      {whichAccess(access?.manager)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
