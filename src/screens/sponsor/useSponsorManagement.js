import React, { useEffect, useState } from "react";
import useToastStore from "../../store/toastStore";
import useDataStore from "../../store/dataStore";
import axios from "axios";
import { apis } from "../../utils/URL";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function useSponsorManagement() {
  const { setToastData } = useToastStore();
  const { isLoading, getAllSponsors, sponsor } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();
  const [UpdatedData, setUpdatedData] = useState({});
  const [banners, setBanner] = useState(sponsor);

  const {
    profile: { access },
  } = useAuthStore();

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
      .post(apis.deleteSponsor, { id: currentData?._id })
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
            disabled={!access?.sponsored_ad?.edit}
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
            disabled={!access?.sponsored_ad?.edit}
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
              if (!access?.sponsored_ad?.edit) {
                setToastData({
                  message: "You don't have edit access",
                  color: "purple",
                });
                return;
              }
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
              if (!access?.sponsored_ad?.delete) {
                setToastData({
                  message: "You don't have delete access",
                  color: "red",
                });
                return;
              }
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

  return {
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
    updateRank,
    updateStatus,
    handleSubmit,
    DeleteBank,
    search,
    columns,
    access,
  };
}

export default useSponsorManagement;
