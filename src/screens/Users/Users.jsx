import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import { CiSearch } from "react-icons/ci";
import ViewUser from "./ViewUser";
import NotificationModal from "./NotificationModal";

import useAuthStore from "../../store/authStore";
import SettleModalComp from "./SettleModalComp";
import ApproveModalComp from "./ApproveModalComp";
import DeleteModalComp from "./DeleteModalComp";
import PayModalComp from "./PayModalComp";
import OrderModalComp from "./OrderModalComp";
import useUserManagementHook from "./useUserManagementHook";
import UserTypeSelector from "./UserSelector";
import { FaX } from "react-icons/fa6";
import NoDataComponent from "../../components/NoDataComp";
import Loader from "../../components/Loader";
import ImageUpload from "../../components/ImageUpload";
import { images } from "../../components/Images";

function Users() {
  const { theme } = useAuthStore();
  const {
    isLoading,
    columns,
    handleSubmit,
    search,
    deleteModal,
    setDeleteModal,
    settleModal,
    setSettleModal,
    viewModal,
    setViewModal,
    setApproveModal,
    setOrderModal,
    notificationModal,
    setNotificationModal,
    editModal,
    setEditModal,
    setPayModal,
    currentData,
    setCurrentData,
    selectedUser,
    ApproveModal,
    OrderModal,
    PayModal,
    Users,
    getAllUsers,
    filter,
    onNextPageClick,
    setFilter,
  } = useUserManagementHook();

  const [denyAccess, setDenyAccess] = useState(false);
  const [inputData, setInputData] = useState({});
  const [selectedItem, setSelectedItem] = useState();

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="manage-bank">
            <div className="page-title-box">
              <div className="page-title-right">
                <div className="app-search">
                  <form className="column d-flex gap-2">
                    {!filter?.type || filter?.type === "Select" ? null : (
                      <Link
                        className="btn btn-soft-danger btn-sm mr-2"
                        style={{ textWrap: "nowrap", marginRight: 10 }}
                        onClick={() => {
                          setFilter({ ...filter, type: "Select" });
                        }}
                      >
                        {filter?.type} <FaX size={10} />
                      </Link>
                    )}
                    <UserTypeSelector
                      value={filter?.type}
                      title={false}
                      style={{ minWidth: "250px" }}
                      data={[
                        { type: "approved", id: 1 },
                        { type: "rejected", id: 2 },
                        { type: "pending", id: 3 },
                        { type: "updated", id: 4 },
                      ]}
                      onChangeSelector={(e) => {
                        setFilter({ ...filter, type: e?.target?.value });
                        console.log(e?.target.value);
                      }}
                    />
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search..."
                        onChange={(e) => {
                          setFilter({ ...filter, search: e?.target?.value });
                          search(e?.target?.value);
                        }}
                      />
                      <span className="search-icon">
                        <CiSearch className="text-muted" />
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <h4 className="page-title">Users</h4>
            </div>
            {isLoading ? <Loader /> : null}

            {Users?.length ? (
              <DataTable
                columns={columns}
                data={Users?.length > 0 ? Users : []}
                // noDataComponent={NoDataComponent}
                paginationPerPage={filter?.limit || 10}
                paginationDefaultPage={filter?.currentPage}
                paginationServer
                // progressPending={isLoading}
                paginationTotalRows={filter?.totalDocuments}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                pagination
                onChangePage={onNextPageClick}
              />
            ) : (
              <NoDataComponent />
            )}
          </div>
        </div>
      </div>

      <Modal
        className={theme && theme}
        size="lg"
        scrollable
        show={viewModal}
        centered
        onHide={() => setViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="justify-between"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {selectedUser?.isProfileVerified ? (
              <button
                className="btn btn-soft-primary btn-sm"
                style={{ textWrap: "nowrap" }}
                onClick={() => {
                  setCurrentData(selectedUser);
                  setApproveModal(true);
                }}
              >
                Profile Verified
              </button>
            ) : selectedUser?.isProfileComplete ? (
              <Link
                className="btn btn-soft-danger btn-sm"
                style={{ lineHeight: "17px" }}
                onClick={() => {
                  setCurrentData(selectedUser);
                  setApproveModal(true);
                }}
              >
                Approve Profile
              </Link>
            ) : (
              <button
                className="btn btn-soft-warning btn-sm"
                style={{ textWrap: "nowrap" }}
              >
                Profile Incomplete
              </button>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewUser />
        </Modal.Body>
      </Modal>
      {/* update */}
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
          <form className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                disabled={denyAccess}
                defaultValue={currentData?.name}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Profile Image</label>
              <div className="user-bank-img">
                <input
                  type="file"
                  className="form-control"
                  disabled={denyAccess}
                />
                <img
                  src={images.imageUpload}
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
                defaultValue={currentData?.email}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">Phone no.</label>
              <input
                type="number"
                className="form-control"
                disabled={denyAccess}
                defaultValue={currentData?.phone}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label className="form-label">OTP</label>
              <input
                type="text"
                className="form-control"
                disabled={denyAccess}
                defaultValue={currentData?.otp}
              />
            </div>

            {currentData?.bank_details?.map((item, i) => {
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
                      defaultValue={item?.bank_name}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Account No.</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={denyAccess}
                      defaultValue={item?.account_no}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={denyAccess}
                      defaultValue={item?.bank_ifsc}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Cancelled Check</label>
                    <div className="user-bank-img">
                      <input
                        type="file"
                        className="form-control"
                        disabled={denyAccess}
                      />
                      <img
                        src={images.imageUpload}
                        alt=""
                        className="img-thumbnail w-10 object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Passbook</label>
                    <div className="user-bank-img">
                      <input
                        type="file"
                        className="form-control"
                        disabled={denyAccess}
                      />
                      <img
                        src={images.imageUpload}
                        alt=""
                        className="img-thumbnail w-10 object-cover"
                      />
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setEditModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>
      {/* delete */}
      {deleteModal ? (
        <DeleteModalComp
          theme={theme}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      ) : null}
      {ApproveModal && (
        <ApproveModalComp
          setApproveModal={setApproveModal}
          currentData={currentData}
          ApproveModal={ApproveModal}
          getAllUsers={getAllUsers}
        />
      )}
      {OrderModal && (
        <OrderModalComp
          currentData={currentData}
          setOrderModal={setOrderModal}
          OrderModal={OrderModal}
          setCurrentData={setCurrentData}
          theme={theme}
        />
      )}
      {notificationModal && (
        <NotificationModal
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          currentData={currentData}
        />
      )}
      {settleModal ? (
        <SettleModalComp
          settleModal={settleModal}
          setSettleModal={setSettleModal}
          currentData={currentData}
          setCurrentData={setCurrentData}
        />
      ) : null}
      <PayModalComp
        theme={theme}
        PayModal={PayModal}
        setPayModal={setPayModal}
        currentData={currentData}
      />
    </>
  );
}

export default Users;
