import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { CiSearch, CiWarning } from "react-icons/ci";
import useToastStore from "../../store/toastStore";
import DataTable from "react-data-table-component";
import useDataStore from "../../store/dataStore";
import { Modal } from "react-bootstrap";
import AddManager from "./AddManager";
import { INITIAL_DATA } from "../../utils/extraData";
import axios from "axios";
import { apis } from "../../utils/URL";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteManagerModal from "./DeleteManagerModal";

function Manager() {
  const {
    theme,
    profile: { access },
  } = useAuthStore();
  const { setToastData } = useToastStore();
  const { banner, getAllBanners, allOffer, getAllOffer } = useDataStore();
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [deleteModal, setDeleteModal] = useState(false);
  const [managerDetails, setManagerDetails] = useState(INITIAL_DATA);
  const [webusers, setWebUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managerDetails.pass !== managerDetails.confirm_pass) {
      setToastData({ message: "Passwords don't match" });
      return;
    }

    console.log(managerDetails);

    // return;
    axios
      .post(apis.register, { ...managerDetails })
      .then((res) => {
        console.log(res);
        setAddModal({ state: false });
        setToastData({ message: "Manager added successfully" });
        setManagerDetails(INITIAL_DATA);
        getAllUsers();
      })
      .catch((err) => {
        setToastData({ message: "Failed to add Manager!" });

        console.log(err);
      });

    // console.log(managerDetails);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let [category, field] = name.split("."); // Split name into category and field

    if (field) {
      // For access object
      setManagerDetails((prevDetails) => ({
        ...prevDetails,
        access: {
          ...prevDetails.access,
          [category]: {
            ...prevDetails.access[category],
            [field]: type === "checkbox" ? checked : value,
          },
        },
      }));
    } else {
      // For other fields like name, email, etc.
      setManagerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const getAllUsers = async () => {
    setIsLoading(true);
    axios
      .get(apis.getAllWebUsers)
      .then((e) => {
        // console.log(e.data.data);
        setWebUsers(e?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
      width: "70px",
    },
    {
      name: "Name",
      center: true,
      width: "auto",
      selector: (row) => row?.name,
    },
    {
      name: "Phone",
      center: true,
      width: "auto",
      selector: (row) => row?.phone,
    },
    {
      name: "Email",
      center: true,
      width: "auto",
      selector: (row) => row?.email,
    },

    {
      // selector: (row) => row.year,
      name: "Action",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              if (!access?.manager?.edit) {
                setToastData({
                  message: "You don't have edit access",
                  color: "purple",
                });
                return;
              }
              setManagerDetails(row);
              setAddModal({ type: "edit", state: true });
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              if (!access?.manager?.delete) {
                setToastData({
                  message: "You don't have edit access",
                  color: "red",
                });
                return;
              }
              setManagerDetails(row);
              setDeleteModal(true);
              e.preventDefault();
            }}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          {!access?.manager?.read ? (
            <div
              style={{ height: "40vh" }}
              className="manage-bank d-flex justify-content-center align-items-center "
            >
              <h1 className="item">No Access Provided</h1>
            </div>
          ) : (
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
                            // search(e?.target?.value);
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
                      if (!access?.manager?.edit) {
                        setToastData({
                          message: "You don't have edit access",
                          color: "purple",
                        });
                        return;
                      }
                      // setUpdatedData({});
                      setManagerDetails(INITIAL_DATA);
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add Manager
                  </button>
                </div>
                <h4 className="page-title">Manage Banners</h4>
              </div>
              <DataTable
                columns={columns}
                data={webusers.length > 0 ? webusers : []}
                // data={[]}
                progressPending={isLoading}
                pagination
                paginationRowsPerPageOptions={[50, 100, 150, 200]}
                paginationPerPage={50}
                key={(e) => e?._id}
              />
            </div>
          )}
        </div>
      </div>
      {deleteModal ? (
        <DeleteManagerModal
          theme={theme}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          managerDetails={managerDetails}
          getAllUsers={getAllUsers}
        />
      ) : null}

      <Modal
        className={theme ? theme : ""}
        size="lg"
        show={addModal.state}
        centered
        onHide={() => {
          setAddModal((prev) => {
            return { ...prev, state: false };
          });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {addModal.type === "add" ? "Add" : "Edit"} Manager
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddManager
            handleSubmit={handleSubmit}
            managerDetails={managerDetails}
            setManagerDetails={setManagerDetails}
            handleChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setAddModal((prev) => {
                return { ...prev, state: false };
              });
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {addModal.type === "add" ? "Add" : "Edit"}
          </button>
        </Modal.Footer>
      </Modal>

      {/* <Modal
        className={theme ? theme : ""}
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
      </Modal> */}
    </>
  );
}

export default Manager;
