import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { LOAN_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";
import ReactQuill from "react-quill";

function ManageLoan() {
  const [isLoading, setIsLoading] = useState(true);
  const { loan, setLoan } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState(null);
  const { bank, getAllBank } = useDataStore();

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
      selector: (row) => row.loan_type,
    },
    {
      name: "Bank Name	",
      selector: (row) => row.bank_name,
    },
    {
      name: "Rank	",
      selector: (row) => row.rank,
    },
    {
      name: "Interest Rate	",
      selector: (row) => row.interest_range,
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
          <button
            className="btn btn-purple"
            onClick={() => {
              setAddModal({ type: "edit", state: true });
              setCurrentData(row);
              setTimeout(() => {
                console.log(currentData, "Current Row Clicked");
              }, 2000);
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <button className="btn btn-pink" onClick={() => setDeleteModal(true)}>
            <MdDelete className="fs-18" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBank();
    setIsLoading(true);
    let timer = setTimeout(() => {
      setLoan(LOAN_DATA);
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const AddData = async () => {
    // const bank_detail = bank_name.current.value.split(",");
    // let data = {
    //   type_id: "65c4bb05058cfc0846d4685c",
    //   title: title.current.value,
    //   bank_id: bank_detail[1],
    //   card_type: card_type.current.value,
    //   annual_fees: annual_fee.current.value,
    //   joining_fees: join_fee.current.value,
    //   image: card_image.current.value,
    //   apply_link: apply_link.current.value,
    //   desc: {
    //     eligibility: eligibility.current.value,
    //     benefits: benefits.current.value.split(","),
    //     documents: documents.current.value.split(","),
    //   },
    //   rank: rank.current.value,
    //   status: true,
    //   bank_name: bank_detail[0],
    // };
    // axios
    //   .post(apis.getallOffers, data)
    //   .then((response) => {
    //     console.log(data, "data");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setAddModal({ ...addModal, state: false });
  };
  const UpdateData = async () => {
    setAddModal({ ...addModal, state: false });
  };

  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="manage-bank">
              <div className="page-title-box">
                <div className="page-title-right">
                  <button
                    className="btn btn-primary"
                    onClick={() => setAddModal({ type: "add", state: true })}
                  >
                    Add Loan
                  </button>
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
      <Modal
        size="lg"
        scrollable
        show={addModal.state}
        centered
        onHide={() =>
          setAddModal((prev) => {
            return { ...prev, state: false };
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {addModal.type === "add" ? "Add" : "Edit"} Loan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" required defaultValue={addModal.type === "edit" ? currentData.title : ""} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Choose Bank</label>
              <select
                className="form-select"
                required
                defaultValue={
                  addModal.type === "edit"
                    ? currentData.bank_name
                    : "Select a bank"
                }
              >
                {bank &&
                  bank?.map((item, i) => {
                    return (
                      <option value={`${item?.bank_name},${item?._id}`} key={i}>
                        {item?.bank_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Loan Type</label>
              <select className="form-select"  required
                defaultValue={
                  addModal.type === "edit"
                    ? currentData.loan_type
                    : "Select a bank"
                }>
                <option value="1">Home Loan</option>
                <option value="1">Personal Loan</option>
                <option value="1">Business Loan</option>
                <option value="1">Car Loan</option>
                <option value="1">Education Loan</option>
                <option value="1">Two Wheeler Loan</option>
                <option value="1">Used Car Loan</option>
                <option value="1">Unsecured Loan</option>
              </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Interest Rate</label>
              <input type="text" className="form-control" required defaultValue={addModal.type === "edit" ? currentData.interest_range : ""} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Processing Fee</label>
              <input type="text" className="form-control" required defaultValue={addModal.type === "edit" ? currentData.process_fee : ""} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Upload Card Image</label>
              <input type="file" className="form-control" required  />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Tenure Range</label>
              <input type="text" className="form-control" required defaultValue={addModal.type === "edit" ? currentData.tenure_range : ""} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Apply Link</label>
              <input type="url" className="form-control" required defaultValue={addModal.type === "edit" ? currentData.apply_link : ""} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheck1"
                />
                <label className="form-check-label" for="customCheck1">
                  Featured
                </label>
              </div>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <ReactQuill
                theme="snow"
                // value={description}
                // onChange={setDescription}
                defaultValue={addModal.type === "edit" ? currentData.desp : ""}
              >
                <div className="my-editing-area" />
              </ReactQuill>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setAddModal((prev) => {
                return { ...prev, state: false };
              })
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {addModal.type === "add" ? "Add" : "Edit"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageLoan;
