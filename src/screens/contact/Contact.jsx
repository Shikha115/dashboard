import React from "react";
import DataTable from "react-data-table-component";

import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";

import ImageModal from "../../components/ImageModal";
import { MdEdit } from "react-icons/md";
import useContactHook from "./useContactHook";
import moment from "moment";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
function Contact() {
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
  } = useContactHook();

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
                Subject <span className="custom-table-btn"></span>
              </label>
              <input
                className="form-control"
                type="text"
                required
                disabled
                defaultValue={currentData?.subject ?? ""}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">
                Date <span className="custom-table-btn"></span>
              </label>
              <input
                className="form-control"
                type="text"
                required
                disabled
                defaultValue={
                  moment(currentData?.created_at).format(
                    "h:mm:ss A, D, MMM YYYY"
                  ) ?? ""
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

export default Contact;
