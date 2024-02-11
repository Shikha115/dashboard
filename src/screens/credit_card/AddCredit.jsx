import React, { useState } from "react";
import ReactQuill from "react-quill";

function AddCredit() {
  const [description, setDescription] = useState("");

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="add-credit">
            <div className="page-title-box">
              <h4 className="page-title">Add Credit Card</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Choose Bank</label>
                    <select className="form-select">
                      <option value="1" selected>
                        SBI BANK
                      </option>
                      <option value="1">AXIS BANK</option>
                      <option value="1">DENA BANK</option>
                      <option value="1">ICICI BANK</option>
                      <option value="1">Equitas Bank</option>
                      <option value="1">AU Bank</option>
                      <option value="1">IndusInd Bank</option>
                      <option value="1">Kotak Bank</option>
                      <option value="1">IDFC Bank</option>
                      <option value="1">Bank of Baroda</option>
                      <option value="1">CITI BANK</option>
                      <option value="1">Standard Chartered Bank</option>
                      <option value="1">HDFC Bank</option>
                      <option value="1">Navi Finserv (NBFC)</option>
                      <option value="1">Aditya Birla (NBFC)</option>
                      <option value="1">KNAB Finance (NBFC)</option>
                      <option value="1">L&amp;T Finance (NBFC)</option>
                      <option value="1">Yes Bank</option>
                      <option value="1">Bajaj Finance (NBFC)</option>
                      <option value="1">Demat</option>
                      <option value="1">Mutual Fund</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Card Type</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Joining Fee</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Annual Fee</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Upload Card Image</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Apply Link</label>
                    <input type="url" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3 d-flex align-items-center">
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
    </div>
  );
}

export default AddCredit;
