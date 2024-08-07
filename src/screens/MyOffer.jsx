import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import { apis } from "../utils/URL";
import axios from "axios";

import { useLocation } from "react-router-dom";
import useToastStore from "../store/toastStore";
import { getBankById } from "../utils/helperfunctions";
import useAuthStore from "../store/authStore";
import _ from "lodash";
import AddModalComp from "./offers/AddModalComp";
import ImageModal from "../components/ImageModal";
import Loader from "../components/Loader";

function MyOffer() {
  const location = useLocation();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  const currentUrl = location.pathname;
  let category_id = currentUrl.split("/offer/")[1];

  const [isLoading, setIsLoading] = useState(true);
  const { allOffer, getOfferbyId, bank, getCategory } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState([]);
  const [addonData, setAddonData] = useState();
  const [bankData, setbankData] = useState();
  const [password, setpassword] = useState();
  const [Data, setData] = useState();

  const [currentCategory, setCurrentCategory] = useState();
  const [Offers, setOffers] = useState();

  useEffect(() => {
    (async function fetchData() {
      let res = await getCategory(category_id);
      setCurrentCategory(res);
    })();
  }, [category_id, getCategory]);

  useEffect(() => {
    setIsLoading(true);
    getOfferbyId(category_id);
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [category_id]);

  useEffect(() => {
    if (allOffer?.length < 1) {
      return;
    }
    setOffers(allOffer);
  }, [allOffer]);

  const searchFilter = (e) => {
    let filteredArr = [];
    let value = e?.target?.value?.toLowerCase();
    filteredArr = allOffer?.filter(
      (item) =>
        item?.mobile_data?.title?.toLowerCase()?.includes(value) ||
        item?.category_info?.name?.toLowerCase()?.includes(value)
    );
    setOffers(filteredArr);
  };

  const updateStatus = async (id, status) => {
    axios
      .post(apis.updateOfferStatus, { id, status })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };

  const updateIfFeatured = async (id, featured) => {
    axios
      .post(apis.updateIfFeatured, { id, featured })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };
  const updateConverting = async (id, converting) => {
    axios
      .post(apis.updateIfConverting, { id, converting })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };

  const updateRank = async (id, rank) => {
    axios
      .post(apis.updateOfferRank, { id, rank: Number(rank) })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update", color: "red" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const AddData = async () => {
    let obj = {};
    let isOk = false;
    [...currentData].forEach((e) => {
      obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
      if (e?.key !== "status") {
        if (e?.required && !e?.value) {
          isOk = true;
        } else {
          isOk = false;
        }
      } else {
        isOk = false;
      }
    });

    let data = {
      ...addonData,
      offer_data: currentData,
      type_id: currentCategory?._id,
      mobile_data: { ...obj, card_type: currentCategory?._id },
    };

    if (isOk) {
      setToastData({
        message: "Values marked by * are important",
        color: "red",
      });

      setIsLoading(false);

      return;
    }

    axios
      .post(apis.createOffer, data)
      .then((res) => {
        getOfferbyId(category_id);
        setToastData({ message: res.data.message });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setToastData({ message: "Failed to create offer", color: "red" });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
      });
  };

  const UpdateData = async () => {
    let obj = {};

    [...currentData].forEach((e) => {
      obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
    });

    let data = {
      ...addonData,
      offer_data: currentData,
      id: Data?._id,
      mobile_data: obj,
    };

    axios
      .post(apis.updateOffer, data)
      .then((res) => {
        getOfferbyId(category_id);
        setAddModal({ ...addModal, state: false });
        setToastData({ message: res.data.message });
        setIsLoading(false);
      })
      .catch((error) => {
        setToastData({ message: "Failed to edit offer", color: "red" });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
      });
  };

  const deleteData = async () => {
    if (password !== "hp38g3119") {
      setToastData({ message: "Incorrect password", color: "red" });
      return;
    }
    setpassword("");
    axios
      .post(apis.deleteOffer, { id: Data?._id })
      .then((res) => {
        getOfferbyId(category_id);
        setToastData({ message: res.data.message });
      })
      .catch((error) => {
        setToastData({ message: "Failed to delete offer", color: "red" });
      });
    setDeleteModal(false);
  };

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row?.mobile_data?.title,
      center: true,
      width: "auto",
    },
    {
      name: "Image",
      center: true,
      width: "auto",
      cell: (row) => (
        <ImageModal
          alt=""
          src={row?.mobile_data?.product_image}
          className="img-fluid"
          imgStyle={{ height: "50px", objectFit: "contain", width: "auto" }}
        />
      ),
    },
    {
      name: "Card Type",
      selector: (row) => row?.category_info?.name,
      center: true,
      width: "auto",
    },
    {
      name: "Earning",
      selector: (row) => row?.mobile_data?.earning,
      center: true,
      width: "auto",
    },
    {
      name: "Status",
      center: true,
      width: "auto",
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
      name: "Featured",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={row?.featured}
            onChange={(e) => {
              let val = e.target.checked;
              updateIfFeatured(row?._id, val);
              row.featured = val;
            }}
          />
        </div>
      ),
    },
    {
      name: "Top Converting",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={row?.converting}
            onChange={(e) => {
              let val = e.target.checked;
              updateConverting(row?._id, val);
              row.featured = val;
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
            type="number"
            className="form-control"
            style={{ width: 70 }}
            defaultValue={row?.rank}
            onChange={(e) => {
              let val = e.target.value;
              updateRank(row?._id, val);
              row.rank = val;
              console.log(val);
            }}
          />
        </div>
      ),
    },
    {
      name: "Action",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setData(row);
              setCurrentData(row?.offer_data);
              setAddonData({ status: row?.status, rank: row?.rank });
              setbankData(getBankById(bank, row?.bank_id));
              setAddModal({ type: "edit", state: true });
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <button
            className="btn btn-pink"
            onClick={() => {
              setData(row);
              setDeleteModal(true);
            }}
          >
            <MdDelete className="fs-18" />
          </button>
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
                        onChange={searchFilter}
                      />
                      <span className="search-icon">
                        <CiSearch className="text-muted" />
                      </span>
                    </div>
                  </form>
                </div>
                {currentCategory?.name === "All" ? null : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCurrentData(currentCategory?.offer_data);
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add {currentCategory?.name}
                  </button>
                )}
              </div>
              <h4 className="page-title">Manage {currentCategory?.name}</h4>
            </div>
            {isLoading ? <Loader /> : null}
            <DataTable
              columns={columns}
              data={Offers}
              // progressPending={isLoading}
              pagination
              paginationRowsPerPageOptions={[30, 60, 90, 120]}
              paginationPerPage={30}
            />
          </div>
        </div>
      </div>
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
          <h5 className="mt-3">Enter password to delete</h5>
          <input
            type="search"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-danger my-2"
            onClick={deleteData}
          >
            Delete
          </button>
        </Modal.Body>
      </Modal>
      <AddModalComp
        theme={theme}
        category_id={category_id}
        addModal={addModal}
        setAddModal={setAddModal}
        currentData={currentData}
        setCurrentData={setCurrentData}
        addonData={addonData}
        setAddonData={setAddonData}
        currentCategory={currentCategory}
        handleSubmit={handleSubmit}
        Data={Data}
      />
    </>
  );
}

export default MyOffer;
