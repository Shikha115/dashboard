import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import { apis } from "../utils/URL";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import { useLocation } from "react-router-dom";
import useToastStore from "../store/toastStore";
import { getBankById } from "../utils/helperfunctions";
import useAuthStore from "../store/authStore";

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
  }, []);

  useEffect(() => {
    if (allOffer?.length < 1) {
      return;
    }
    allOffer?.map((ele) => {
      let obj = {};
      ele?.offer_data?.forEach((e) => {
        obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
      });
      ele.columns = obj;
      return ele;
    });
  }, [allOffer]);

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
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const AddData = async () => {
    let obj = {};
    [...currentData].forEach((e) => {
      obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
    });
    let data = { ...addonData, offer_data: currentData, mobile_data: obj };

    axios
      .post(apis.createOffer, data)
      .then((res) => {
        getOfferbyId(category_id);
        setToastData({ message: res.data.message });
        setAddModal({ ...addModal, state: false });
      })
      .catch((error) => {
        console.log(error.response.data);
        setToastData({ message: "Failed to create offer", color: "red" });
        setAddModal({ ...addModal, state: false });
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
      })
      .catch((error) => {
        setToastData({ message: "Failed to edit offer", color: "red" });
        setAddModal({ ...addModal, state: false });
      });
  };

  const deleteData = async () => {
    if (password !== "hp38g3119") {
      setToastData({ message: "Incorrect password", color: "red" });
      return;
    }

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
      selector: (row) => row?.columns?.title,
      center: true,
      width: "auto",
    },
    {
      name: "Card Type",
      selector: (row) => row?.category_info?.name,
      center: true,
      width: "auto",
    },
    {
      name: "Earning",
      selector: (row) => row?.columns?.earning,
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
              setAddModal({ type: "edit", state: true });
              setData(row);
              setCurrentData(row?.offer_data);
              setAddonData({ status: row?.status, rank: row?.rank });
              setbankData(getBankById(bank, row?.bank_id));
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
            <DataTable
              // title="Movie List"
              columns={columns}
              data={allOffer}
              progressPending={isLoading}
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
      <Modal
        className={theme ? theme : ""}
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
            {addModal.type === "add" ? "Add" : "Edit"} {currentCategory?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            {currentData?.length > 0 &&
              currentData?.map((item, index) => {
                if (item?.key === "Rank") {
                  <div key={index} className="col-12 col-md-6 mb-2">
                    <label className="form-label">Rank</label>
                    <span className="fs-17 text-danger">*</span>
                    <input
                      className="form-control"
                      type="number"
                      defaultValue={item?.rank}
                      onChange={(e) => {
                        let val = e.target.value;
                        item.status = val;
                        setAddonData({
                          ...addonData,
                          bank_id: e.target.value.split(",")[1],
                          type_id: category_id,
                          rank: val,
                        });
                      }}
                      placeholder="Enter rank"
                    />
                  </div>;
                }
                if (item?.key === "Status") {
                  return (
                    <div key={index} className="col-12 col-md-6 mb-2">
                      <label className="form-label">Status</label>
                      <span className="fs-17 text-danger">*</span>
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          defaultChecked={addonData?.status}
                          onChange={(e) => {
                            let val = e.target.checked;
                            item.status = val;
                            setAddonData({
                              ...addonData,
                              bank_id: e.target.value.split(",")[1],
                              type_id: category_id,
                              status: val,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                if (item?.key === "Product Image") {
                  return (
                    <div key={index} className="col-12 col-md-6 mb-2">
                      <div className="col-12 col-md-12">
                        <label className="form-label">
                          Product Image{" "}
                          <span className="fs-17 text-danger">*</span>
                        </label>

                        <ImageUpload
                          img={item?.value}
                          purpose={"add"}
                          setImage={(e) => {
                            item.value = e;
                            setCurrentData([...currentData]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                if (item?.key === "Product Image Web") {
                  return (
                    <div key={index} className="col-12 col-md-6 mb-2">
                      <div className="col-12 col-md-12">
                        <label className="form-label">
                          Product Image Web{" "}
                          <span className="fs-17 text-danger">*</span>
                        </label>

                        <ImageUpload
                          img={item?.value}
                          purpose={"add"}
                          setImage={(e) => {
                            item.value = e;
                            setCurrentData([...currentData]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                // if (item?.key === "Bank Name") {
                //   return (
                //     <div key={index} className="col-12 col-md-6 mb-3">
                //       <label className="form-label">
                //         Choose Bank
                //         <span className="fs-17 text-danger">*</span>
                //       </label>
                //       <select
                //         className="form-select"
                //         required
                //         onChange={(e) => {
                //           item.value = e.target.value.split(",")[1];

                //           setAddonData({
                //             ...addonData,
                //             bank_id: item?.value,
                //             type_id: category_id,
                //           });
                //         }}
                //         defaultValue={
                //           bankData?.bank_name + "," + bankData?._id ??
                //           "Select a bank"
                //         }
                //       >
                //         {bank &&
                //           bank?.map((val, i) => {
                //             return (
                //               <option
                //                 key={i}
                //                 defaultValue={
                //                   bankData?.bank_name + "," + bankData?._id
                //                 }
                //                 value={`${val?.bank_name},${val?._id}`}
                //               >
                //                 {val?.bank_name}
                //               </option>
                //             );
                //           })}
                //       </select>
                //     </div>
                //   );
                // }
                return (
                  <div key={index} className="col-12 col-md-6 mb-2">
                    <label className="form-label">{item?.key}</label>
                    <span className="fs-17 text-danger">*</span>
                    <textarea
                      className="form-control"
                      type="text"
                      rows={Array.isArray(item?.value) ? item?.value.length : 1}
                      defaultValue={
                        Array.isArray(item?.value)
                          ? item?.value.join("\n")
                          : item?.value
                      }
                      style={{
                        height: "auto",
                        resize: "vertical",
                        overflow: "hidden",
                      }}
                      onChange={(e) => {
                        item.value = e.target.value;
                      }}
                      placeholder={"Enter " + item?.key}
                    />
                  </div>
                );
              })}
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
