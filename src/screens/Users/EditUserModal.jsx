import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { images } from "../../components/Images";
import axios from "axios";
import _ from "lodash";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";
import { uploadFileToServer } from "../../components/ImageUpload";

const EditUserModal = ({
  currentData,
  theme,
  editModal,
  setEditModal,
  denyAccess,
  handleSubmit,
}) => {
  const [myData, setMyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setToastData } = useToastStore();

  useEffect(() => {
    setMyData(_.cloneDeep(currentData));
  }, [currentData]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setMyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleInputChangeImage = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload file to server and get the file URL
        const fileUrl = await uploadFileToServer(file);
        if (!fileUrl) {
          setToastData({ message: "Failed to upload Image", color: "red" });
        }
        // Set the file URL in the state
        setMyData({
          ...myData,
          [key]: fileUrl,
        });
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const handleBankDetailsChangeImage = async (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload file to server and get the file URL
        const fileUrl = await uploadFileToServer(file);

        if (!fileUrl) {
          setToastData({ message: "Failed to upload Image", color: "red" });
        }
        const updatedBankDetails = [...myData.bank_details];
        updatedBankDetails[index] = {
          ...updatedBankDetails[index],
          [field]: fileUrl,
        };

        setMyData((prevData) => ({
          ...prevData,
          bank_details: updatedBankDetails,
        }));
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const handleBankDetailsChange = (e, index, field) => {
    const { value } = e.target;
    const updatedBankDetails = [...myData.bank_details];
    updatedBankDetails[index] = {
      ...updatedBankDetails[index],
      [field]: value,
    };

    setMyData((prevData) => ({
      ...prevData,
      bank_details: updatedBankDetails,
    }));
  };

  const isDataChanged = () => {
    return !_.isEqual(myData, currentData);
  };

  const submitDataToAPI = async (data) => {
    // return;
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(apis.updateProfileWeb, {
        ...data,
        id: currentData?._id,
      });

      if (response.status === 200) {
        handleSubmit();
        setEditModal(false);
        setToastData({ message: "User Updated Successfully", color: "green" });
      }
    } catch (err) {
      //   console.error("Failed to update user:", err);
      setToastData({
        message: "Failed to update user details. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const getChangedData = (currentData, myData) => {
      const diff = {};
      Object.keys(myData).forEach((key) => {
        if (!_.isEqual(myData[key], currentData[key])) {
          diff[key] = myData[key];
        }
      });
      return diff;
    };

    const changedData = getChangedData(currentData, myData);

    if (Object.keys(changedData).length > 0) {
      submitDataToAPI(changedData);
    }
  };

  return (
    <Modal
      className={theme && theme}
      size="lg"
      scrollable
      show={editModal}
      centered
      onHide={() => setEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body key={currentData?._id}>
        <form className="row" onSubmit={handleFormSubmit}>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              disabled={denyAccess}
              value={myData?.name || ""}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Profile Image</label>
            <div className="user-bank-img">
              <input
                type="file"
                className="form-control"
                disabled={denyAccess}
                onChange={(e) => handleInputChangeImage(e, "profile_image")}
              />
              <img
                src={
                  myData?.profile_image
                    ? myData?.profile_image
                    : images.imageUpload
                }
                alt=""
                className="img-thumbnail w-10 object-cover"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              disabled={denyAccess}
              value={myData?.email || ""}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Phone no.</label>
            <input
              type="number"
              className="form-control"
              disabled={denyAccess}
              value={myData?.phone || ""}
              onChange={(e) => handleInputChange(e, "phone")}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Wallet</label>
            <input
              type="text"
              className="form-control"
              disabled={denyAccess}
              value={myData?.wallet || ""}
              onChange={(e) => handleInputChange(e, "wallet")}
            />
          </div>{" "}
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              disabled={denyAccess}
              value={myData?.otp || ""}
              onChange={(e) => handleInputChange(e, "otp")}
            />
          </div>
          {myData?.bank_details?.map((item, i) => {
            return (
              <Fragment key={item?.account_no + item?.bank_name}>
                <div className="col-12">
                  <h5 className="border-bottom pb-2">
                    Bank Information {i + 1}
                  </h5>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={denyAccess}
                    value={item?.bank_name || ""}
                    onChange={(e) => handleBankDetailsChange(e, i, "bank_name")}
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Account No.</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={denyAccess}
                    value={item?.account_no || ""}
                    onChange={(e) =>
                      handleBankDetailsChange(e, i, "account_no")
                    }
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={denyAccess}
                    value={item?.bank_ifsc || ""}
                    onChange={(e) => handleBankDetailsChange(e, i, "bank_ifsc")}
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Cancelled Check</label>
                  <div className="user-bank-img">
                    <input
                      type="file"
                      className="form-control"
                      disabled={denyAccess}
                      onChange={(e) =>
                        handleBankDetailsChangeImage(e, i, "cancelled_check")
                      }
                    />
                    <img
                      src={
                        item?.cancelled_check
                          ? item?.cancelled_check
                          : images.imageUpload
                      }
                      alt=""
                      className="img-thumbnail w-10 object-cover"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Pan Image</label>
                  <div className="user-bank-img">
                    <input
                      type="file"
                      className="form-control"
                      disabled={denyAccess}
                      onChange={(e) =>
                        handleBankDetailsChangeImage(e, i, "pan_image_new")
                      }
                    />
                    <img
                      src={
                        item?.pan_image_new
                          ? item?.pan_image_new
                          : images.imageUpload
                      }
                      alt=""
                      className="img-thumbnail w-10 object-cover"
                    />
                  </div>
                </div>
              </Fragment>
            );
          })}
          {error && <div className="text-danger">{error}</div>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => setEditModal(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
          disabled={!isDataChanged() || loading} // Disable submit if no changes or loading
        >
          {loading ? "Updating..." : "Edit"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
