import { useState, useEffect } from "react";
import useDataStore from "../../store/dataStore";
import useAuthStore from "../../store/authStore";
import { FaEye } from "react-icons/fa";
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
  const [deleteModal, setDeleteModal] = useState(false);
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
  });

  const columns = [
    {
      name: "#",
      cell: (row, index) => (
        <div>{Page > 0 ? Page * 10 + index + 1 : index + 1}</div>
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
    // {
    //   name: "Type",
    //   selector: (row) => row.type,
    //   center: true,
    //   width: "80px",
    // },
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
                Payment Processed
              </Link>
            )}

            {/* {row?.redeem_wallet ? (
              <Link
                className="btn btn-soft-warning  btn-sm "
                onClick={() => {
                  setCurrentData(row);
                  setSettleModal(true);
                }}
              >
                Pay
              </Link>
            ) : null} */}
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
            {!row?.isProfileComplete
              ? "Profile Incomplete"
              : !row?.profile_status || row?.profile_status === "pending"
              ? "New Profile "
              : "Profile " + row?.profile_status}
          </button>
        );
      },
      // cell: (row) =>
      //   row?.profile_status ? (
      //     <button
      //       className="btn btn-soft-primary btn-sm"
      //       style={{ textWrap: "nowrap" }}
      //       onClick={() => {
      //         setCurrentData(row);
      //         setApproveModal(true);
      //       }}
      //     >
      //       Profile Verified
      //     </button>
      //   ) : row?.isProfileComplete ? (
      //     <Link
      //       className="btn btn-soft-danger btn-sm"
      //       style={{ lineHeight: "17px" }}
      //       onClick={() => {
      //         setCurrentData(row);
      //         setApproveModal(true);
      //       }}
      //     >
      //       Approve Profile
      //     </Link>
      //   ) : (
      //     <button
      //       className="btn btn-soft-warning btn-sm"
      //       style={{ textWrap: "nowrap" }}
      //     >
      //       Profile Incomplete
      //     </button>
      //   ),
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
      (page ? page : filter?.currentPage);
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
        console.log(err);
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
  };
};

export default useUserManagementHook;
