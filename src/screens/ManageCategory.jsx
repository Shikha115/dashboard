import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../store/dataStore";
import { MdDelete, MdEdit, MdDeleteForever } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import { apis } from "../utils/URL";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import ImageUpload from "../components/ImageUpload";
import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";

const RequiredData = [
  { key: "Title", required: true, can_delete: false },
  // { key: "Bank Name", required: true, can_delete: false },
  { key: "Earning", required: true, can_delete: false },
  { key: "Product Image", required: true, can_delete: false },
  { key: "Product Image Web", required: true, can_delete: false },
  { key: "Apply Link", required: true, can_delete: false },
  { key: "Benefit", required: true, can_delete: false },
  { key: "Who can apply", required: true, can_delete: false },
  { key: "How to process", required: true, can_delete: false },
  { key: "Marketing", required: true, can_delete: false },
  { key: "T&C", required: true, can_delete: false },
  { key: "Status", required: true, can_delete: false },
  // { key: "Rank", required: true, can_delete: false },
  // { key: "Card Type", required: true, can_delete: false },
];

const addon_data = { key: "", required: false, can_delete: true };

function ManageCategory() {
  const { isLoading, category, getAllCategory } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState(category);
  const [addCategory, setAddCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [inputData, setInputData] = useState({});

  const [addonInputData, setAddonInputData] = useState([]);

  const search = (val) => {
    let arr = categories.filter((e) => {
      return (
        e?.name.toLowerCase().includes(val) ||
        e?.isActive?.toString()?.toLowerCase()?.includes(val)
      );
    });
    if (!val) {
      setCategories(category);
      return;
    }
    setCategories(arr);
  };

  useEffect(() => {
    setCategories(category);
  }, [category]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const updateStatus = async (id, status) => {
    axios
      .post(apis.updateCategory, { id, status })
      .then((e) => {
        setToastData({ message: e.data.message });
        getAllCategory();
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update" });
      });
  };

  const updateRank = async (id, rank) => {
    axios
      .post(apis.updateCategory, { id, rank: Number(rank) })
      .then((e) => {
        setToastData({ message: "Rank updated sucessfully" });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update rank" });
      });
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
      center: true,
      width: "70px",
    },
    {
      name: "Category",
      selector: (row) => row?.name,
      center: true,
      width: "auto",
    },
    {
      name: "Image",
      center: true,
      width: "auto",
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
      name: "Status",
      center: true,
      width: "80px",
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
          <Link
            className="btn btn-purple"
            to="#"
            onClick={() => {
              setAddCategory("edit");
              setSelectedItem(row);
              setAddonInputData(row?.offer_data);
              // console.log(row?.offer_data);
            }}
          >
            <MdEdit className="fs-18" />
          </Link>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              setDeleteModal(true);
              setSelectedItem(row);
            }}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  const handleAddCategory = async () => {
    let type_id = inputData?.name?.toLowerCase()?.split(" ")?.join("_");
    let addonData = addonInputData.filter((item) => item.key !== "");

    const data = {
      ...inputData,
      type_id,
      earnings: Number(inputData?.earnings),
      rank: Number(inputData?.rank),
      offer_data: [...addonData, ...RequiredData],
    };

    // return;
    await axios
      .post(apis.createCategory, data)
      .then((e) => {
        // console.log(e);
        setToastData({ message: e.data.message });
        getAllCategory();
        setAddCategory("");
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to create Category" });
      });
  };

  const handleUpdateCategory = async (item) => {
    let addonData = addonInputData?.filter((item) => item.key !== "");

    const data = {
      id: item?._id,
      ...inputData,
      offer_data: [...addonData],
    };

    // return;
    await axios
      .post(apis.updateCategory, data)
      .then((e) => {
        console.log(e);
        setToastData({ message: e.data.message });
        getAllCategory();
        setAddCategory("");
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to create Category" });
      });
  };

  const handleDelete = async (id) => {
    if (!id) {
      return;
    }

    await axios
      .post(apis.deleteCategory, { id })
      .then((e) => {
        console.log(e);
        setToastData({ message: e.data.message });
        setDeleteModal(false);
        getAllCategory();
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to delete", color: "red" });
        setDeleteModal(false);
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
                        onChange={(e) => search(e.target.value)}
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
                    setAddCategory("add");
                    setSelectedItem({});
                    setInputData({});
                  }}
                >
                  Add Category
                </button>
              </div>
              <h4 className="page-title">Manage Category</h4>
            </div>
            <DataTable
              columns={columns}
              data={categories}
              progressPending={isLoading}
              pagination
              paginationRowsPerPageOptions={[50, 100, 150, 200]}
              paginationPerPage={50}
            />
          </div>
        </div>
      </div>

      <AddEditModalComp
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        update={update}
        setUpdate={setUpdate}
        inputData={inputData}
        length={(inputData?.earnings?.match(/\n/g) || []).length}
        setInputData={setInputData}
        addonInputData={addonInputData}
        setAddonInputData={setAddonInputData}
        handleAddCategory={handleAddCategory}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        handleUpdateCategory={handleUpdateCategory}
      />

      <DeleteModalComp
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        item={selectedItem}
        handleDelete={handleDelete}
      />
    </>
  );
}

function DeleteModalComp({ deleteModal, setDeleteModal, item, handleDelete }) {
  const { theme } = useAuthStore();
  const [password, setpassword] = useState();
  const { setToastData } = useToastStore();

  const verify = () => {
    if (password !== "hp38g3119") {
      setToastData({ message: "Incorrect password", color: "red" });
      return;
    }
    setpassword("");
    handleDelete(item?._id);
  };
  return (
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
        <input
          type="search"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setpassword(e.target.value)}
        />

        <button type="button" className="btn btn-danger my-2" onClick={verify}>
          Delete
        </button>
      </Modal.Body>
    </Modal>
  );
}

