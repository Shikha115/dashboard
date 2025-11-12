import React, { useLayoutEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import axios from "axios";
import { apis } from "../../utils/URL";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SmallVideoFrame from "../../components/SmallVideoFrame";
import useAuthStore from "../../store/authStore";
import useToastStore from "../../store/toastStore";
import moment from "moment";
let tutTimer;
let searchTimer;

const useContactHook = () => {
  const { tutorials, setTutorial } = useDataStore();
  const [isLoading, setisLoading] = useState(true);
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();
  const {
    profile: { access },
  } = useAuthStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState();
  const [UpdatedData, setUpdatedData] = useState({});

  const [filter, setFilter] = useState({
    search: "",
    currentPage: 1,
    nextPage: 2,
    limit: 10,
    totalDocuments: 10,
    sortField: "",
    sortOrder: "desc",
  });

  useLayoutEffect(() => {
    fetchWithParams();
    let tutTimer = setTimeout(() => {
      setisLoading(false);
    }, 500);
    return clearTimeout(tutTimer);
  }, []);

  const search = (val) => {
    let value = val?.toLowerCase();
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      fetchWithParams(filter.page, value);
    }, 500);
  };

  const fetchWithParams = (page, search) => {
    setisLoading(true);

    const searchParam = search ?? filter?.search ?? "";
    const limitParam = filter?.limit ?? 10;
    const typeParam = filter?.type ?? "";
    const currentPage = page ?? filter?.currentPage ?? 1;

    const params = new URLSearchParams({
      search: searchParam,
      limit: limitParam,
      type: typeParam,
      page: currentPage,
    }).toString();

    axios
      .get(`${apis?.getAllContacts}?${params}`)
      .then((res) => {
        setFilter({ ...filter, ...res?.data?.pagination });
        setTutorial(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const onNextPageClick = (page) => {
    fetchWithParams(page);
  };

  const getAllObjections = async () => {
    clearTimeout(tutTimer);
    const res = await axios.get(apis.getAllContacts);
    tutTimer = setTimeout(() => {
      setisLoading(false);
    }, 500);
    setTutorial(res?.data?.data);
    setFilter({ ...filter, ...res?.data?.pagination });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateData();
  };

  const DeleteBank = async () => {
    axios
      .delete(apis.deleteContact + "/" + currentData?._id, {
        id: currentData?._id,
      })
      .then(async (e) => {
        await getAllObjections();
        setCurrentData({});
        setToastData({
          color: "#47ad77",
          message: `Bank Deleted Successfully`,
        });
        setDeleteModal(false);
      })
      .catch((err) => {
        // console.log(err);
        setToastData({
          color: "#d03f3f",
          message: `Failed to delete bank`,
        });
      });
  };

  const UpdateData = async () => {
    let data = {
      id: currentData._id,
      ...UpdatedData,
    };

    axios
      .put(apis.updateObjection + "/" + data?.id, data)
      .then(async (e) => {
        setCurrentData({});
        setUpdatedData({});
        await getAllObjections();
        setToastData({
          color: "#49e45b",
          message: `Tutorial Updated Successfully`,
        });
        setAddModal({ ...addModal, state: false });
      })
      .catch((err) => {
        // console.log(err);
        setToastData({
          color: "red",
          message: `Failed to update Tutorial`,
        });
      });
  };

  const columns = [
    {
      name: "S.no",
      selector: (row, i) => (
        <div>
          {filter?.currentPage > 1
            ? (filter?.currentPage - 1) * 10 + i + 1
            : i + 1}
        </div>
      ),
      width: "60px",
    },
    {
      name: "Date",
      center: true,
      width: "auto",
      selector: (row) =>
        moment(row?.created_at).format("h:mm:ss A, D, MMM YYYY"),
    },
    {
      name: "Name",
      center: true,
      width: "auto",
      selector: (row) => row?.name,
    },

    {
      name: "Phone",
      center: true,
      width: "auto",
      selector: (row) => row?.phone,
    },
    {
      name: "Subject",
      center: true,
      width: "auto",
      selector: (row) => row?.subject,
    },

    {
      name: "Message",
      center: true,
      width: "auto",
      // style: { width: 1000 },
      selector: (row) => row?.message,
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
              if (!access?.lead?.edit) {
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
              if (!access?.lead?.delete) {
                setToastData({
                  message: "You don't have edit access",
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
  };
};

export default useContactHook;
