import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { MUTUAL_FUND_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";
import ReactQuill from "react-quill";

function MutualFund() {
  const [isLoading, setIsLoading] = useState(true);
  const { mutualFund, setMutualFund } = useDataStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState(null);
  const { bank,  } = useDataStore();

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "	Title	",
      selector: (row) => row.title,
    },
    {
      name: "	Bank Name	",
      selector: (row) => row.bank_name,
    },
    {
      name: "	Fund Category	",
      selector: (row) => row.category_fund,
    },
    {
      name: "	Return	",
      selector: (row) => row.return,
    },
    {
      name: "	Rank	",
      // selector: (row) => row.rank,
      cell: (row) => (
        <div>
          <input
            defaultValue={row?.rank}
            type="number"
            className="form-control"
            // onChange={(e) => {
            //   let val = e.target.value;
            //   updateRank(row?._id, val);
            //   row.status = val;
            // }}
          />
        </div>
      ),
    },
    {
      name: "	Minimum Investment",
      selector: (row) => row.min_investment,
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
              setTimeout(() => {
                console.log(currentData, "Current Row Clicked");
              }, 2000);
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
    let timer = setTimeout(() => {
      setMutualFund(MUTUAL_FUND_DATA);
      setIsLoading(false);
    }, 0);
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
    // const bank_detail = bank_name.current.value.split(",");
    // let data = {
    //   type_id: "65c4bb05058cfc0846d4685c",
    //   title: title.current.value,
    //   bank_id: bank_detail[1],
    //   card_type: card_type.current.value,
    //   annual_fees: annual_fee.current.value,
    //   joining_fees: join_fee.current.value,
    //   image: card_image.current.value,
    //   apply_link: apply_link.current.value,
    //   desc: {
    //     eligibility: eligibility.current.value,
    //     benefits: benefits.current.value.split(","),
    //     documents: documents.current.value.split(","),
    //   },
    //   rank: rank.current.value,
    //   status: true,
    //   bank_name: bank_detail[0],
    // };
    // axios
    //   .post(apis.getallOffers, data)
    //   .then((response) => {
    //     console.log(data, "data");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setAddModal({ ...addModal, state: false });
  };
  const UpdateData = async () => {
    setAddModal({ ...addModal, state: false });
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
                    onClick={() => setAddModal({ type: "add", state: true })}
                  >
                    Add Mutual Fund
                  </button>
                </div>
                <h4 className="page-title">Mutual Fund</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={mutualFund}
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
            {addModal.type === "add" ? "Add" : "Edit"} Mutual Fund
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Title <span className="fs-16">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                defaultValue={addModal.type === "edit" ? currentData.title : ""}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Choose Bank <span className="fs-16">*</span>
              </label>
              <select
                className="form-select"
                required
                defaultValue={
                  addModal.type === "edit"
                    ? currentData.bank_name
                    : "Select a bank"
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
                Fund Category <span className="fs-16">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                defaultValue={
                  addModal.type === "edit" ? currentData.category_fund : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Minimum Investment <span className="fs-16">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                defaultValue={
                  addModal.type === "edit" ? currentData.min_investment : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Return <span className="fs-16">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                required
                defaultValue={
                  addModal.type === "edit" ? currentData.return : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Upload Card Image <span className="fs-16">*</span>
              </label>
              <input type="file" className="form-control" required />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Apply Link <span className="fs-16">*</span>
              </label>
              <input
                type="url"
                className="form-control"
                required
                defaultValue={
                  addModal.type === "edit" ? currentData.apply_link : ""
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3 d-flex align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheck1"
                />
                <label className="form-check-label" for="customCheck1">
                  Featured
                </label>
              </div>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <ReactQuill
                theme="snow"
                // value={description}
                // onChange={setDescription}
                defaultValue={addModal.type === "edit" ? currentData.desp : ""}
              >
                <div className="my-editing-area" />
              </ReactQuill>
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

export default MutualFund;
