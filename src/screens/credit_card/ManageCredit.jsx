import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { CREDIT_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";

function ManageCredit() {
  const [isLoading, setIsLoading] = useState(true);
  const { credit, setCredit, allOffer, getAllOffer } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row, i) => row.i,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "250px",
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank_name,
      width: "180px",
    },
    {
      name: "Card Type",
      selector: (row) => row.card_type,
      width: "150px",
    },
    {
      name: "Annual Fee",
      selector: (row) => row.annual_fees,
    },
    {
      name: "Rank",
      selector: (row) => row.rank,
    },
    {
      name: "Joining Fee",
      selector: (row) => row.joining_fees,
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
      // selector: (row) => row.year,
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/offer/credit-card/add">
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
      getAllOffer();
      // setCredit(CREDIT_DATA);
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
    console.log(allOffer, "abc");
  }, []);

  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="manage-bank">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link className="btn btn-primary" to="/offer/credit-card/add">
                    Add Credit Card
                  </Link>
                </div>
                <h4 className="page-title">Manage Credit Card</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={credit}
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

export default ManageCredit;
