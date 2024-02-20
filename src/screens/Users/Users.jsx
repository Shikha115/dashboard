import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import { USER_DATA } from "../../store/staticData";
import { FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";

function Users() {
  const { users, setUsers, getAllBank } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row, id) => id + 1,
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
          <Link className="btn btn-warning" to="/users/view">
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
      setUsers(USER_DATA);
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
                  <Link to="/users/add" className="btn btn-primary">
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
