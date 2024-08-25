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

import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";

import { static_pages } from "../utils/extraData";
import ImageModal from "../components/ImageModal";

function ManageBanner() {
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  const { banner, isLoading, getAllBanners, allOffer, getAllOffer } =
    useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();
  const [UpdatedData, setUpdatedData] = useState({});

  const [Pages, setPages] = useState([...static_pages]);

  const [banners, setBanner] = useState(banner);
  useEffect(() => {
    getAllBanners();
    getAllOffer(true);
  }, []);

  useEffect(() => {
    setBanner(banner);
  }, [banner]);

  useEffect(() => {
    setPages([...static_pages, ...allOffer]);
  }, [allOffer]);

  const updateRank = async (id, rank) => {
    axios
      .post(apis.editBanner, { id, rank: Number(rank) })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update" });
      });
  };

  const updateStatus = async (id, isActive) => {
    axios
      .post(apis.editBanner, { id, isActive })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update" });
      });
  };

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
      .post(apis.deleteBanner, { id: currentData?._id })
      .then(async (e) => {
        await getAllBanners();
        setCurrentData({});
        setToastData({
          color: "#47ad77",
          message: `Bank Deleted Successfully`,
        });
        setDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "#d03f3f",
          message: `Failed to delete bank`,
        });
      });
  };

  const AddData = async () => {
    const {
      isActive = false,
      route = "",
      route_id = "",
      title = "",
    } = UpdatedData;

    if (!isActive || !route || !route_id || !title) {
      setToastData({
        color: "red",
        message: "All details are required",
      });
      return;
    }

    let data = {
      ...UpdatedData,
    };

    axios
      .post(apis.addBanner, data)
      .then(async (e) => {
        setCurrentData({});
        setUpdatedData({});
        setToastData({
          color: "#00ff1e",
          message: `Banner Added Successfully`,
        });
        await getAllBanners();

        setAddModal({ ...addModal, state: false });
        setTimeout(() => {}, 2000);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update Banner`,
        });
      });
  };

  const UpdateData = async () => {
    let data = {
      id: currentData._id,
      ...UpdatedData,
    };

    axios
      .post(apis.editBanner, data)
      .then(async (e) => {
        setCurrentData({});
        setUpdatedData({});
        await getAllBanners();
        setToastData({
          color: "#49e45b",
          message: `Banner Updated Successfully`,
        });
        setAddModal({ ...addModal, state: false });
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update Banner`,
        });
      });
  };

  const search = (val) => {
    let arr = banners.filter((e) => {
      return (
        e?.title?.toLowerCase().includes(val?.toLowerCase()) ||
        e?.isActive?.toString()?.toLowerCase()?.includes(val)
      );
    });
    if (!val) {
      setBanner(banner);
      return;
    }
    setBanner(arr);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
      width: "70px",
    },
    {
      name: "Image",
      center: true,
      width: "auto",
      selector: (row) => (
        <ImageModal
          alt=""
          src={row?.image}
          imgStyle={{
            width: 200,
            height: 100,
            borderRadius: 10,
            objectFit: "stretch",
          }}
        />
      ),
    },
    {
      name: "Banner Name",
      center: true,
      width: "auto",
      selector: (row) => row.title,
    },
    {
      name: "Status",
      center: true,
      width: "auto",
      // style: { width: 1000 },
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={row?.isActive}
            onChange={(e) => {
              let val = e.target.checked;
              updateStatus(row?._id, val);
              row.isActive = val;
            }}
          />
        </div>
      ),
    },
    {
      name: "Rank",
      center: true,
      width: "auto",
      cell: (row) => (
        <div>
          <input
            defaultValue={row?.rank}
            type="number"
            className="form-control"
            style={{ width: 70 }}
            onChange={(e) => {
              let val = e.target.value;
              updateRank(row?._id, val);
              row.rank = val;
            }}
          />
        </div>
      ),
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
                    setUpdatedData({});
                    setAddModal({ type: "add", state: true });
                  }}
                >
                  Add Banner
                </button>
              </div>
              <h4 className="page-title">Manage Banners</h4>
            </div>
            <DataTable
              columns={columns}
              data={banners.length > 0 ? banners : []}
              progressPending={isLoading}
              pagination
              paginationRowsPerPageOptions={[50, 100, 150, 200]}
              paginationPerPage={50}
              key={(e) => e?._id}
            />
          </div>
        </div>
      </div>
      <Modal
        className={theme ? theme : ""}
        size="sm"
        show={addModal.state}
        centered
        onHide={() => {
          setUpdatedData({});
          setCurrentData({});
          setAddModal((prev) => {
            return { ...prev, state: false };
          });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {addModal.type === "add" ? "Add" : "Edit"} Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#" className="row">
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                required=""
                defaultValue={currentData?.title ?? ""}
                onChange={(e) => {
                  setUpdatedData({ ...UpdatedData, title: e.target.value });
                }}
              />
            </div>{" "}
            <div className="col-12 col-md-12 mb-3">
              <label className="form-label">
                Redirect to <span className="fs-17 text-danger">*</span>
              </label>
              <select
                className="form-select"
                required
                onChange={(e) => {
                  const selectedPage = Pages[e.target.selectedIndex];
                  // console.log(selectedPage);
                  let obj = {};
                  if (selectedPage.category_info?.name === "App Screen") {
                    obj.route = selectedPage.mobile_data?.title;
                    obj.route_id = "";
                  } else {
                    obj.route = "SingleOffer";
                  }

                  if (selectedPage._id) {
                    obj.route_id = selectedPage?._id;
                  }

                  setUpdatedData({
                    ...UpdatedData,
                    ...obj,
                  });
                }}
                defaultValue={""}
              >
                {Pages &&
                  Pages?.map((val, index) => {
                    return (
                      <option key={index} defaultValue={val?._id}>
                        {val?.mobile_data?.title} - {val?.category_info?.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Upload Image</label>

              <ImageUpload
                img={currentData?.image}
                purpose={addModal.type}
                setImage={(image) => {
                  setUpdatedData({ ...UpdatedData, image });
                  setCurrentData({ ...currentData, image });
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Status</label>
              <span className="fs-17 text-danger">*</span>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={currentData?.isActive}
                  onChange={(e) => {
                    let val = e.target.checked;
                    setUpdatedData({ ...UpdatedData, isActive: val });
                  }}
                />
              </div>
            </div>{" "}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setUpdatedData({});
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

      <Modal
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
      </Modal>
    </>
  );
}

export default ManageBanner;
