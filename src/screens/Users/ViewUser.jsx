import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../components/Images";
import useDataStore from "../../store/dataStore";
import moment from "moment";

function ViewUser() {
  const { selectedUser } = useDataStore();
  return (
    <div className="content-page">
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
                          {selectedUser?.firstName +
                            " " +
                            selectedUser?.lastName}
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
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <h5 className="fs-17 text-dark">Work Information</h5>
                        <table className="table table-condensed mb-0 border-top">
                          <tbody>
                            <tr>
                              <th scope="row">Occupation</th>
                              <td className="ng-binding">
                                {selectedUser?.occupation}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Work Experience</th>
                              <td className="ng-binding">
                                {selectedUser?.work_experience} Years
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Income</th>
                              <td className="ng-binding">
                                {selectedUser?.income}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-6">
                        <h5 className="fs-17 text-dark">Bank Information</h5>
                        <table className="table table-condensed mb-0 border-top">
                          <tbody>
                            <tr>
                              <th scope="row">Bank Name</th>
                              <td className="ng-binding">SBI</td>
                            </tr>
                            <tr>
                              <th scope="row">Account No.</th>
                              <td className="ng-binding">5756768797890</td>
                            </tr>
                            <tr>
                              <th scope="row">IFSC Code</th>
                              <td className="ng-binding">SBIN0011548</td>
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
                  <div className="card-body">
                    <h5 className="fs-17 text-dark">Documents</h5>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <div className="text-center">
                          <img
                            src={selectedUser?.pan_image}
                            alt=""
                            className="img-thumbnail w-100 profile-doc-img"
                          />
                          <h5 className="mt-1 mb-0 fs-17 text-dark">
                            Pan Card
                          </h5>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="text-center">
                          <img
                            src={selectedUser?.cancelled_check}
                            alt=""
                            className="img-thumbnail w-100 profile-doc-img"
                          />
                          <h5 className="mt-1 mb-0 fs-17 text-dark">
                            Cancelled Check
                          </h5>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="text-center">
                          <img
                            src={images.avatar_1}
                            alt=""
                            className="img-thumbnail w-100 profile-doc-img"
                          />
                          <h5 className="mt-1 mb-0 fs-17 text-dark">
                            Bank Passbook
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
