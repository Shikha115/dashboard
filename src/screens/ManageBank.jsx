import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { BANK_DATA } from "../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function ManageBank() {
  const [isLoading, setIsLoading] = useState(true);
  const [updateBank, setUpdateBank] = useState({
    state: false,
    currentRow: null,
  });
  const [addBank, setAddBank] = useState(false);
  const addBankValue = useRef();
  const updateBankValue = useRef();
  const { bank, setBank } = useDataStore();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank,
    },
    {
      name: "Action",
      // selector: (row) => row.year,
      cell: (row) => (
        <div className="custom-table-btn">
          <Link
            className="btn btn-purple"
            to="#"
            onClick={() => setUpdateBank({ state: true, currentRow: row.id })}
          >
            <MdEdit className="fs-18" />
          </Link>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => handleDelete(e, row.id)}
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
      setBank(BANK_DATA);
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleBankAdd = () => {
    setAddBank(false);
    const index = bank.length + 1;
    const val = addBankValue.current.value;
    console.log(index, val, "info");
    setBank([...bank, { id: index, bank: val }]);
  };
  const handleBankUpdate = () => {
    console.log(
      updateBank.currentRow,
      "editing",
      updateBankValue.current.value
    );
    const currentRow = updateBank.currentRow;
    const val = updateBankValue.current.value;
    setUpdateBank((prev) => {
      return { ...prev, state: false };
    });
    const temp = bank.map((item, i) => {
      if (item.id === currentRow) {
        item.bank = val;
      }
      return item;
    });
    setBank([...temp]);
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    // const item = bank.filter((item) => item.id === id);
    // const index = bank.findIndex(item);
    // console.log(index, "csjdkm");
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setAddBank(true)}
                    >
                      Add Bank Name
                    </button>
                  </div>
                  <h4 className="page-title">Manage Bank</h4>
                </div>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={bank}
                progressPending={isLoading}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="sm"
        show={updateBank.state}
        centered
        onHide={() =>
          setUpdateBank((prev) => {
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
              ref={updateBankValue}
              placeholder="Enter bank name"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setUpdateBank((prev) => {
                return { ...prev, state: false };
              })
            }
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleBankUpdate}>
            Update
          </button>
        </Modal.Footer>
      </Modal>

      <Modal size="sm" show={addBank} centered onHide={() => setAddBank(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bank Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <label className="form-label">Bank Name</label>
            <input
              className="form-control"
              type="email"
              required=""
              placeholder="Enter bank name"
              ref={addBankValue}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setAddBank(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleBankAdd}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageBank;
