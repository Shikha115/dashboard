import React, { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import moment from "moment";
import * as XLSX from "xlsx";
import { apis } from "../../utils/URL";
import axios from "axios";
import useToastStore from "../../store/toastStore";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const useHooksWithOrders = () => {
  const { allOrders, getAllOrders } = useDataStore();
  const { setToastData } = useToastStore();
  const {
    profile: { access },
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ bank: "", leadType: "" });
  const [leads, setleads] = useState([]);
  const [Pagination, setPagination] = useState({});
  const [LeadModal, setLeadModal] = useState(false);
  const [PaymentModal, setPaymentModal] = useState(false);
  const [PaymentModalData, setPaymentModalData] = useState(false);
  const [selection, setSelection] = useState([]);
  const [isSelection, setIsSelection] = useState(true);

  const [searchFilterData, setSearchFilterData] = useState({
    search: "",
    from: "",
    to: "",
    lead: {},
    category: {},
  });

  const [dateRange, setDateRange] = useState({
    from: 0,
    to: Date.now(),
  });

  useEffect(() => {
    setleads(allOrders);
  }, [allOrders]);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => {
        return (
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            {isSelection && (
              <input
                type="checkbox"
                checked={selection.includes(row?._id)}
                onChange={(e) => {
                  if (row?.settled) {
                    setToastData({
                      message: "Payment is already settled",
                      color: "red",
                    });
                    return;
                  }
                  if (!e.target.checked) {
                    const index = selection.findIndex((id) => id === row?._id);
                    if (index !== -1) {
                      console.log(index);
                      setSelection(selection.filter((_, i) => i !== index));
                    }
                  } else {
                    setSelection([...selection, row?._id]);
                  }
                }}
                style={{ marginRight: 10 }}
              />
            )}
            {Pagination?.currentPage > 1
              ? (Pagination.currentPage - 1) * 10 + index + 1
              : index + 1}
          </div>
        );
      },
      width: "90px",
    },
    {
      name: "Payment ID",
      center: "true",
      width: "auto",
      selector: (row) => row?._id,
    },

    {
      name: "Amount",
      center: "true",
      width: "auto",
      selector: (row) => row?.total,
    },
    {
      name: "Date",
      center: "true",
      width: "auto",
      selector: (row) => {
        return row?.created_at
          ? moment(row?.created_at)?.format("YYYY-MM-DD  HH:mm:ss")
          : row?.created_at;
      },
    },

    {
      name: "Status",
      center: "true",
      width: "100px",
      selector: (row) => {
        return (
          <Link
            className="btn btn-soft-success btn-sm"
            style={{ textWrap: "wrap" }}
            onClick={() => {
              if (!access?.payment?.edit) {
                setToastData({
                  message: "You don't have edit access",
                  color: "purple",
                });
                return;
              }
              if (row?.settled) {
                setToastData({
                  message: "Payment is already settled",
                  color: "red",
                });
                return;
              }
              setPaymentModal(true);
              setPaymentModalData(row);
              setSelection([row?._id]);
            }}
          >
            {row?.settled && row?.requested
              ? "Redeem Request Setted"
              : row?.requested
              ? "Redeem Request"
              : row?.settled
              ? "Settled"
              : "Pending"}
          </Link>
        );
      },
    },
    // {
    //   name: "Referral ID",
    //   center: "true",
    //   width: "auto",
    //   selector: (row) => {
    //     return (
    //       <Link
    //         className="btn btn-soft-success btn-sm"
    //         style={{ textWrap: "nowrap" }}
    //         onClick={() => {
    //           window?.open(row?.pdf);
    //         }}
    //       >
    //         Order Pdf
    //       </Link>
    //     );
    //   },
    // },

    {
      name: "User Name",
      center: "true",
      width: "auto",
      selector: (row) => row?.user_info?.name,
    },
    {
      name: "User Phone",
      center: "true",
      width: "auto",
      selector: (row) => row?.user_info?.phone,
    },
  ];

  const exportExcel = async (e) => {
    e.preventDefault();
    let data = [...leads];
    let params = getParams();

    const req = await axios.get(apis.downloadAllOrders + "?" + params);

    console.log(req);

    return;
    data = await req?.data?.data?.map((item) => {
      let {
        category_info,
        offer_info,
        user_info,
        _id,
        offer_id,
        category_id,
        user_id,
        status,
        __v,
        created,
        updated,
        isComplete,
        apply_link,
        earning,
        ...rest
      } = item;
      rest.click_id = item?.affiliate_id + "_" + item?.click_id;

      created = moment(created).format("YYYY-MM-DD HH:mm:ss");
      updated = moment(updated).format("YYYY-MM-DD HH:mm:ss");

      return {
        category: category_info?.name,
        offer: offer_info?.mobile_data?.title,
        status: isComplete,
        earning: offer_info?.mobile_data?.earning,
        created,
        updated,
        apply_link: offer_info?.mobile_data?.apply_link,
        ...rest,
        offer_id,
        category_id,
        user_id,
      };
    });

    // Get all keys from the data
    const keys = Object.keys(
      data.reduce((acc, obj) => Object.assign(acc, obj), {})
    );

    // Convert array of objects to array of arrays
    const dataArray = data.map((obj) =>
      keys.map((key) => (obj[key] !== undefined ? obj[key] : ""))
    );

    // Add headers as the first row
    dataArray.unshift(keys);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Convert data array to worksheet
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Export the workbook to Excel file
    XLSX.writeFile(wb, "export.xlsx");
  };

  const selectAll = () => {
    const ids = leads.filter((item) => !item?.settled).map((item) => item._id);
    setSelection(ids);
  };

  const getParams = () => {
    let params = "";
    if (searchFilterData?.from) {
      if (!searchFilterData?.to) {
        setToastData({
          message: "From date cannot? be empty",
          color: "#FFA500",
        });
        return;
      }
      params =
        params + !searchFilterData?.search
          ? "search=" +
            searchFilterData?.search +
            "&fromDate=" +
            searchFilterData?.from
          : "fromDate=" + searchFilterData?.from;
    }

    if (searchFilterData?.to) {
      if (!searchFilterData?.from) {
        setToastData({
          message: "To date cannot? be empty",
          color: "#FFA500",
        });
        return;
      }
      params = params + "&toDate=" + searchFilterData?.to;
    }
    if (searchFilterData.type) {
      params =
        params + searchFilterData?.from
          ? "&type=" + searchFilterData?.type
          : "type=" + searchFilterData?.type;
    }
    if (params[0] === "&") {
      params.replace("&");
    }

    return params;
  };

  const onFilter = () => {
    let params = getParams();
    fetchWithParams(params);
  };

  const reset = () => {
    fetchWithParams();
    setSearchFilterData({});
    setPagination({});
  };

  const onRefresh = () => {
    let params = "";
    if (searchFilterData?.search) {
      params = params + "search=" + searchFilterData?.search ?? "";
    }
    if (searchFilterData?.from) {
      params = params + "&fromDate=" + searchFilterData?.from;
    }
    if (searchFilterData?.to) {
      params = params + "&toDate=" + searchFilterData?.to;
    }
    if (searchFilterData.type) {
      params = params + "&type=" + searchFilterData?.type;
    }

    fetchWithParams(params);
  };

  const searchFilter = (val, filter = false) => {
    val.preventDefault();
    const value = val?.target?.value;
    setSearchFilterData((prev) => ({ ...prev, search: value }));
    let params = "";
    params = "search=";

    if (!filter) {
      params = params + value;
    }

    if (searchFilterData?.from) {
      params = params + "&fromDate=" + searchFilterData?.from;
    }
    if (searchFilterData?.to) {
      params = params + "&toDate=" + searchFilterData?.to;
    }
    if (searchFilterData.type) {
      params = params + "&type=" + searchFilterData?.type;
    }
    console.log(params);

    fetchWithParams(params);
  };

  const typeFilter = (val) => {
    val.preventDefault();
    const value = val?.target?.value;
    let params = "";
    if (value) {
      params = params + "type=" + value;
    }
    if (searchFilterData?.search) {
      params = params + "&search=" + searchFilterData.search;
    }
    if (searchFilterData?.from) {
      params = params + "&fromDate=" + searchFilterData?.from;
    }
    if (searchFilterData?.to) {
      params = params + "&toDate=" + searchFilterData?.to;
    }

    console.log(params);
    fetchWithParams(params);
  };

  const fetchWithParams = async (params) => {
    setIsLoading(true);

    let res = await axios.get(apis.getAllPayment + "?" + params || "");
    if (res?.data?.data?.length > 0) {
      setleads(res?.data?.data);
      setPagination(res?.data?.pagination);
      setIsLoading(false);
    } else {
      setleads([]);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const objectData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
      });

      const headers = objectData[0];
      const arrayData = objectData.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header?.toLowerCase()] =
            typeof row[index] === "number" ? String(row[index]) : row[index];

          if (header?.toLowerCase() === "affiliate_id") {
            obj["refferal_id"] = obj?.affiliate_id?.split("_")[0];
            obj["click_id"] = obj?.affiliate_id?.split("_")[1];
            delete obj.affiliate_id;
          }
        });
        return obj;
      });
      // console.log(headers, arrayData);

      return;
      let res = await axios.post(apis.settleLeads, { data: arrayData });
      console.log(res);
    };

    reader.readAsArrayBuffer(file);
  };

  const onNextPageClick = (page) => {
    // console.log("Next page clicked, page:", page);

    let params = "";
    if (searchFilterData?.search) {
      params = params + "search=" + searchFilterData.search;
    }
    if (searchFilterData?.from) {
      params = params + "&fromDate=" + searchFilterData?.from;
    }
    if (searchFilterData?.to) {
      params = params + "&toDate=" + searchFilterData?.to;
    }
    if (searchFilterData.type) {
      params = params + "&type=" + searchFilterData?.type;
    }
    if (page) {
      params = params + "&page=" + page;
    }
    fetchWithParams(params);
  };

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      fetchWithParams();
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    dateRange,
    setDateRange,
    isLoading,
    setIsLoading,
    filter,
    setFilter,
    leads,
    setleads,
    Pagination,
    setPagination,
    LeadModal,
    setLeadModal,
    columns,
    exportExcel,
    onFilter,
    reset,
    searchFilter,
    handleFileUpload,
    onNextPageClick,
    searchFilterData,
    setSearchFilterData,
    PaymentModal,
    setPaymentModal,
    PaymentModalData,
    setPaymentModalData,
    isSelection,
    setIsSelection,
    selection,
    setSelection,
    typeFilter,
    selectAll,
    onRefresh,
    access,
  };
};

export default useHooksWithOrders;
