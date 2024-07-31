import React from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

function Home() {
  const { token, setToken } = useAuthStore();
  // console.log(token);
  return (
    <div className="content-page">
      <div className="content">
        {/* Start Content*/}
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="#">Velonic</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Layouts</Link>
                    </li>
                    <li className="breadcrumb-item active">Boxed</li>
                  </ol>
                </div>
                <h4 className="page-title">Boxed</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-xxl-3 col-sm-6">
              <div className="card widget-flat text-bg-pink">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-eye-line widget-icon" />
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Daily Visits
                  </h6>
                  <h2 className="my-2">8,652</h2>
                  <p className="mb-0">
                    <span className="badge bg-white bg-opacity-10 me-1">
                      2.97%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* end col*/}
            <div className="col-xxl-3 col-sm-6">
              <div className="card widget-flat text-bg-purple">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-wallet-2-line widget-icon" />
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Revenue
                  </h6>
                  <h2 className="my-2">$9,254.62</h2>
                  <p className="mb-0">
                    <span className="badge bg-white bg-opacity-10 me-1">
                      18.25%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* end col*/}
            <div className="col-xxl-3 col-sm-6">
              <div className="card widget-flat text-bg-info">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-shopping-basket-line widget-icon" />
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Orders
                  </h6>
                  <h2 className="my-2">753</h2>
                  <p className="mb-0">
                    <span className="badge bg-white bg-opacity-25 me-1">
                      -5.75%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* end col*/}
            <div className="col-xxl-3 col-sm-6">
              <div className="card widget-flat text-bg-primary">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-group-2-line widget-icon" />
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Users
                  </h6>
                  <h2 className="my-2">63,154</h2>
                  <p className="mb-0">
                    <span className="badge bg-white bg-opacity-10 me-1">
                      8.21%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* end col*/}
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="card-widgets">
                    <Link to="#" data-bs-toggle="reload">
                      <i className="ri-refresh-line" />
                    </Link>
                    <Link
                      data-bs-toggle="collapse"
                      to="#weeklysales-collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="weeklysales-collapse"
                    >
                      <i className="ri-subtract-line" />
                    </Link>
                    <Link to="#" data-bs-toggle="remove">
                      <i className="ri-close-line" />
                    </Link>
                  </div>
                  <h5 className="header-title mb-0">Weekly Sales Report</h5>
                  <div id="weeklysales-collapse" className="collapse pt-3 show">
                    <div dir="ltr">
                      <div
                        id="revenue-chart"
                        className="apex-charts"
                        data-colors="#3bc0c3,#1a2942,#d1d7d973"
                      />
                    </div>
                    <div className="row text-center">
                      <div className="col">
                        <p className="text-muted mt-3">Current Week</p>
                        <h3 className=" mb-0">
                          <span>$506.54</span>
                        </h3>
                      </div>
                      <div className="col">
                        <p className="text-muted mt-3">Previous Week</p>
                        <h3 className=" mb-0">
                          <span>$305.25 </span>
                        </h3>
                      </div>
                      <div className="col">
                        <p className="text-muted mt-3">Conversation</p>
                        <h3 className=" mb-0">
                          <span>3.27%</span>
                        </h3>
                      </div>
                      <div className="col">
                        <p className="text-muted mt-3">Customers</p>
                        <h3 className=" mb-0">
                          <span>3k</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end card-body*/}
              </div>{" "}
              {/* end card*/}
            </div>{" "}
            {/* end col*/}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-widgets">
                    <Link to="#" data-bs-toggle="reload">
                      <i className="ri-refresh-line" />
                    </Link>
                    <Link
                      data-bs-toggle="collapse"
                      to="#yearly-sales-collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="yearly-sales-collapse"
                    >
                      <i className="ri-subtract-line" />
                    </Link>
                    <Link to="#" data-bs-toggle="remove">
                      <i className="ri-close-line" />
                    </Link>
                  </div>
                  <h5 className="header-title mb-0">Yearly Sales Report</h5>
                  <div
                    id="yearly-sales-collapse"
                    className="collapse pt-3 show"
                  >
                    <div dir="ltr">
                      <div
                        id="yearly-sales-chart"
                        className="apex-charts"
                        data-colors="#3bc0c3,#1a2942,#d1d7d973"
                      />
                    </div>
                    <div className="row text-center">
                      <div className="col">
                        <p className="text-muted mt-3 mb-2">Quarter 1</p>
                        <h4 className="mb-0">$56.2k</h4>
                      </div>
                      <div className="col">
                        <p className="text-muted mt-3 mb-2">Quarter 2</p>
                        <h4 className="mb-0">$42.5k</h4>
                      </div>
                      <div className="col">
                        <p className="text-muted mt-3 mb-2">All Time</p>
                        <h4 className="mb-0">$102.03k</h4>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end card-body*/}
              </div>{" "}
              {/* end card*/}
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h4 className="fs-22 fw-semibold">69.25%</h4>
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        {" "}
                        US Dollar Share
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        id="us-share-chart"
                        className="apex-charts"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
                {/* end card body */}
              </div>{" "}
              {/* end card*/}
            </div>{" "}
            {/* end col*/}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-xl-4">
              {/* Chat*/}
              <div className="card">
                <div className="card-body p-0">
                  <div className="p-3">
                    <div className="card-widgets">
                      <Link to="#" data-bs-toggle="reload">
                        <i className="ri-refresh-line" />
                      </Link>
                      <Link
                        data-bs-toggle="collapse"
                        to="#yearly-sales-collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="yearly-sales-collapse"
                      >
                        <i className="ri-subtract-line" />
                      </Link>
                      <Link to="#" data-bs-toggle="remove">
                        <i className="ri-close-line" />
                      </Link>
                    </div>
                    <h5 className="header-title mb-0">Chat</h5>
                  </div>
                  <div id="yearly-sales-collapse" className="collapse show">
                    <div className="chat-conversation mt-2">
                      <div
                        className="card-body py-0 mb-3"
                        data-simplebar=""
                        style={{ height: 322 }}
                      >
                        <ul className="conversation-list">
                          <li className="clearfix">
                            <div className="chat-avatar">
                              <img
                                src="assets/images/users/avatar-5.jpg"
                                alt="male"
                              />
                              <i>10:00</i>
                            </div>
                            <div className="conversation-text">
                              <div className="ctext-wrap">
                                <i>Geneva</i>
                                <p>Hello!</p>
                              </div>
                            </div>
                          </li>
                          <li className="clearfix odd">
                            <div className="chat-avatar">
                              <img
                                src="assets/images/users/avatar-1.jpg"
                                alt="Female"
                              />
                              <i>10:01</i>
                            </div>
                            <div className="conversation-text">
                              <div className="ctext-wrap">
                                <i>Thomson</i>
                                <p>
                                  Hi, How are you? What about our next meeting?
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="clearfix">
                            <div className="chat-avatar">
                              <img
                                src="assets/images/users/avatar-5.jpg"
                                alt="male"
                              />
                              <i>10:01</i>
                            </div>
                            <div className="conversation-text">
                              <div className="ctext-wrap">
                                <i>Geneva</i>
                                <p>Yeah everything is fine</p>
                              </div>
                            </div>
                          </li>
                          <li className="clearfix odd">
                            <div className="chat-avatar">
                              <img
                                src="assets/images/users/avatar-1.jpg"
                                alt="male"
                              />
                              <i>10:02</i>
                            </div>
                            <div className="conversation-text">
                              <div className="ctext-wrap">
                                <i>Thomson</i>
                                <p>Wow that's great</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body pt-0">
                        <form
                          className="needs-validation"
                          noValidate=""
                          name="chat-form"
                          id="chat-form"
                        >
                          <div className="row align-items-start">
                            <div className="col">
                              <input
                                type="text"
                                className="form-control chat-input"
                                placeholder="Enter your text"
                                required=""
                              />
                              <div className="invalid-feedback">
                                Please enter your messsage
                              </div>
                            </div>
                            <div className="col-auto d-grid">
                              <button
                                type="submit"
                                className="btn btn-danger chat-send waves-effect waves-light"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>{" "}
                    {/* end .chat-conversation*/}
                  </div>
                </div>
              </div>{" "}
              {/* end card*/}
            </div>{" "}
            {/* end col*/}
            <div className="col-xl-8">
              {/* Todo*/}
              <div className="card">
                <div className="card-body p-0">
                  <div className="p-3">
                    <div className="card-widgets">
                      <Link to="#" data-bs-toggle="reload">
                        <i className="ri-refresh-line" />
                      </Link>
                      <Link
                        data-bs-toggle="collapse"
                        to="#yearly-sales-collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="yearly-sales-collapse"
                      >
                        <i className="ri-subtract-line" />
                      </Link>
                      <Link to="#" data-bs-toggle="remove">
                        <i className="ri-close-line" />
                      </Link>
                    </div>
                    <h5 className="header-title mb-0">Projects</h5>
                  </div>
                  <div id="yearly-sales-collapse" className="collapse show">
                    <div className="table-responsive">
                      <table className="table table-nowrap table-hover mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Assign</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Velonic Admin v1</td>
                            <td>01/01/2015</td>
                            <td>26/04/2015</td>
                            <td>
                              <span className="badge bg-info-subtle text-info">
                                Released
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Velonic Frontend v1</td>
                            <td>01/01/2015</td>
                            <td>26/04/2015</td>
                            <td>
                              <span className="badge bg-info-subtle text-info">
                                Released
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Velonic Admin v1.1</td>
                            <td>01/05/2015</td>
                            <td>10/05/2015</td>
                            <td>
                              <span className="badge bg-pink-subtle text-pink">
                                Pending
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Velonic Frontend v1.1</td>
                            <td>01/01/2015</td>
                            <td>31/05/2015</td>
                            <td>
                              <span className="badge bg-purple-subtle text-purple">
                                Work in Progress
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Velonic Admin v1.3</td>
                            <td>01/01/2015</td>
                            <td>31/05/2015</td>
                            <td>
                              <span className="badge bg-warning-subtle text-warning">
                                Coming soon
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Velonic Admin v1.3</td>
                            <td>01/01/2015</td>
                            <td>31/05/2015</td>
                            <td>
                              <span className="badge bg-primary-subtle text-primary">
                                Coming soon
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Velonic Admin v1.3</td>
                            <td>01/01/2015</td>
                            <td>31/05/2015</td>
                            <td>
                              <span className="badge bg-danger-subtle text-danger">
                                Cool
                              </span>
                            </td>
                            <td>Techzaa Studio</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end card*/}
            </div>{" "}
            {/* end col*/}
          </div>
          {/* end row */}
        </div>
        {/* container */}
      </div>
      {/* content */}
      {/* Footer Start */}
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              © Velonic - Theme by <b>Techzaa</b>
            </div>
          </div>
        </div>
      </footer>
      {/* end Footer */}
    </div>
  );
}

export default Home;
