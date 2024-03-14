import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiWarning } from "react-icons/ci";
import { apis } from "../../utils/URL";
import axios from "axios";

function ManageSaving() {
  const [isLoading, setIsLoading] = useState(true);
  const { saving, getSaving } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState(null);
  const { bank, getAllCategory } = useDataStore();

  const title = useRef(null);
  const bank_name = useRef(null);
  const earning = useRef(null);
  const opening_charge = useRef(null);
  const min_balance = useRef(null);
  const interest_rate = useRef(null);
  const card_image = useRef(null);
  const apply_link = useRef(null);
  const rank = useRef(null);
  const eligibility = useRef(null);
  const benefits = useRef(null);
  const documents = useRef(null);

  useEffect(() => {}, []);

  const updateStatus = async (id, status) => {
    axios
      .post(apis.updateOfferStatus, { id, status })
      .then((e) => {})
      .catch((err) => {});
  };

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row?.title,
      maxWidth: "15%",
      minWidth: "10%",
    },
    {
      name: "Bank Name",
      selector: (row) => row?.bank_name,
      maxWidth: "15%",
      minWidth: "10%",
    },
    {
      name: "Opening Charges",
      selector: (row) => row?.opening_charge,
      maxWidth: "15%",
      minWidth: "5%",
    },
    {
      name: "Min. Balance",
      selector: (row) => row?.min_balance,
      maxWidth: "10%",
      minWidth: "5%",
    },
    {
      name: "Interest Rate",
      selector: (row) => row?.interest_rate,
      maxWidth: "10%",
      minWidth: "5%",
    },
    {
      name: "Earning",
      selector: (row) => row?.earning,
      maxWidth: "10%",
      minWidth: "5%",
    },
    {
      name: "Rank",
      selector: (row) => row?.rank,
      maxWidth: "10%",
      minWidth: "5%",
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={row?.status}
            onChange={(e) => {
              let val = e.target.checked;
              updateStatus(row?._id, val);
              row.status = val;
            }}
          />
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
              setCurrentData(row);
              setAddModal({ type: "edit", state: true });
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
    setIsLoading(true);
    getAllCategory();
    let timer = setTimeout(() => {
      getSaving();
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
    // console.log(allOffer, "abc");
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
    const bank_detail = bank_name?.current.value.split(",");
    let formData = new FormData();

    formData.append("type_id", "65c4bb05058cfc0846d4685d");
    formData.append("card_type", "Savings Account");
    formData.append("title", title.current.value);
    formData.append("bank_id", bank_detail[1]);
    formData.append("min_balance", min_balance.current.value);
    formData.append("opening_charge", opening_charge.current.value);
    formData.append("interest_rate", interest_rate.current.value);
    formData.append("apply_link", apply_link.current.value);
    formData.append("desc[eligibility]", eligibility.current.value);
    formData.append("rank", Number(rank.current.value));
    formData.append("status", true);
    formData.append("earning", Number(earning.current.value));
    formData.append("bank_name", bank_detail[0]);

    if (benefits.current.value) {
      formData.append("desc[features]", benefits.current.value);
    }

    if (documents.current.value) {
      formData.append("desc[documents_required]", documents.current.value);
    }

    if (card_image.current.files[0]) {
      formData.append("image", card_image.current.files[0]);
    }
    axios
      .post(apis.createOffer, formData)
      .then((res) => {
        getSaving();

        setAddModal({ ...addModal, state: false });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const UpdateData = async () => {
    const bank_detail = bank_name.current.value.split(",");

    const formData = new FormData();
    formData.append("id", currentData?._id);
    formData.append("title", title.current.value);
    formData.append("bank_id", bank_detail[1]);
    formData.append("card_type", "Savings Account");
    formData.append("min_balance", min_balance.current.value);
    formData.append("opening_charge", opening_charge.current.value);
    formData.append("interest_rate", interest_rate.current.value);
    formData.append("apply_link", apply_link.current.value);
    formData.append("desc[eligibility]", eligibility.current.value);
    formData.append("earning", Number(earning.current.value));
    formData.append("rank", rank.current.value);
    formData.append("status", true);
    formData.append("bank_name", bank_detail[0]);

    if (benefits.current.value) {
      formData.append("desc[features]", benefits.current.value);
    }

    if (documents.current.value) {
      formData.append("desc[documents_required]", documents.current.value);
    }

    if (card_image.current.files[0]) {
      formData.append("image", card_image.current.files[0]);
    }

    // return;
    axios
      .post(apis.updateOffer, formData)
      .then((res) => {
        getSaving();
        setAddModal({ ...addModal, state: false });
      })
      .catch((error) => {
        console.log(error);
      });
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
                    onClick={() => {
                      setCurrentData({});
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add Savings Account
                  </button>
                </div>
                <h4 className="page-title">Manage Savings Account</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={saving}
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
        onHide={() => {
          setAddModal((prev) => {
            return { ...prev, state: false };
          });
          setCurrentData({});
        }}
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
                defaultValue={
                  addModal.type === "edit" ? currentData?.title : ""
                }
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
                  currentData?.bank_name + "," + currentData?.bank_id ??
                  "Select a bank"
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
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">
                Opening Charge<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={opening_charge}
                defaultValue={
                  addModal.type === "edit" ? currentData?.opening_charge : ""
                }
              />
            </div>{" "}
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">
                Minimum Balance<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={min_balance}
                defaultValue={
                  addModal.type === "edit" ? currentData?.min_balance : ""
                }
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">
                Interest Rate<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={interest_rate}
                defaultValue={
                  addModal.type === "edit" ? currentData?.interest_rate : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Earning<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="url"
                className="form-control"
                required
                ref={earning}
                defaultValue={
                  addModal.type === "edit" ? currentData?.earning : ""
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
                accept="image/*"
                className="form-control"
                required
                ref={card_image}
                // defaultValue={currentData?.image}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    let image = URL.createObjectURL(e.target.files[0]);
                    // console.log(image, "hgf");
                    setCurrentData({ ...currentData, image });
                  }
                }}
              />
              <img
                defaultValue={currentData?.image}
                src={currentData?.image}
                alt="Selected"
                width="50"
                height={40}
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
                  addModal.type === "edit" ? currentData?.apply_link : ""
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
                defaultValue={addModal.type === "edit" ? currentData?.rank : ""}
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
                  addModal.type === "edit" ? currentData?.desc?.eligibility : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Benefits<span className="fs-17 text-danger">*</span>
              </label>
              <textarea
                type="text"
                className="form-control"
                required
                style={{ height: "auto" }}
                ref={benefits}
                defaultValue={
                  addModal.type === "edit"
                    ? currentData?.desc?.features?.join("\n")
                    : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Documents<span className="fs-17 text-danger">*</span>
              </label>
              <textarea
                type="text"
                className="form-control"
                required
                ref={documents}
                defaultValue={
                  addModal.type === "edit"
                    ? currentData?.desc?.documents_required?.join("\n")
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

export default ManageSaving;
