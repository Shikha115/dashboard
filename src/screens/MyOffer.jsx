import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import { apis } from "../utils/URL";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import { images } from "../components/Images";

function MyOffer() {
  const [isLoading, setIsLoading] = useState(true);
  const { credit, getCredit } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState(null);
  const { bank, getAllCategory } = useDataStore();
  const [imageData, setImageData] = useState({
    type: addModal.type,
    image: "",
  });

  const title = useRef(null);
  const bank_name = useRef(null);
  const earning = useRef(null);
  const join_fee = useRef(null);
  const annual_fee = useRef(null);
  const card_image = useRef(null);
  const apply_link = useRef(null);
  const rank = useRef(null);
  const eligibility = useRef(null);
  const benefits = useRef(null);
  const documents = useRef(null);

  useEffect(() => {
    getCredit();
  }, []);

  const updateStatus = async (id, status) => {
    axios
      .post(apis.updateOfferStatus, { id, status })
      .then((e) => {})
      .catch((err) => {});
  };

  const getImage = (image) => {
    setImageData((prev) => {
      return { ...prev, image };
    });
    console.log(image, "image");
    if (imageData.type == "edit") {
      setCurrentData({ ...currentData, image });
    }
  };

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
      style: {
        justifyContent: "center",
      },
    },
    {
      name: "Joining Fee",
      selector: (row) => row.joining_fees,
      style: {
        justifyContent: "center",
      },
    },
    {
      name: "Earning",
      selector: (row) => row.earning,
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
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setAddModal({ type: "edit", state: true });
              setCurrentData(row);
              console.log(row, "row");
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

    formData.append("type_id", "65c4bb05058cfc0846d4685c");
    formData.append("title", title.current.value);
    formData.append("bank_id", bank_detail[1]);
    formData.append("annual_fees", annual_fee.current.value);
    formData.append("joining_fees", join_fee.current.value);
    formData.append("apply_link", apply_link.current.value);
    formData.append("desc[eligibility]", eligibility.current.value);
    formData.append("card_type", "Credit Card");
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
        getCredit();
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
    formData.append("card_type", "Credit Card");
    formData.append("annual_fees", annual_fee.current.value);
    formData.append("joining_fees", join_fee.current.value);
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

    axios
      .post(apis.updateOffer, formData)
      .then((res) => {
        getCredit();
        setAddModal({ ...addModal, state: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentData({});
                    setAddModal({ type: "add", state: true });
                  }}
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
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Card Type<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                // ref={card_type}
                defaultValue={
                  addModal.type === "edit" ? currentData?.card_type : ""
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
                  addModal.type === "edit" ? currentData?.annual_fees : ""
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
                  addModal.type === "edit" ? currentData?.joining_fees : ""
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
                How to process<span className="fs-17 text-danger">*</span>
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
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                Who can apply<span className="fs-17 text-danger">*</span>
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
                Marketing<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={eligibility}
                defaultValue={
                  addModal.type === "edit" ? currentData?.marketing : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <label className="form-label">
                T&C<span className="fs-17 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={eligibility}
                defaultValue={addModal.type === "edit" ? currentData?.t_c : ""}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">
                Product Image
                <span className="fs-17 text-danger">*</span>
              </label>
              {addModal.type === "add" ? (
                <ImageUpload
                  img={
                    imageData.image === ""
                      ? images.imageUpload
                      : imageData.image
                  }
                  purpose={addModal.type}
                  getImage={getImage}
                />
              ) : addModal.type === "edit" ? (
                <ImageUpload
                  img={
                    imageData.image === ""
                      ? currentData?.image
                      : imageData.image
                  }
                  purpose={addModal.type}
                  getImage={getImage}
                />
              ) : (
                ""
              )}
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

export default MyOffer;
