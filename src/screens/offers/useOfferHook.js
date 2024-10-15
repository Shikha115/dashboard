import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";
import useToastStore from "../../store/toastStore";
import useAuthStore from "../../store/authStore";
import useDataStore from "../../store/dataStore";
import axios from "axios";
import { apis } from "../../utils/URL";
import ImageModal from "../../components/ImageModal";

let timer;
const useOfferHook = () => {
  const location = useLocation();
  const { setToastData } = useToastStore();
  const {
    theme,
    profile: { access },
  } = useAuthStore();

  const currentUrl = location.pathname;
  let category_id = currentUrl?.split("/offer/")[1];
  const { getCategory } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const { getOfferbyId } = useDataStore();

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [currentData, setCurrentData] = useState([]);
  const [addonData, setAddonData] = useState();
  const [password, setpassword] = useState();
  const [Data, setData] = useState();

  const [currentCategory, setCurrentCategory] = useState();
  const [Offers, setOffers] = useState();
  const [Pagination, setPagination] = useState();
  const [Search, setSearch] = useState();

  useEffect(() => {
    getOffersViaParams();

    (async function fetchData() {
      let res = await getCategory(category_id);
      setCurrentCategory(res);
    })();
  }, [category_id, getCategory]);

  const getOffersViaParams = (params = "") => {
    setIsLoading(true);

    let obj;
    if (category_id !== "6617742141652c98b6277bb8") {
      obj = {
        offer_id: category_id,
      };
    }
    axios
      .post(apis.getOfferWeb + params, obj)
      .then((res) => {
        setOffers(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchFilter = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(e?.target?.value?.toLowerCase());
      getOffersViaParams(`?search=${e?.target?.value?.toLowerCase()}`); // let filteredArr = [];
    }, 400);
  };

  const onNextPageClick = (page) => {
    let params = "";

    if (page) {
      params = params + "?page=" + page;
    }
    if (Search) {
      params = params + "&search=" + Search;
    }

    getOffersViaParams(params);
  };

  const updateStatus = async (id, status) => {
    axios
      .post(apis.updateOfferStatus, { id, status })
      .then(async (e) => {
        setToastData({ message: e.data.message });
        getOffersViaParams();
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };

  const updateIfFeatured = async (id, featured) => {
    axios
      .post(apis.updateIfFeatured, { id, featured })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };

  const updateConverting = async (id, converting) => {
    axios
      .post(apis.updateIfConverting, { id, converting })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to update status", color: "red" });
      });
  };

  const updateRank = async (id, rank) => {
    axios
      .post(apis.updateOfferRank, { id, rank: Number(rank) })
      .then((e) => {
        setToastData({ message: e.data.message });
      })
      .catch((err) => {
        setToastData({ message: "Failed to Update", color: "red" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (addModal.type === "add") {
      AddData();
    } else {
      UpdateData();
    }
  };

  const AddData = async () => {
    let obj = {};
    let isOk = false;
    [...currentData].forEach((e) => {
      obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
      if (e?.key !== "status") {
        if (e?.required && !e?.value) {
          isOk = true;
        } else {
          isOk = false;
        }
      } else {
        isOk = false;
      }
    });

    let data = {
      ...addonData,
      offer_data: currentData,
      type_id: currentCategory?._id,
      mobile_data: { ...obj, card_type: currentCategory?._id },
    };

    if (isOk) {
      setToastData({
        message: "Values marked by * are important",
        color: "red",
      });

      setIsLoading(false);
      return;
    }

    axios
      .post(apis.createOffer, data)
      .then((res) => {
        getOfferbyId(category_id);
        setToastData({ message: res.data.message });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
        setCurrentData(null);
      })
      .catch((error) => {
        console.log(error.response.data);
        setToastData({ message: "Failed to create offer", color: "red" });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
      });
  };

  const UpdateData = async () => {
    let obj = {};

    [...currentData].forEach((e) => {
      obj[e?.key?.toLowerCase()?.split(" ")?.join("_")] = e?.value;
    });

    let data = {
      ...addonData,
      offer_data: currentData,
      id: Data?._id,
      mobile_data: obj,
    };

    axios
      .post(apis.updateOffer, data)
      .then((res) => {
        getOfferbyId(category_id);
        setAddModal({ ...addModal, state: false });
        setToastData({ message: res.data.message });
        setIsLoading(false);
      })
      .catch((error) => {
        setToastData({ message: "Failed to edit offer", color: "red" });
        setAddModal({ ...addModal, state: false });
        setIsLoading(false);
      });
  };

  const deleteData = async () => {
    if (password !== "hp38g3119") {
      setToastData({ message: "Incorrect password", color: "red" });
      return;
    }
    setpassword("");
    axios
      .post(apis.deleteOffer, { id: Data?._id })
      .then((res) => {
        getOfferbyId(category_id);
        setToastData({ message: res.data.message });
      })
      .catch((error) => {
        setToastData({ message: "Failed to delete offer", color: "red" });
      });
    setDeleteModal(false);
  };

  const columns = [
    {
      name: "#",
      selector: (row, i) => {
        return (
          <div>
            {Pagination?.currentPage > 1
              ? (Pagination?.currentPage - 1) * 10 + i + 1
              : i + 1}
          </div>
        );
      },
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row?.mobile_data?.title,
      center: true,
      width: "auto",
    },
    {
      name: "Image",
      center: true,
      width: "auto",
      cell: (row) => (
        <ImageModal
          alt=""
          src={row?.mobile_data?.product_image}
          className="img-fluid"
          imgStyle={{ height: "80px", objectFit: "contain", width: "80px" }}
        />
      ),
    },
    {
      name: "Card Type",
      selector: (row) => row?.category_info?.name,
      center: true,
      width: "auto",
    },
    {
      name: "Earning",
      selector: (row) => row?.mobile_data?.earning,
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
            defaultChecked={row?.status}
            disabled={!access?.offer?.edit}
            onChange={(e) => {
              let val = e.target.checked;
              updateStatus(row?._id, val);
              row.status = val;
            }}
          />
        </div>
      ),
    },
    {
      name: "Featured",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            disabled={!access?.offer?.edit}
            className="form-check-input"
            defaultChecked={row?.featured}
            onChange={(e) => {
              let val = e.target.checked;
              updateIfFeatured(row?._id, val);
              row.featured = val;
            }}
          />
        </div>
      ),
    },
    {
      name: "Top Converting",
      center: true,
      width: "auto",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            type="checkbox"
            disabled={!access?.offer?.edit}
            className="form-check-input"
            defaultChecked={row?.converting}
            onChange={(e) => {
              let val = e.target.checked;
              updateConverting(row?._id, val);
              row.featured = val;
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
            type="number"
            className="form-control"
            disabled={!access?.offer?.edit}
            style={{ width: 70 }}
            defaultValue={row?.rank}
            onChange={(e) => {
              let val = e.target.value;
              updateRank(row?._id, val);
              row.rank = val;
              console.log(val);
            }}
          />
        </div>
      ),
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
              if (!access?.offer?.edit) {
                setToastData({
                  message: "You don't have edit access",
                  color: "purple",
                });
                return;
              }
              setData(row);
              setCurrentData(row?.offer_data);
              setAddonData({ status: row?.status, rank: row?.rank });
              //   setbankData(getBankById(bank, row?.bank_id));
              setAddModal({ type: "edit", state: true });
            }}
          >
            <MdEdit className="fs-18" />
          </button>
          <button
            className="btn btn-pink"
            onClick={() => {
              if (!access?.offer?.delete) {
                setToastData({
                  message: "You don't have delete access",
                  color: "red",
                });
                return;
              }
              setData(row);
              setDeleteModal(true);
            }}
          >
            <MdDelete className="fs-18" />
          </button>
        </div>
      ),
    },
  ];

  return {
    searchFilter,
    currentCategory,
    setCurrentData,
    setAddModal,
    isLoading,
    columns,
    Offers,
    theme,
    deleteModal,
    setDeleteModal,
    setpassword,
    deleteData,
    category_id,
    addModal,
    currentData,
    addonData,
    setAddonData,
    handleSubmit,
    Data,
    access,
    Pagination,
    onNextPageClick,
  };
};

export default useOfferHook;
