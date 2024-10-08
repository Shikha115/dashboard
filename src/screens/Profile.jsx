import React, { useEffect, useState } from "react";
import AddManager from "./Manager/AddManager";
import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";
import { apis } from "../utils/URL";
import axios from "axios";
import { INITIAL_DATA } from "../utils/extraData";

const Profile = () => {
  const { setToastData } = useToastStore();
  const { profile } = useAuthStore();
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [managerDetails, setManagerDetails] = useState(INITIAL_DATA);
  const [webusers, setWebUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setManagerDetails(profile);
  }, []);

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="manage-bank">
          <div className="page-title-box">
            <div className="page-title-right"></div>
            <h4 className="page-title">My Profile</h4>
          </div>

          <div className="row gy-3">
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-17 text-dark flex-col">Information</h5>
                  <ul className="view-user-list">
                    <li>
                      <b>Name: </b>
                      <span>Sahaj</span>
                    </li>
                    <li>
                      <b>Email: </b>
                      <span>sajah@gmail.com</span>
                    </li>
                    <li>
                      <b>Phone Number: </b>
                      <span>6765434578</span>
                    </li>
                    <li>
                      <b>Password </b>
                      <span>1234567890</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-17 text-dark flex-col">Has access to</h5>
                  <ul className="view-user-list">
                    <li>
                      <b>User </b>
                      <div className="custom-table-btn">
                        <div className="btn btn-purple">Add</div>
                        <div className="btn btn-pink">Edit</div>
                        <div className="btn btn-warning">Delete</div>
                      </div>
                    </li>
                    <li>
                      <b>Offers </b>
                      <div className="custom-table-btn">
                        <div className="btn btn-purple">Add</div>
                        <div className="btn btn-pink">Edit</div>
                        <div className="btn btn-warning">Delete</div>
                      </div>
                    </li>
                    <li>
                      <b>Lead reports </b>
                      <div className="custom-table-btn">
                        <div className="btn btn-purple">Add</div>
                        <div className="btn btn-pink">Edit</div>
                        <div className="btn btn-warning">Delete</div>
                      </div>
                    </li>
                    <li>
                      <b>Payment reports </b>
                      <div className="custom-table-btn">
                        <div className="btn btn-purple">Add</div>
                        <div className="btn btn-pink">Edit</div>
                        <div className="btn btn-warning">Delete</div>
                      </div>
                    </li>
                    <li>
                      <b>Banner </b>
                      <div className="custom-table-btn">
                        <div className="btn btn-purple">Add</div>
                        <div className="btn btn-pink">Edit</div>
                        <div className="btn btn-warning">Delete</div>
                      </div>
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