function AddEditModalComp({
  addCategory,
  setAddCategory,
  setInputData,
  inputData,
  length,
  setAddonInputData,
  addonInputData,
  setUpdate,
  update,
  handleAddCategory,
  selectedItem,
  setSelectedItem,
  handleUpdateCategory,
}) {
  const { theme } = useAuthStore();
  return (
    <Modal
      className={theme ? theme : ""}
      size="xl"
      show={addCategory}
      centered
      onHide={() => {
        setAddCategory("");
        setAddonInputData([]);
        setSelectedItem({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {addCategory === "edit" ? "Edit" : "Add"} Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="#" className="row">
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">
              Category Name <span className="fs-17 text-danger">*</span>
            </label>

            <input
              // disabled={addCategory === "edit"}
              className="form-control"
              type="text"
              // rows={1}
              defaultValue={selectedItem?.name}
              // style={{
              //   height: "auto",
              //   resize: "none",
              // }}
              required=""
              placeholder="Enter category name"
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  name: e.target.value,
                });
              }}
            />
          </div>{" "}
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">
              Rank <span className="fs-17 text-danger">*</span>
            </label>

            <input
              className="form-control"
              type="number"
              rows={length + 1}
              defaultValue={selectedItem?.rank}
              style={{
                height: "auto",
                resize: "vertical",
                overflow: "hidden",
              }}
              onChange={(b) =>
                setInputData({
                  ...inputData,
                  rank: b.target.value,
                })
              }
              placeholder="Enter rank"
            />
          </div>{" "}
          {/* <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Size</label>
            <span className="fs-17 text-danger">*</span>
            <input
              className="form-control"
              type="number"
              rows={length + 1}
              defaultValue={selectedItem?.size}
              style={{
                height: "auto",
                resize: "vertical",
                overflow: "hidden",
              }}
              onChange={(b) =>
                setInputData({
                  ...inputData,
                  earnings: b.target.value,
                })
              }
              placeholder="Enter size"
            />
          </div>{" "} */}
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Status</label>
            <span className="fs-17 text-danger">*</span>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked={selectedItem?.status}
                onChange={(e) => {
                  let val = e.target.checked;
                  setInputData({ ...inputData, status: val });
                }}
              />
            </div>
          </div>{" "}
          <div className="col-12 col-md-6 mb-2">
            <div className="col-12 col-md-12">
              <label className="form-label">Upload Image</label>
              <span className="fs-17 text-danger">*</span>
              <ImageUpload
                img={inputData?.image ? inputData?.image : selectedItem?.image}
                purpose={"add"}
                setImage={(image) => setInputData({ ...inputData, image })}
              />
            </div>
          </div>{" "}
        </form>{" "}
        <h4>Pre-Existing details for particular offer</h4>
        <form action="#" className="row">
          {addCategory !== "edit" &&
            RequiredData?.map((item, index) => (
              <div key={index} className="col-12 col-md-6 mb-2">
                <div className="col-12 col-md-12">
                  <label className="form-label">
                    {item?.key} <span className="fs-17 text-danger">*</span>
                  </label>{" "}
                  <textarea
                    disabled={true}
                    className="form-control"
                    rows="1"
                    style={{
                      height: "auto",
                      resize: "vertical",
                      overflow: "hidden",
                    }}
                    // value={item?.key}
                  />
                </div>
              </div>
            ))}
          {/* {addCategory === "edit" &&
            addonInputData.map((item, index) => (
              <div key={index} className="col-12 col-md-6 mb-2">
                <div className="col-12 col-md-12">
                  <label className="form-label">Required Field </label>{" "}
                  <span className="fs-17 text-danger">*</span>
                </div>

                <div>
                  <textarea
                    // disabled={true}
                    className="form-control"
                    rows={item?.key}
                    style={{
                      height: "auto",
                      resize: "vertical",
                      overflow: "hidden",
                    }}
                    value={item?.key}
                  />
                </div>
              </div>
            ))} */}
          {addonInputData?.length > 0 ? (
            <h4>Add details for particular offer</h4>
          ) : null}
          {addonInputData.map((item, index) => (
            <div key={index} className="col-12 col-md-6 mb-2 position-relative">
              <div className="delete-icon">
                {item?.can_delete ? (
                  <FaWindowClose
                    onClick={(m) => {
                      m.preventDefault();
                      let arr = [...addonInputData];
                      arr.splice(index, 1);
                      setAddonInputData(arr);
                    }}
                    className="fs-18"
                    color="#d03f3f"
                  />
                ) : (
                  <span className="fs-17 text-danger">*</span>
                )}
              </div>

              <div>
                <label className="form-label">
                  Required{" "}
                  {item?.can_delete ? (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={item?.required}
                      onChange={(b) => {
                        item.required = b?.target.checked;
                      }}
                    />
                  ) : null}
                </label>
                <textarea
                  disabled={!item?.can_delete}
                  className="form-control"
                  rows={(item?.key?.match(/\n/g) || []).length + 1}
                  style={{
                    height: "auto",
                    resize: "vertical",
                    overflow: "hidden",
                  }}
                  value={item?.key}
                  onChange={(b) => {
                    item.key = b.target.value;
                    setUpdate(!update);
                  }}
                  placeholder="Enter Value Type"
                />
              </div>
            </div>
          ))}
          <div className="col-12 text-center">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setAddonInputData([...addonInputData, { ...addon_data }]);
              }}
            >
              Add More
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => setAddCategory("")}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            addCategory === "edit"
              ? handleUpdateCategory(selectedItem)
              : handleAddCategory();
          }}
        >
          {addCategory === "edit" ? "Edit" : "Add"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ManageCategory;
