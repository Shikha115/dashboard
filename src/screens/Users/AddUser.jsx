import React, { useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";

function AddUser() {
  const [description, setDescription] = useState("");

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="add-credit">
            <div className="page-title-box">
              <h4 className="page-title">Add User</h4>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="header-title mb-0">Basic Information</h4>
              </div>
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Profile Image</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Phone no.</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">DOB</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Type</label>
                    <select className="form-select">
                      <option value="1">Agent</option>
                      <option value="2">Manager</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-select">
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Pan no</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Pan Image</label>
                    <input type="file" className="form-control" />
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="header-title mb-0">Work Detail</h4>
              </div>
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Occupation</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Work Experience</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Income</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="header-title mb-0">Bank Detail</h4>
              </div>
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Account No.</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Cancelled Check</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Passbook</label>
                    <input type="file" className="form-control" />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
