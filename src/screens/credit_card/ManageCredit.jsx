import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { CREDIT_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";
import { apis } from "../../utils/URL";
import axios from "axios";

function ManageCredit() {
  const [isLoading, setIsLoading] = useState(true);
  const { credit, setCredit, allOffer, getAllOffer } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState(null);
  const { bank, setBank, getAllBank, getAllCategory, category } =
    useDataStore();

  const title = useRef(null);
  const bank_name = useRef(null);
  const card_type = useRef(null);
  const join_fee = useRef(null);
  const annual_fee = useRef(null);
  const card_image = useRef(null);
  const apply_link = useRef(null);
  const rank = useRef(null);
  const eligibility = useRef(null);
  const benefits = useRef(null);
  const documents = useRef(null);

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
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
          <button
            className="btn btn-pink"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete className="fs-18" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getAllBank();
    getAllCategory();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const AddData = async () => {
    const bank_detail = bank_name.current.value.split(",");
    let data = {
      type_id: "65c4bb05058cfc0846d4685c",
      title: title.current.value,
      bank_id: bank_detail[1],
      card_type: card_type.current.value,
      annual_fees: annual_fee.current.value,
      joining_fees: join_fee.current.value,
      image: card_image.current.value,
      apply_link: apply_link.current.value,
      desc: {
        eligibility: eligibility.current.value,
        benefits: benefits.current.value.split(","),
        documents: documents.current.value.split(","),
      },
      rank: rank.current.value,
      status: true,
      bank_name: bank_detail[0],
    };
    axios
      .post(apis.getallOffers, data)
      .then((response) => {
        console.log(data, "data");
      })
      .catch((error) => {
        console.log(error);
      });
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
                    Add Credit Card
                  </button>
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
            {addModal.type === "add" ? "Add" : "Edit"} Credit Card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Title<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={title}
                defaultValue={addModal.type === "edit" ? currentData.title : ""}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Choose Bank<span className="fs-17 text-danger">*</span>
              </label>
              <select
                className="form-select"
                required
                ref={bank_name}
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
              <label className="form-label">
                Card Type<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={card_type}
                defaultValue={
                  addModal.type === "edit" ? currentData.card_type : ""
                }
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">
                Joining Fee<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={join_fee}
                defaultValue={
                  addModal.type === "edit" ? currentData.joining_fees : ""
                }
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">
                Annual Fee<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={annual_fee}
                defaultValue={
                  addModal.type === "edit" ? currentData.annual_fees : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Upload Card Image
                <span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                required
                ref={card_image}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Apply Link<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="url"
                className="form-control"
                required
                ref={apply_link}
                defaultValue={
                  addModal.type === "edit" ? currentData.apply_link : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Rank<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                required
                ref={rank}
                defaultValue={addModal.type === "edit" ? currentData.rank : ""}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Eligibility<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={eligibility}
                defaultValue={
                  addModal.type === "edit" ? currentData.desc.Eligibility : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Benefits<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={benefits}
                defaultValue={
                  addModal.type === "edit"
                    ? currentData.desc.Features.toString()
                    : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Documents<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={documents}
                defaultValue={
                  addModal.type === "edit"
                    ? currentData.desc["Document Required"].toString()
                    : ""
                }
              />
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

export default ManageCredit;
