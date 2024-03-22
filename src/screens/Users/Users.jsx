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
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/users/add">
            <MdEdit className="fs-18" />
          </Link>
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
          {row?.lead_settlement.length > 0 ? (
            <Link
              className="btn btn-warning "
              to="/users/view"
              onClick={() => setSelectedUser(row)}
            >
              <p>ghfhg</p>
            </Link>
          ) : null}
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

  return (
    <>
      <div className="content-page">
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
                  <Link
                    // to="/users/add"
                    onClick={() => setViewModal(true)}
                    className="btn btn-primary"
                  >
                    Add User
                  </Link>
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
      </div>

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
