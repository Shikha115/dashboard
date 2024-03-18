import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";

function ManageBank() {
  const { bank, setBank, isLoading, setIsLoading } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [updateBank, setUpdateBank] = useState({
    state: false,
    currentRow: null,
  });
  const [addBank, setAddBank] = useState(false);
  const addBankValue = useRef();
  const updateBankValue = useRef();

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row?.image?.replace("http://192.168.1.8:", "http://localhost:")}
          style={{
            justifyContent: "center",
            width: 80,
            aspectRatio: 1,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 100,
          }}
        />
      ),
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank_name,
    },

    {
      // selector: (row) => row.year,
      name: "Action",
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

  const handleBankAdd = () => {
    setAddBank(false);
    const index = bank.length + 1;
    const val = addBankValue.current.value;
    // console.log(index, val, "info");
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
    setDeleteModal(true);
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
          <form action="#" className="row">
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Bank Name</label>
              <input
                className="form-control"
                type="email"
                required=""
                ref={updateBankValue}
                placeholder="Enter bank name"
              />
            </div>
            <div className="col-12 col-md-12">
              <label className="form-label">Upload Image</label>
              <input
                className="form-control"
                type="file"
                required=""
                placeholder="Enter bank name"
              />
            </div>
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
          <form action="#" className="row">
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Bank Name</label>
              <input
                className="form-control"
                type="email"
                required=""
                placeholder="Enter bank name"
                ref={addBankValue}
              />
            </div>
            <div className="col-12 col-md-12">
              <label className="form-label">Upload Image</label>
              <input
                className="form-control"
                type="file"
                required=""
                placeholder="Enter bank name"
              />
            </div>
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

export default ManageBank;
