import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../components/Images";
import useDataStore from "../../store/dataStore";
import moment from "moment";

function ViewUser() {
  const { selectedUser } = useDataStore();
  console.log(selectedUser);
  return (
    <div className="view-user">
      {/* ================================================================================== */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card p-0">
            <div className="card-body">
              <div className="row view-user-basic-detail">
                <div className="col-12 col-md-3 h-100">
                  <div className="profile-user-img h-100">
                    <img
                      src={selectedUser?.profile_image}
                      alt=""
                      className="img-thumbnail w-100 h-100"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-9 h-100">
                  <ul className="view-user-list h-100">
                    <li>
                      <b>Email: </b>
                      <span>{selectedUser?.email}</span>
                    </li>
                    <li>
                      <b>Phone: </b>
                      <span>{selectedUser?.phone}</span>
                    </li>
                    <li>
                      <b>Address: </b>
                      <span>{selectedUser?.address}</span>
                    </li>
                    <li>
                      <b>Gender: </b>
                      <span>{selectedUser?.gender}</span>
                    </li>
                    <li>
                      <b>Pan no: </b>
                      <span>{selectedUser?.pan_no}</span>
                    </li>
                    <li>
                      <b>DOB: </b>
                      <span>
                        {" "}
                        {moment(Number(selectedUser?.dob)).format("DD MMM YY")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card p-0">
            <div className="row gy-3">
              {selectedUser?.bank_details?.map((item, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div className="card-body">
                    <h5 className="fs-17 text-dark">
                      Bank Information {index + 1}
                    </h5>
                    <ul className="view-user-list">
                      <li>
                        <b>Bank Name: </b>
                        <span>{item?.bank_name}</span>
                      </li>
                      <li>
                        <b>Bank IFSC: </b>
                        <span>{item?.bank_ifsc}</span>
                      </li>
                      <li>
                        <b>Account Number: </b>
                        <span>{item?.account_no}</span>
                      </li>
                    </ul>
                    {item?.cancelled_check && (
                      <div className="user-bank-img mb-1">
                        <button className="btn btn-primary w-100">
                          Cancelled Check
                        </button>
                        <img
                          src={item?.cancelled_check}
                          alt=""
                          className="img-thumbnail w-10"
                        />
                      </div>
                    )}
                    {item?.bank_passbook && (
                      <div className="user-bank-img mb-1">
                        <button className="btn btn-primary w-100">
                          Passbook
                        </button>
                        <img
                          src={item?.bank_passbook}
                          alt=""
                          className="img-thumbnail w-10"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
