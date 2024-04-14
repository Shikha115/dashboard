import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import ImageUpload from "../components/ImageUpload";

import axios from "axios";
import { apis } from "../utils/URL";
import useAuthStore from "../store/authStore";

function ManageBanner() {
  const { setToastData } = useAuthStore();

  const { bank, isLoading, getAllBank } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();

  const [banks, setBanks] = useState(bank);

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
      name: "Banner Name",
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
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              setCurrentData(row);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const DeleteBank = async () => {
    axios
      .post(apis.deleteBank, { id: currentData?._id })
      .then(async (e) => {
        await getAllBank("true");
        setCurrentData({});

        setToastData({
          color: "#00ff1e",
          message: `Bank Deleted Successfully`,
        });
        setDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to delete bank`,
        });
      });
  };

  const AddData = async () => {
    const data = {
      image: currentData?.image,
      bank_name: currentData?.bank_name,
      isActive: currentData?.isActive,
    };

    axios
      .post(apis.addBank, data)
      .then(async (e) => {
        await getAllBank("true");
        setCurrentData({});
        setToastData({
          color: "#00ff1e",
          message: `Bank Added Successfully`,
        });
        setAddModal({ ...addModal, state: false });
        setTimeout(() => {}, 2000);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update bank`,
        });
      });
  };

  const UpdateData = async () => {
    let data = {
      bank_name: currentData?.bank_name,
      isActive: currentData?.isActive,
      id: currentData?._id,
    };
    if (currentData?.image) {
      data["image"] = currentData?.image;
    }

    axios
      .post(apis.editBank, data)
      .then((e) => {
        getAllBank(true);
        setCurrentData({});
        setToastData({
          color: "#49e45b",
          message: `Bank Updated Successfully`,
        });
        setAddModal({ ...addModal, state: false });
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update bank`,
        });
      });
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
                  }}
                >
                  Add Bank Name
                </button>
              </div>
              <h4 className="page-title">Manage Bank</h4>
            </div>
            <DataTable
              columns={columns}
              data={banks}
              progressPending={isLoading}
              pagination
              paginationRowsPerPageOptions={[50, 100, 150, 200]}
              paginationPerPage={50}
              key={(e, index) => e._id + index}
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
                className="form-control"
                type="email"
                required=""
                defaultValue={currentData?.bank_name ?? ""}
                onChange={(e) => {
                  setCurrentData({ ...currentData, bank_name: e.target.value });
                }}
              />
            </div>{" "}
            <div className="col-12 col-md-6 mb-2">
              <label className="form-label">Status</label>
              <span className="fs-17 text-danger">*</span>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={currentData?.isActive}
                  onChange={(e) => {
                    let val = e.target.checked;
                    setCurrentData({ ...currentData, isActive: val });
                  }}
                />
              </div>
            </div>{" "}
            <div className="col-12 col-md-12">
              <label className="form-label">Upload Image</label>

              <ImageUpload
                img={currentData?.image}
                purpose={addModal.type}
                setImage={(image) =>
                  setCurrentData({ ...currentData, image: image })
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

export default ManageBanner;
