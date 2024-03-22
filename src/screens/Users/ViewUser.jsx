import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../components/Images";
import useDataStore from "../../store/dataStore";
import moment from "moment";

function ViewUser() {
  const { selectedUser } = useDataStore();
  console.log(selectedUser);
  return (
    // <div className="content-page">
    <div className="content">
      <div className="container-fluid">
        <div className="view-user">
          {/* ================================================================================== */}
          <div className="row">
            <div className="col-sm-12">
              <div
                className="profile-bg-picture"
                style={{ backgroundImage: `url("${images.bg_profile}")` }}
              >
                <span className="picture-bg-overlay" />
              </div>

              <div className="profile-user-box">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="profile-user-img">
                      <img
                        src={selectedUser?.profile_image}
                        alt=""
                        className="avatar-lg rounded-circle"
                      />
                    </div>
                    <div className="">
                      {/* name */}
                      <h4 className="mt-4 fs-17 ellipsis">
                        {selectedUser?.firstName + " " + selectedUser?.lastName}
                      </h4>
                      <p className="font-13">Advisor</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex justify-content-end align-items-center gap-2">
                      <Link to="/users/add" className="btn btn-soft-danger">
                        <i className="ri-settings-2-line align-text-bottom me-1 fs-16 lh-1" />
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================================== */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-0">
                <div className="card-body">
                  <h5 className="fs-17 text-dark">Basic Information</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <table className="table table-condensed mb-0 border-top">
                        <tbody>
                          <tr>
                            <th scope="row">Email</th>
                            <td className="ng-binding">
                              {selectedUser?.email}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Phone</th>
                            <td className="ng-binding">
                              {" "}
                              {selectedUser?.phone}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Address</th>
                            <td className="ng-binding">
                              {selectedUser?.address}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-md-6">
                      <table className="table table-condensed mb-0 border-top">
                        <tbody>
                          <tr>
                            <th scope="row">Gender</th>
                            <td className="ng-binding">
                              {selectedUser?.gender}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Pan no</th>
                            <td className="ng-binding">
                              {selectedUser?.pan_no}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">DOB</th>
                            <td className="ng-binding">
                              {moment(Number(selectedUser?.dob)).format(
                                "DD MMM YY"
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card p-0">
                <div className="row">
                  {selectedUser?.bank_details?.map((item, index) => (
                    <div key={index} className="card-body">
                      <h5 className="fs-17 text-dark">
                        Bank Information {index + 1}
                      </h5>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <table className="table table-condensed mb-0 border-top">
                            <tbody>
                              <tr>
                                <th scope="row">Bank Name</th>
                                <td className="ng-binding">
                                  {item?.bank_name}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Bank IFSC</th>
                                <td className="ng-binding">
                                  {" "}
                                  {item?.bank_ifsc}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Account Number</th>
                                <td className="ng-binding">
                                  {item?.account_no}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="container">
                            <div className="row">
                              {/* First image and header */}
                              <div className="col">
                                <div className="d-flex flex-column align-items-center">
                                  <h4>Cancelled Check</h4>
                                  <img
                                    src={item?.cancelled_check}
                                    alt=""
                                    className="img-thumbnail w-10"
                                  />
                                </div>
                              </div>
                              {/* Second image and header */}
                              <div className="col">
                                <div className="d-flex flex-column align-items-center">
                                  <h4>Passbook</h4>
                                  <img
                                    src={item?.bank_passbook}
                                    alt=""
                                    className="img-thumbnail w-8"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ViewUser;
