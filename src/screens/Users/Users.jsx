import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import { USER_DATA } from "../../store/staticData";
import { FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import ViewUser from "./ViewUser";

function Users() {
  const { users, getAllUsers, setSelectedUser } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact No.",
      selector: (row) => row.phone,
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Wallet",
      selector: (row) => row.wallet,
    },
    {
      name: "Settlement",
      cell: (row) =>
        row?.lead_settlement.length > 0 ? (
          <Link className="btn btn-info" onClick={() => setSelectedUser(row)}>
            Settle
          </Link>
        ) : null,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setEditModal(true);
              setCurrentData(row);
              console.log(row, "row");
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-warning"
            // to="/users/view"
            // onClick={() => setSelectedUser(row)}
            onClick={() => {
              setSelectedUser(row);
              setViewModal(true);
            }}
          >
            <FaEye className="fs-18" />
          </Link>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      getAllUsers();
      setIsLoading(false);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
        <div className="content">
          <div className="container-fluid">
            <div className="manage-bank">
              <div className="page-title-box">
                <div className="page-title-right">
                  <div className="app-search">
                    <form>
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <span className="search-icon">
                          <CiSearch className="text-muted" />
                        </span>
                      </div>
                    </form>
                  </div>
                  {/* <Link
                    // to="/users/add"
                    onClick={() => setViewModal(true)}
                    className="btn btn-primary"
                  >
                    Add User
                  </Link> */}
                </div>
                <h4 className="page-title">Users</h4>
              </div>
              <DataTable
                columns={columns}
                data={users}
                progressPending={isLoading}
                pagination
              />
            </div>
          </div>
        </div>

      {/* view */}
      <Modal
        size="xl"
        show={viewModal}
        centered
        onHide={() => setViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewUser />
        </Modal.Body>
      </Modal>

      {/* update */}
      <Modal
        size="lg"
        scrollable
        show={editModal}
        centered
        onHide={() => setEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.name}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" className="form-control" />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                defaultValue={currentData?.email}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Phone no.</label>
              <input
                type="number"
                className="form-control"
                defaultValue={currentData?.phone}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.address}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">DOB</label>
              <input
                type="date"
                className="form-control"
                defaultValue={currentData?.dob}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Type</label>
              <select className="form-select" defaultValue={currentData?.type}>
                <option value="1">Agent</option>
                <option value="2">Manager</option>
              </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                defaultValue={currentData?.gender}
              >
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Pan no</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.pan_no}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Pan Image</label>
              <input type="file" className="form-control" />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Occupation</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.occupation}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Work Experience</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.work_experience}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Income</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentData?.income}
              />
            </div>
            {currentData?.bank_details.map((item, i) => {
              return (
                <>
                  <div className="col-12">
                    <h5 className="border-bottom pb-2">
                      Bank Information {i + 1}
                    </h5>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item?.bank_name}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Account No.</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item?.account_no}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item?.bank_ifsc}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Cancelled Check</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Passbook</label>
                    <input type="file" className="form-control" />
                  </div>
                </>
              );
            })}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setEditModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>

      {/* delete */}
      <Modal
        size="sm"
        show={deleteModal}
        centered
        onHide={() => setDeleteModal(false)}
      >
        <Modal.Body className="text-center p-4">
          <CiWarning className="fs-48 text-danger" />
          <h4 className="mt-2">Are You Sure?</h4>
          <p className="mt-3">
            Warning: You are about to delete this item. This action cannot be
            undone. Are you sure you want to proceed with the deletion?
          </p>
          <button
            type="button"
            className="btn btn-danger my-2"
            onClick={() => setDeleteModal(false)}
          >
            Continue
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Users;
