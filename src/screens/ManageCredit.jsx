import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { CREDIT_DATA } from "../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function ManageCredit() {
  const [isLoading, setIsLoading] = useState(true);
  const [updateCredit, setUpdateCredit] = useState({
    state: false,
    currentRow: null,
  });

  const updateCreditValue = useRef();
  const { credit, setCredit } = useDataStore();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "250px",
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank,
      width: "180px",
    },
    {
      name: "Card Type",
      selector: (row) => row.card,
      width: "150px",
    },
    {
      name: "Annual Fee",
      selector: (row) => row.annual_fee,
    },
    {
      name: "Rank",
      selector: (row) => row.rank,
    },
    {
      name: "Joining Fee",
      selector: (row) => row.joining_fee,
    },
    {
      name: "Status",
      cell: (row) => (
        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" />
        </div>
      ),
    },
    {
      name: "Action",
      // selector: (row) => row.year,
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="#">
            <MdEdit
              className="fs-18"
              onClick={() =>
                setUpdateCredit({ state: true, currentRow: row.id })
              }
            />
          </Link>
          <Link className="btn btn-pink" to="#">
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      setCredit(CREDIT_DATA);
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCreditUpdate = () => {
    console.log(
      updateCredit.currentRow,
      "editing",
      updateCreditValue.current.value
    );
    const currentRow = updateCredit.currentRow;
    const val = updateCreditValue.current.value;
    setUpdateCredit((prev) => {
      return { ...prev, state: false };
    });
    const temp = credit.map((item, i) => {
      if (item.id === currentRow) {
        item.bank = val;
      }
      return item;
    });
    setCredit([...temp]);
  };

  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="manage-bank">
              <div className="top-btn">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <Link className="btn btn-primary" to="/add-credit-card">
                      Add Credit Card
                    </Link>
                  </div>
                  <h4 className="page-title">Manage Credit Card</h4>
                </div>
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
        show={updateCredit.state}
        centered
        onHide={() =>
          setUpdateCredit((prev) => {
            return { ...prev, state: false };
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Bank Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <label className="form-label">Bank Name</label>
            <input
              className="form-control"
              type="email"
              required=""
              ref={updateCreditValue}
              placeholder="Enter bank name"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setUpdateCredit((prev) => {
                return { ...prev, state: false };
              })
            }
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreditUpdate}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageCredit;
