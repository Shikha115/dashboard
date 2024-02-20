import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { LOAN_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";

function ManageLoan() {
  const [isLoading, setIsLoading] = useState(true);
  const { loan, setLoan } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "60px",
    },
    {
      name: "Title	",
      selector: (row) => row.title,
    },
    {
      name: "Loan Type	",
      selector: (row) => row.type,
    },
    {
      name: "Bank Name	",
      selector: (row) => row.bank,
    },
    {
      name: "Rank	",
      selector: (row) => row.rank,
    },
    {
      name: "Interest Rate	",
      selector: (row) => row.interest,
    },
    {
      name: "Processing Fee	",
      selector: (row) => row.process_fee,
    },
    {
      name: "Tenure Range",
      selector: (row) => row.tenure_range,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="form-check form-switch">
          <input type="checkbox" className="form-check-input" />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/offer/loan/add">
            <MdEdit className="fs-18" />
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
      setLoan(LOAN_DATA);
      setIsLoading(false);
    }, 0);
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
                  <Link className="btn btn-primary" to="/offer/loan/add">
                    Add Loan
                  </Link>
                </div>
                <h4 className="page-title">Manage Loan</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={loan}
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

export default ManageLoan;
