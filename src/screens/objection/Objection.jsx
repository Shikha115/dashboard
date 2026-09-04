import React from "react";
import DataTable from "react-data-table-component";

import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";

import useObjectionHook from "./useObjectionHook";
import { Form } from "react-bootstrap";
import ImageModal from "../../components/ImageModal";
import { MdEdit, MdGamepad } from "react-icons/md";
import { Link } from "react-router-dom";
import { apis, AppInfo } from "../../utils/URL";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
function Objection() {
  const {
    isLoading,
    tutorials,
    access,
    search,
    setToastData,
    setCurrentData,
    setUpdatedData,
    setAddModal,
    columns,
    theme,
    addModal,
    currentData,
    UpdatedData,
    handleSubmit,
    deleteModal,
    setDeleteModal,
    DeleteBank,
    filter,
    onNextPageClick,
  } = useObjectionHook();

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          {!access?.lead?.read ? (
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
                      if (!access?.lead?.edit) {
                        setToastData({
                          message: "You don't have edit access",
                          color: "purple",
                        });
                        return;
                      }
                      setCurrentData({});
                      setUpdatedData({});
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add Tutorial
                  </button>
                </div>
                <h4 className="page-title">Manage Objections</h4>
              </div>
              <DataTable
                columns={columns}
                data={tutorials?.length > 0 ? tutorials : []}
                progressPending={isLoading}
                paginationRowsPerPageOptions={[50, 100, 150, 200]}
                key={(e) => e?._id}
                paginationPerPage={filter?.limit || 10}
                paginationDefaultPage={filter?.currentPage}
                paginationServer
                paginationTotalRows={filter?.totalDocuments}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                pagination
                onChangePage={onNextPageClick}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        className={theme ? theme : ""}
        size="lg"
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
            {addModal.type === "add" ? "Add" : "Edit"} Objection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#" className="row">
            {/* Name */}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">ID</label>
              <input
                disabled
                className="form-control"
                type="text"
                required
                defaultValue={currentData?._id ?? ""}
              />
            </div>{" "}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Lead ID</label>{" "}
              <Link
                to={AppInfo.webUrl + "/lead?" + currentData?.lead_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </Link>
              <input
                disabled
                className="form-control"
                type="text"
                required
                defaultValue={currentData?.lead_id ?? ""}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                disabled
                className="form-control"
                type="text"
                required
                defaultValue={currentData?.name ?? ""}
              />
            </div>
            {/* Phone */}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                type="text"
                required
                disabled
                defaultValue={currentData?.phone ?? ""}
              />
            </div>{" "}
            {/* Phone */}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="text"
                required
                disabled
                defaultValue={currentData?.email ?? ""}
              />
            </div>
            {/* Reason */}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Reason <span className="custom-table-btn"></span>
              </label>
              <input
                className="form-control"
                type="text"
                required
                disabled
                defaultValue={currentData?.reason ?? ""}
              />
            </div>
            {/* Status (Switch) */}
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Resolved</label>
              <span className="fs-17 text-stone-400">
                {" "}
                <MdEdit className="fs-14" />
              </span>
              <div className="form-check form-switch mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={currentData?.is_resolved}
                  onChange={(e) => {
                    let val = e.target.checked;
                    setUpdatedData({ ...UpdatedData, is_resolved: val });
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Status{" "}
                <span className="fs-17 text-stone-400 ">
                  <MdEdit className="fs-14" />
                </span>
              </label>
              <select
                className="form-select"
                value={UpdatedData?.status ?? currentData?.status ?? ""}
                onChange={(e) =>
                  setUpdatedData({ ...UpdatedData, status: e.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {/* Description */}
            <div className="col-12 mb-3">
              <label className="form-label">
                Description <span className="fs-17 text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                required
                disabled
                defaultValue={currentData?.description ?? ""}
              />
            </div>
            {currentData?.images?.length > 0 && (
              <div className="col-12 mb-3">
                <label className="form-label">Images</label>
                <div className="row">
                  {currentData?.images?.map((img, index) => (
                    <div className="col-6 col-md-3 mb-3" key={img}>
                      <ImageModal
                        src={img}
                        alt={`objection-img-${index}`}
                        className="img-fluid rounded border"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Rejection Reason */}
            <div className="col-12 mb-3">
              <label className="form-label">
                Rejection Reason <span className="fs-17 text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                required
                defaultValue={currentData?.rejection_reason ?? ""}
                onChange={(e) =>
                  setUpdatedData({
                    ...UpdatedData,
                    rejection_reason: e.target.value,
                  })
                }
              />
            </div>
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

      <DeleteConfirmModal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        onConfirm={DeleteBank}
        confirmLabel="Continue"
      />
    </>
  );
}

export default Objection;
