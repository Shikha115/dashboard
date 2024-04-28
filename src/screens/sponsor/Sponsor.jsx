import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import DeleteSponsorModal from "./DeleteSponsorModal";
import ViewSponsorModal from "./ManageSponsor";
import useSponsorManagement from "./useSponsorManagement";

function ManageSponsor() {
  const {
    isLoading,
    banners,
    deleteModal,
    addModal,
    currentData,
    UpdatedData,
    setDeleteModal,
    setAddModal,
    setCurrentData,
    setUpdatedData,
    handleSubmit,
    DeleteBank,
    search,
    columns,
  } = useSponsorManagement();

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
                    setCurrentData({});
                    setUpdatedData({});
                    setAddModal({ type: "add", state: true });
                  }}
                >
                  Add Sponsored Ads
                </button>
              </div>
              <h4 className="page-title">Manage Sponsored Ads</h4>
            </div>
            <DataTable
              columns={columns}
              data={banners}
              progressPending={isLoading}
              pagination
              paginationRowsPerPageOptions={[50, 100, 150, 200]}
              paginationPerPage={50}
              key={(e) => e?._id}
            />
          </div>
        </div>
      </div>
      <ViewSponsorModal
        addModal={addModal}
        setUpdatedData={setUpdatedData}
        setCurrentData={setCurrentData}
        setAddModal={setAddModal}
        currentData={currentData}
        UpdatedData={UpdatedData}
        handleSubmit={handleSubmit}
      />

      <DeleteSponsorModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        DeleteBank={DeleteBank}
      />
    </>
  );
}

export default ManageSponsor;
