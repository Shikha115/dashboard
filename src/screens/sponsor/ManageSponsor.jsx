import { Modal } from "react-bootstrap";
import ImageUpload from "../../components/ImageUpload";

const ViewSponsorModal = ({
  addModal,
  setUpdatedData,
  setCurrentData,
  setAddModal,
  currentData,
  UpdatedData,
  handleSubmit,
}) => {
  return (
    <Modal
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
          {addModal.type === "add" ? "Add" : "Edit"} Sponsored Ad
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
              Sponsor Url to redirect{" "}
              <span className="fs-17 text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              required=""
              defaultValue={currentData?.url ?? ""}
              onChange={(e) => {
                setUpdatedData({ ...UpdatedData, url: e.target.value });
              }}
            />
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
  );
};

export default ViewSponsorModal;
