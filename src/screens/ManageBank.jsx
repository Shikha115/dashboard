import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import ImageUpload from "../components/ImageUpload";
import { images } from "../components/Images";
import axios from "axios";
import { apis } from "../utils/URL";
import useAuthStore from "../store/authStore";

function ManageBank() {
  const { setToastData, setShowToast } = useAuthStore();

  const { bank, isLoading, getAllBank } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();
  const [imageData, setImageData] = useState({
    type: addModal.type,
    image: "",
  });
  const [banks, setBanks] = useState(bank);

  const bankRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    setBanks(bank);
  }, [bank]);

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          alt=""
          src={row?.image}
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
      name: "Status",
      selector: (row) => (row?.isActive ? "Active" : "Inactive"),
    },

    {
      // selector: (row) => row.year,
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setAddModal({ type: "edit", state: true });
              setCurrentData(row);
              setImageData((prev) => {
                return { ...prev, image: "" };
              });
              // console.log(row, "update");
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              setCurrentData(row);
              handleDelete(e, row.id);
            }}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const getImage = (e) => {
    let image = URL.createObjectURL(e.target.files[0]);
    setImageData((prev) => {
      return { ...prev, image };
    });
    setCurrentData({ ...currentData, image, imageData: e.target.files[0] });
    // if (imageData.type == "edit") {
    // }
  };

  const DeleteBank = async () => {
    // console.log(currentData);
    // return;
    axios
      .post(apis.deleteBank, { id: currentData?._id })
      .then(async (e) => {
        await getAllBank("true");
        setCurrentData({});
        setShowToast(true);
        setToastData({
          color: "#00ff1e",
          message: `Bank Deleted Successfully`,
        });
        setDeleteModal(false);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const AddData = async () => {
    // console.log(currentData.imageData, bankRef.current.value);
    // return;
    const data = new FormData();
    data.append("image", currentData.imageData);
    data.append("bank_name", bankRef.current.value);
    data.append("isActive", statusRef.current.value);
    axios
      .post(apis.addBank, data)
      .then(async (e) => {
        await getAllBank("true");
        setCurrentData({});
        setShowToast(true);
        setToastData({
          color: "#00ff1e",
          message: `Bank Added Successfully`,
        });
        setAddModal({ ...addModal, state: false });
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const UpdateData = async () => {
    const data = new FormData();
    if (currentData?.imageData) {
      data.append("image", currentData.imageData);
    }
    data.append("bank_name", bankRef.current.value);
    data.append("id", currentData?._id);
    data.append("isActive", statusRef.current.value === "true" ? true : false);
    axios
      .post(apis.editBank, data)
      .then((e) => {
        getAllBank(true);
        setCurrentData({});
        setShowToast(true);
        setToastData({
          color: "#49e45b",
          message: `Bank Updated Successfully`,
        });
        setAddModal({ ...addModal, state: false });
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    await axios
      .post(apis.deleteBank)
      .then((e) => {
        // console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });

    setDeleteModal(!deleteModal);
  };

  const search = (val) => {
    let arr = banks.filter((e) => {
      return (
        e?.bank_name.toLowerCase().includes(val) ||
        e?.isActive?.toString()?.toLowerCase()?.includes(val)
      );
    });
    if (!val) {
      setBanks(bank);
      return;
    }
    setBanks(arr);
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
                        onChange={(e) => {
                          // console.log(e.target.value);
                          search(e?.target?.value);
                        }}
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
                  onClick={() => {
                    setCurrentData({});
                    setAddModal({ type: "add", state: true });
                    setImageData((prev) => {
                      return { ...prev, image: "" };
                    });
                  }}
                >
                  Add Bank Name
                </button>
              </div>
              <h4 className="page-title">Manage Bank</h4>
            </div>
            <DataTable
              // title="Movie List"
              columns={columns}
              data={banks}
              progressPending={isLoading}
              pagination
              key={(e) => e._id}
            />
          </div>
        </div>
      </div>
      <Modal
        size="sm"
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
            {addModal.type === "add" ? "Add" : "Edit"} Bank Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#" className="row">
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Bank Name</label>
              <input
                ref={bankRef}
                className="form-control"
                type="email"
                required=""
                defaultValue={currentData?.bank_name ?? ""}
              />
            </div>{" "}
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Satus</label>
              <input
                ref={statusRef}
                className="form-control"
                type="email"
                required=""
                defaultValue={currentData?.isActive ?? ""}
              />
            </div>
            <div className="col-12 col-md-12">
              <label className="form-label">Upload Image</label>

              <ImageUpload
                img={currentData?.imageData}
                purpose={addModal.type}
                setImage={(image) =>
                  setCurrentData({ ...currentData, imageData: image })
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
          <button className="btn btn-primary" onClick={handleSubmit}>
            {addModal.type === "add" ? "Add" : "Edit"}
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
            onClick={DeleteBank}
          >
            Continue
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageBank;
