import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { NOTIFICATION_DATA } from "../store/staticData";

function Notification() {
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [isLoading, setIsLoading] = useState(true);
  const [currentRow, setCurrentRow] = useState({});

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          className="img-fluid"
          style={{ height: "50px", objectFit: "contain", width: "auto" }}
        />
      ),
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Token",
      selector: (row) => row.token,
    },
    {
      name: "Send",
      cell: (row) => (
        <button
          className="btn btn-info"
          onClick={() => {
            setAddModal({ type: "edit", state: true });
            setCurrentRow(row);
          }}
        >
          Send
        </button>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      // AddData();
    } else {
      // UpdateData();
    }
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
                    onClick={() => {
                      setCurrentRow({});
                      setAddModal({ type: "add", state: true });
                    }}
                  >
                    Add
                  </button>
                </div>
                <h4 className="page-title">Notification</h4>
              </div>
              <DataTable
                columns={columns}
                data={NOTIFICATION_DATA}
                progressPending={isLoading}
                pagination
              />
            </div>
          </div>
        </div>
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
            {addModal.type === "edit"
              ? "Send Notification"
              : "Create a Template"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Notification Title</label>
              <input
                type="text"
                className="form-control"
                defaultValue={addModal.type === "edit" ? currentRow?.title : ""}
              />
            </div>
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Token</label>
              <input
                type="text"
                className="form-control"
                defaultValue={addModal.type === "edit" ? currentRow.token : ""}
              />
            </div>
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                row="5"
                className="form-control"
                // default={currentRow.image}
              />
            </div>
            <div className="col-12 col-lg-6 mb-2">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                defaultValue={addModal.type === "edit" ? currentRow?.type : ""}
              >
                <option value="1">Message</option>
                <option value="2">Email</option>
              </select>
            </div>

            <div className="col-12 mb-2">
              <label className="form-label">Message</label>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  addModal.type === "edit" ? currentRow.message : ""
                }
              />
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
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Notification;
