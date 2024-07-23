import React, { useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";
import { Link } from "react-router-dom";

function AddDemat() {
  const [description, setDescription] = useState("");

  return (
      <div className="content">
        <div className="container-fluid">
          <div className="add-credit">
            <div className="page-title-box">
            <div className="page-title-right">
                <Link className="btn btn-primary" to="/offer/demat">
                  Back
                </Link>
              </div>
              <h4 className="page-title">Add Demat</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Title <span className="fs-16">*</span>
                    </label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Choose Bank <span className="fs-16">*</span>
                    </label>
                    <select className="form-select">
                      {BANK_DATA.map((item, i) => {
                        return (
                          <option value={item.bank} key={i}>
                            {item.bank}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Exchange <span className="fs-16">*</span>
                    </label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Demat Fee <span className="fs-16">*</span>
                    </label>
                    <input type="number" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Trading Fee <span className="fs-16">*</span>
                    </label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Interest Rate <span className="fs-16">*</span>
                    </label>
                    <input type="number" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Upload Card Image <span className="fs-16">*</span>
                    </label>
                    <input type="file" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Apply Link <span className="fs-16">*</span>
                    </label>
                    <input type="url" className="form-control" required />
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheck1"
                      />
                      <label className="form-check-label" for="customCheck1">
                        Featured
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <ReactQuill
                      theme="snow"
                      // value={description}
                      // onChange={setDescription}
                    >
                      <div className="my-editing-area" />
                    </ReactQuill>
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
  );
}

export default AddDemat;
