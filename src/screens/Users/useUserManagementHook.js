import { useState, useEffect } from "react";
import useDataStore from "../../store/dataStore";
import useAuthStore from "../../store/authStore";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaRegWindowClose,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";

let searchTimer;
const useUserManagementHook = () => {
  const { setToastData } = useToastStore();
  const {
    profile: { access },
  } = useAuthStore();
  const { users, getAllUsers, setSelectedUser, selectedUser } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(0);
  const [SelectUsers, setSelectUsers] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [bulkUserModal, setBulkUserModal] = useState(false);
  const [settleModal, setSettleModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [ApproveModal, setApproveModal] = useState(false);
  const [OrderModal, setOrderModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [PayModal, setPayModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [Users, setUsers] = useState(null);
  const [filter, setFilter] = useState({
    type: "Select",
    search: "",
    currentPage: 1,
    nextPage: 2,
    limit: 10,
    totalDocuments: 10,
    sortField: "",
    value: "",
    sortOrder: "desc",
  });

  const onPressCheckBox = (val) => {
    if (SelectUsers?.includes(val)) {
      setSelectUsers((prev) => prev?.filter((item) => item !== val));
    } else {
      setSelectUsers((prev) => [...prev, val]);
    }
  };

  const downloadCsv = (csvData) => {
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, "-"); // Format: YYYY-MM-DDTHH-MM-SS
    const userName = "User_Data"; // Replace with actual user data if available
    const fileName = `${userName}_${currentDateTime}.csv`;

    // Create a blob from the CSV string
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Use the dynamic file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadUser = () => {
    axios
      .post(apis.downloadProfile, { ids: SelectUsers })
      .then((res) => {
        downloadCsv(res.data);
        setToastData({
          message: "User Data Downloaded",
          color: "green",
        });
      })
      .catch((err) => {
        // console.log(err);
        setToastData({
          message: "User Data failed to Download",
          color: "red",
        });
      });
  };
  const downloadAllUser = () => {
    axios
      .get(apis.bulkDownloadProfile)
      .then((res) => {
        downloadCsv(res.data);
        setToastData({
          message: "All User Data Downloaded",
          color: "green",
        });
      })
      .catch((err) =>
        setToastData({
          message: "User Data failed to Download",
          color: "red",
        })
      );
  };

  const onPressAllCheckBox = () => {
    if (SelectUsers?.length) {
      // setSelectUsers([]);
    } else {
      // setSelectUsers(() => Users?.map((item) => item?._id));
    }
  };

  useEffect(() => {
    if (SelectUsers.length) {
      setBulkUserModal(true);
      return;
    }
    setBulkUserModal(false);
  }, [SelectUsers.length]);

  const columns = [
    {
      name: "#",
      cell: (row, i) => (
        <div>
          {filter?.currentPage > 1
            ? (filter?.currentPage - 1) * 10 + i + 1
            : i + 1}
        </div>
      ),
      width: "50px",
      center: true,
    },
    {
      name: <input type="checkbox" onClick={onPressAllCheckBox} />,
      cell: (row) => (
        <input
          checked={SelectUsers?.includes(row?._id)}
          type="checkbox"
          onClick={() => onPressCheckBox(row?._id)}
        />
      ),
      width: "50px",
      center: true,
    },
    {
      name: "Contact No.",
      selector: (row) => row.phone,
      center: true,
      width: "120px",
    },
    {
      name: "Referral",
      selector: (row) => row.referral_id,
      center: true,
      width: "auto",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      center: true,
      width: "auto",
    },

    {
      name: "Wallet",
      selector: (row) => row.wallet,
      center: true,
      width: "80px",
    },
    {
      name: "Payments",
      center: true,
      width: "100px",
      cell: (row) => (
        <Link
          className="btn btn-soft-danger btn-sm"
          style={{ textWrap: "nowrap" }}
          onClick={() => {
            if (!access?.user?.edit) {
              setToastData({
                message: "You don't have edit access",
                color: "purple",
              });
              return;
            }
            setCurrentData(row);
            setOrderModal(true);
          }}
        >
          Payments
        </Link>
      ),
    },
    {
      name: "Notification",
      center: true,
      width: "120px",
      cell: (row) => (
        <Link
          className="btn btn-soft-danger btn-sm"
          style={{ textWrap: "nowrap" }}
          onClick={() => {
            if (!access?.user?.edit) {
              setToastData({
                message: "You don't have edit access",
                color: "purple",
              });
              return;
            }
            setCurrentData(row);
            setNotificationModal(true);
          }}
        >
          Notification
        </Link>
      ),
    },
    {
      name: "Settlement",
      center: true,
      // width: "120px",
      cell: (row) => {
        return (
          <div className="d-flex flex-column">
            {row?.lead_settlement?.length > 0 ? (
              <Link
                className="btn btn-soft-info btn-sm"
                onClick={() => {
                  if (!access?.user?.edit) {
                    setToastData({
                      message: "You don't have edit access",
                      color: "purple",
                    });
                    return;
                  }
                  setCurrentData(row);
                  setSettleModal(true);
                }}
              >
                Confirm Payment
              </Link>
            ) : (
              <Link
                className="btn btn-soft-info btn-sm"
                onClick={() => {
                  if (!access?.user?.edit) {
                    setToastData({
                      message: "You don't have edit access",
                      color: "purple",
                    });
                    return;
                  }
                  setToastData({ message: "No pending payment" });
                }}
              >
                Payment Status
              </Link>
            )}
          </div>
        );
      },
    },
    {
      name: "Profile Status",
      center: true,
      width: "auto",
      cell: (row) => {
        return (
          <>
            <button
              className={`btn  btn-sm ${
                !row?.isProfileComplete
                  ? "btn-soft-warning"
                  : !row?.profile_status || row?.profile_status === "pending"
                  ? "btn-soft-primary"
                  : row?.profile_status === "rejected"
                  ? "btn-soft-danger"
                  : row?.profile_status === "updated"
                  ? "btn-soft-primary"
                  : row?.profile_status === "approved"
                  ? "btn-soft-success"
                  : ""
              }`}
              style={{ textWrap: "nowrap" }}
              onClick={() => {
                if (!access?.user?.edit) {
                  setToastData({
                    message: "You don't have edit access",
                    color: "purple",
                  });
                  return;
                }
                setCurrentData(row);
                setApproveModal(true);
              }}
            >
              {row?.profile_status === "rejected" ? (
                <FaRegWindowClose
                  color="red"
                  style={{ position: "absolute", left: 2, top: 10 }}
                />
              ) : null}
              {row?.profile_status === "approved" ? (
                <FaCheckCircle
                  color="green"
                  size={15}
                  style={{ position: "absolute", left: 2, top: 10 }}
                />
              ) : null}
              {!row?.isProfileComplete ? (
                <FaExclamationCircle
                  style={{ marginTop: -2, marginRight: 3 }}
                />
              ) : null}
              <div style={{ flexDirection: "row", display: "flex" }}>
                {!row?.isProfileComplete
                  ? "Profile Incomplete"
                  : !row?.profile_status || row?.profile_status === "pending"
                  ? "Profile Completed "
                  : "Profile " + row?.profile_status}
              </div>
            </button>
          </>
        );
      },
    },

    {
      name: "Action",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="custom-table-btn">
          <button
            className="btn btn-purple"
            onClick={() => {
              if (!access?.user?.edit) {
                setToastData({
                  message: "You don't have edit access",
                  color: "purple",
                });
                return;
              }
              setEditModal(true);
              setCurrentData(row);
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <Link
            className="btn btn-warning"
            // to="/users/view"
            // onClick={() => setSelectedUser(row)}
            onClick={() => {
              if (!access?.user?.read) {
                setToastData({
                  message: "You don't have read access",
                  color: "purple",
                });
                return;
              }
              setSelectedUser(row);
              setViewModal(true);
            }}
          >
            <FaEye className="fs-18" />
          </Link>
          <Link
            className="btn btn-pink"
            to="#"
            onClick={() => {
              if (!access?.user?.delete) {
                setToastData({
                  message: "You don't have delete access",
                  color: "red",
                });
                return;
              }
              setCurrentData(row);
              setDeleteModal(true);
            }}
          >
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchWithParams(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [filter?.type, filter?.search]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    fetchWithParams();
  };

  const search = (val) => {
    let value = val?.toLowerCase();
    if (value) {
      clearTimeout(searchTimer);
    }
  };

  const fetchWithParams = (page) => {
    setIsLoading(true);
    let params =
      "?search=" +
      (filter?.search || "") +
      "&limit=" +
      filter?.limit +
      "&type=" +
      (filter?.type === "Select" || !filter?.type ? "" : filter?.type) +
      "&page=" +
      (page ? page : filter?.currentPage) +
      "&sortField=" +
      filter.sortField +
      "&sortOrder=" +
      filter?.sortOrder;
    setIsLoading(true);

    axios
      .get(apis?.getAllLUsers + params)
      .then((res) => {
        // console.log(res?.data);
        setFilter({ ...filter, ...res?.data?.pagination });
        setUsers(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(true);
      });
  };

  const onFilter = () => {};

  const onNextPageClick = (page) => {
    fetchWithParams(page);
  };

  return {
    isLoading,
    columns,
    setPage,
    deleteModal,
    handleSubmit,
    search,
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
    setFilter,
    fetchWithParams,
    onNextPageClick,
    access,
    bulkUserModal,
    setBulkUserModal,
    SelectUsers,
    setSelectUsers,
    downloadUser,
    downloadAllUser,
  };
};

export default useUserManagementHook;
