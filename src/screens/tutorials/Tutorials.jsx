import React from "react";
import DataTable from "react-data-table-component";

import Modal from "react-bootstrap/Modal";
import { CiSearch, CiWarning } from "react-icons/ci";

import useTutorialHook from "./useTutorialHook";
import { Form } from "react-bootstrap";

function Tutorials() {
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
  } = useTutorialHook();

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          {!access?.banner?.read ? (
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
                      if (!access?.banner?.edit) {
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
                <h4 className="page-title">Manage Tutorial</h4>
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
            {addModal.type === "add" ? "Add" : "Edit"} Tutorial
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#" className="row">
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Title</label>
              <span className="fs-17 text-danger"> *</span>
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
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Video ID</label>
              <span className="fs-17 text-danger"> *</span>
              <input
                className="form-control"
                type="text"
                required=""
                defaultValue={currentData?.video ?? ""}
                onChange={(e) => {
                  setUpdatedData({ ...UpdatedData, video: e.target.value });
                }}
              />
            </div>{" "}
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Type</label>
              <span className="fs-17 text-danger"> *</span>
              <Form.Select
                aria-label="Video select"
                onChange={(e) => {
                  setUpdatedData({ ...UpdatedData, type: e.target.value });
                }}
                defaultValue={currentData?.type}
              >
                <option>Select type of video</option>
                <option value="video">Video</option>
                <option value="live">Live</option>
              </Form.Select>
            </div>{" "}
            <div className="col-12 col-md-6">
              <label className="form-label">Status</label>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={currentData?.status}
                  onChange={(e) => {
                    let val = e.target.checked;
                    setUpdatedData({ ...UpdatedData, status: val });
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

export default Tutorials;
