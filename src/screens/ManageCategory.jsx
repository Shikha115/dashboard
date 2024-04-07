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

const CAT_DATA = {
  name: "Savings Account",
  icon: "bank",
  iconType: "MaterialCommunityIcons",
  type_id: "savings_account",
  size: 20,
  status: true,
  rank: 1,
};

const RequiredData = [
  { key: "Title", required: true },
  { key: "Bank Name", required: true },
  { key: "Earning", required: true },
  { key: "Product Image", required: true },
  { key: "Apply Link", required: true },
  { key: "Benefit", required: true },
  { key: "Who can apply", required: true },
  { key: "How to process", required: true },
  { key: "Marketing", required: true },
  { key: "T&C", required: true },
  { key: "Rank", required: true },
  { key: "Status", required: true },
  { key: "Card Type", required: true },
];

const addon_data = { key: "", required: false };

function ManageCategory() {
  const { bank, setBank, isLoading, category, getAllCategory } = useDataStore();
  const { setToastData } = useToastStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState(category);
  const [updateBank, setUpdateBank] = useState();
  const [addCategory, setAddCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [inputData, setInputData] = useState({
    name: "",
    rank: 1,
    image: "",
    type_id: "",
    size: 20,
    status: false,
  });

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
    // console.log(id, status);
    axios
      .post(apis.updateCategory, { id, status })
      .then((e) => {})
      .catch((err) => {});
  };

  const updateRank = async (id, rank) => {
    // console.log(id, rank);
    axios
      .post(apis.updateCategory, { id, rank: Number(rank) })
      .then((e) => {})
      .catch((err) => {});
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
    },
    {
      name: "Category",
      selector: (row) => row?.name,
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
      name: "Rank",
      cell: (row) => (
        <div>
          <input
            defaultValue={row?.rank}
            type="number"
            className="form-control"
            style={{ width: "50%" }}
            onChange={(e) => {
              let val = e.target.value;
              updateRank(row?._id, val);
              row.status = val;
            }}
          />
        </div>
      ),
    },

    {
      // selector: (row) => row.year,
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link
            className="btn btn-purple"
            to="#"
            onClick={() => {
              setAddCategory("edit");
              setUpdateBank(row);
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
        console.log(e);
        setToastData({ message: e.data.message });
        getAllCategory();
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Failed to create Category" });
      });
  };

  const handleUpdateCategory = () => {};

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
        setToastData({ message: "Failed to delete" });
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
                  onClick={() => setAddCategory("add")}
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

export default ManageCategory;

function DeleteModalComp({ deleteModal, setDeleteModal, item, handleDelete }) {
  return (
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
          onClick={() => {
            // console.log(item);
            handleDelete(item?._id);
          }}
        >
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
}) {
  return (
    <Modal
      size="xl"
      show={addCategory}
      centered
      onHide={() => setAddCategory("")}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {addCategory === "edit" ? "Edit" : "Add"} Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="#" className="row">
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Category Name</label>
            <span className="fs-17 text-danger">*</span>
            <textarea
              className="form-control"
              type="email"
              rows={1}
              style={{
                height: "auto",
                resize: "none",
              }}
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
            <label className="form-label">Rank</label>
            <span className="fs-17 text-danger">*</span>
            <input
              className="form-control"
              type="number"
              rows={length + 1}
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
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Size</label>
            <span className="fs-17 text-danger">*</span>
            <input
              className="form-control"
              type="number"
              rows={length + 1}
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
          </div>{" "}
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Status</label>
            <span className="fs-17 text-danger">*</span>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked={inputData?.status}
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
                img={inputData?.image}
                purpose={"add"}
                setImage={(image) => setInputData({ ...inputData, image })}
                // getImage={handleImage}
              />
            </div>
          </div>{" "}
          {RequiredData.map((item, index) => (
            <div key={index} className="col-12 col-md-6 mb-2">
              <div className="col-12 col-md-12">
                <label className="form-label">Required Field </label>{" "}
                <span className="fs-17 text-danger">*</span>
              </div>

              <div>
                <textarea
                  disabled={true}
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
          ))}
          {addonInputData.map((item, index) => (
            <div key={index} className="col-12 col-md-6 mb-2">
              <div>
                <label className="form-label">Enter Field</label>
                <FaWindowClose
                  onClick={(m) => {
                    m.preventDefault();
                    console.log(index);
                    let arr = [...addonInputData];
                    // console.log(arr);
                    arr.splice(index, 1);
                    console.log(arr);
                    setAddonInputData(arr);
                  }}
                  className="fs-18 m-1"
                  color="red"
                />
              </div>

              <div>
                <div className="col">
                  <span>Required</span>{" "}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(b) => {
                      item.required = b?.target.checked;
                    }}
                  />
                </div>
                <textarea
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
          <div className="container d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-2 mb-3 ">
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
        <button className="btn btn-primary" onClick={handleAddCategory}>
          {addCategory === "edit" ? "Edit" : "Add"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
