import React from "react";

function Delete() {
  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="manage-bank">
            <div className="page-title-box">
              <div className="page-title-right">
                <div className="app-search"></div>
                {/* <Link
                // to="/users/add"
                onClick={() => setViewModal(true)}
                className="btn btn-primary"
              >
                Add User
              </Link> */}
              </div>
              <h4 className="page-title">Delete</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <form action="#" className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Phonr no.</label>
                    <input
                      type="number"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
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

export default Delete;
