import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { MdDelete, MdEdit } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import axios from "axios";
import { apis } from "../../utils/URL";

import useToastStore from "../../store/toastStore";
import DeleteSponsorModal from "./DeleteSponsorModal";
import ViewSponsorModal from "./ManageSponsor";

function ManageSponsor() {
  const { setToastData } = useToastStore();

  const { isLoading, getAllSponsors, sponsor } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();
  const [UpdatedData, setUpdatedData] = useState({});
  const [banners, setBanner] = useState(sponsor);

  // console.log(UpdatedData);

  useEffect(() => {
    getAllSponsors();
  }, []);

  useEffect(() => {
    setBanner(sponsor);
  }, [sponsor]);

  const updateRank = async (id, rank) => {
    axios
      .post(apis.editSponsor, { id, rank: Number(rank) })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update" });
      });
  };

  const updateStatus = async (id, isActive) => {
    axios
      .post(apis.editSponsor, { id, isActive })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const DeleteBank = async () => {
    axios
      .post(apis.deletSponsor, { id: currentData?._id })
      .then(async (e) => {
        await getAllSponsors();
        setCurrentData({});
        setToastData({
          color: "#47ad77",
          message: `Sponsor Deleted Successfully`,
        });
        setDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "#d03f3f",
          message: `Failed to delete bank`,
        });
      });
  };

  const AddData = async () => {
    const { isActive = false, url = "", title = "", image = "" } = UpdatedData;

    if (!isActive || !url || !title || !image) {
      setToastData({
        color: "red",
        message: "All details are required",
      });
      return;
    }

    let data = {
      ...UpdatedData,
    };

    axios
      .post(apis.addSponsor, data)
      .then(async (e) => {
        setCurrentData({});
        setUpdatedData({});
        setToastData({
          color: "#00ff1e",
          message: `Sponsor Added Successfully`,
        });
        await getAllSponsors();

        setAddModal({ ...addModal, state: false });
        setTimeout(() => {}, 2000);
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update Sponsor`,
        });
      });
  };

  const UpdateData = async () => {
    let data = {
      id: currentData._id,
      ...UpdatedData,
    };

    axios
      .post(apis.editSponsor, data)
      .then(async (e) => {
        setCurrentData({});
        setUpdatedData({});
        await getAllSponsors();
        setToastData({
          color: "#49e45b",
          message: `Banner Updated Successfully`,
        });
        setAddModal({ ...addModal, state: false });
      })
      .catch((err) => {
        console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update Banner`,
        });
      });
  };

  const search = (val) => {
    let arr = sponsor.filter((e) => {
      return (
        e?.title.toLowerCase().includes(val.toLowerCase()) ||
        e?.isActive?.toString()?.toLowerCase()?.includes(val)
      );
    });
    if (!val) {
      setBanner(sponsor);
      return;
    }
    setBanner(arr);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, id) => id + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Image",
      center: true,
      width: "auto",
      selector: (row) => (
        <img
          alt=""
          src={row?.image}
          style={{
            width: "100px",
            aspectRatio: 1,
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Banner Name",
      selector: (row) => row.title,
      center: true,
      width: "auto",
    },
    {
      name: "Status",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={row?.isActive}
            onChange={(e) => {
              let val = e.target.checked;
              updateStatus(row?._id, val);
              row.isActive = val;
            }}
          />
        </div>
      ),
    },
    {
      name: "Rank",
      center: true,
      width: "auto",
      cell: (row) => (
        <div>
          <input
            defaultValue={row?.rank}
            type="number"
            className="form-control"
            style={{ width: 70 }}
            onChange={(e) => {
              let val = e.target.value;
              updateRank(row?._id, val);
              row.rank = val;
            }}
          />
        </div>
      ),
    },

    {
      // selector: (row) => row.year,
      name: "Action",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              setAddModal({ type: "edit", state: true });
              setCurrentData(row);
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={(e) => {
              setCurrentData(row);
              e.preventDefault();
              setDeleteModal(!deleteModal);
            }}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

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
