import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import ImageUpload from "../components/ImageUpload";
import useDataStore from "../store/dataStore";
import axios from "axios";
import { apis } from "../utils/URL";
import useToastStore from "../store/toastStore";
import { CiSearch, CiWarning } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function Notification() {
  const { getTemplates, templates } = useDataStore();
  const { setToastData } = useToastStore();
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [isLoading, setIsLoading] = useState(true);
  const [currentRow, setCurrentRow] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row?.title,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          alt=""
          src={row.image}
          className="img-fluid"
          style={{ height: "50px", objectFit: "contain", width: "auto" }}
        />
      ),
    },
    {
      name: "Message",
      selector: (row) => row?.message,
    },

    {
      name: "Type",
      selector: (row) => row?.type,
    },
    {
      name: "Subject",
      selector: (row) => row?.subject,
    },
    // {
    //   name: "Edit",
    //   cell: (row) => (
    //     <button
    //       className="btn btn-info"
    //       onClick={() => {
    //         setAddModal({ type: "edit", state: true });
    //         setCurrentRow(row);
    //       }}
    //     >
    //       Edit
    //     </button>
    //   ),
    // },
    {
      // selector: (row) => row.year,
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setAddModal({ type: "edit", state: true });
              setCurrentRow(row);
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              setCurrentRow(row);
              e.preventDefault();
              setDeleteModal(!deleteModal);
            }}
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
      getTemplates();
      setIsLoading(false);
    }, 200);
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
    const { title, message, image, type } = currentRow;

    if (!title || !message || !image || !type) {
      return setToastData({ color: "red", message: "All fields are required" });
    }

    await axios
      .post(apis.createTemplate, { ...currentRow })
      .then(async (e) => {
        setCurrentRow({});
        await getTemplates();
        setToastData({ message: e.data.message });
        setAddModal({ type: "add", state: false });
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to create template" });
      });
  };

  const UpdateData = async () => {
    const { _id, ...rest } = currentRow;

    await axios
      .post(apis.updateTemplate, { id: _id, ...rest })
      .then(async (e) => {
        setCurrentRow({});
        await getTemplates();
        setToastData({ message: e.data.message });
        setAddModal({ type: "add", state: false });
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to create template" });
      });
  };

  const Delete = async () => {
    axios
      .post(apis.deleteTemplate, { id: currentRow?._id })
      .then(async (e) => {
        await getTemplates();
        setCurrentRow({});

        setToastData({
          color: "#00ff1e",
          message: `Template Deleted Successfully`,
        });
        setDeleteModal(false);
      })
      .catch((err) => {
        setToastData({
          color: "red",
          message: `Failed to delete template`,
        });
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
                    setCurrentRow({});
                    setAddModal({ type: "add", state: true });
                  }}
                >
                  Create Template
                </button>
              </div>
              <h4 className="page-title">Notification</h4>
            </div>
            <DataTable
              columns={columns}
              data={templates}
              progressPending={isLoading}
              pagination
            />
          </div>
        </div>
      </div>
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
            {addModal.type === "edit"
              ? "Send Notification"
              : "Create a Template"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                onChange={(e) => {
                  console.log(e.target.value);
                  setCurrentRow({ ...currentRow, type: e.target.value });
                }}
                defaultValue={currentRow?.type}
              >
                {" "}
                <option disabled value={""} selected={true}>
                  Select Type
                </option>
                <option value="notification">Notification</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentRow?.title}
                onChange={(e) => {
                  setCurrentRow({ ...currentRow, title: e.target.value });
                }}
              />
            </div>
            {currentRow?.type === "email" ? (
              <div className="col-12 col-lg-6 mb-2">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentRow?.subject}
                  onChange={(e) => {
                    setCurrentRow({ ...currentRow, subject: e.target.value });
                  }}
                />
              </div>
            ) : null}
            <div
              className={`col-12 mb-2 ${
                currentRow?.type === "email" ? "col-md-6" : ""
              }`}
            >
              <label className="form-label">Message</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentRow.message}
                onChange={(e) => {
                  setCurrentRow({ ...currentRow, message: e.target.value });
                }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label">Upload Image</label>
              <ImageUpload
                img={currentRow.image}
                setImage={(image) => {
                  setCurrentRow({ ...currentRow, image });
                }}
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
            Submit
          </button>
        </Modal.Footer>
      </Modal>{" "}
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
            onClick={Delete}
          >
            Continue
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Notification;
