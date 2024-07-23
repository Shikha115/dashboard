import React, { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import moment from "moment";
import * as XLSX from "xlsx";
import { apis } from "../../utils/URL";
import axios from "axios";
import useToastStore from "../../store/toastStore";

const useHooksWithLeads = () => {
  const { lead, getAlLeads, getMyLeads } = useDataStore();
  const { setToastData } = useToastStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ bank: "", leadType: "" });
  const [leads, setleads] = useState([]);
  const [Pagination, setPagination] = useState({});
  const [LeadModal, setLeadModal] = useState(false);

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
    setleads(lead);
  }, [lead]);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Title",
      center: "true",
      width: "auto",
      selector: (row) => {
        // console.log(row);
        return row?.offer_info?.mobile_data?.title;
      },
    },
    {
      name: "Date",
      center: "true",
      width: "auto",
      selector: (row) => {
        return row?.created
          ? moment(row?.created)?.format("YYYY-MM-DD  HH:mm:ss")
          : row?.created;
      },
    },

    {
      name: "Name	",
      center: "true",
      width: "auto",
      selector: (row) => row?.name,
    },
    {
      name: "Mobile	",
      center: "true",
      width: "auto",
      selector: (row) => row?.phone,
    },

    {
      name: "Email",
      center: "true",
      width: "auto",
      selector: (row) => row?.email,
    },
    {
      name: "Referal ID",
      center: "true",
      width: "auto",
      selector: (row) => row?.affiliate_id,
    },
    {
      name: "Click ID",
      center: "true",
      width: "auto",
      selector: (row) => row?.affiliate_id + "_" + row?.click_id,
    },

    {
      name: "Lead Type",
      center: "true",
      width: "auto",
      selector: (row) => row?.category_info?.name,
    },
  ];

  const exportExcel = async (e) => {
    e.preventDefault();
    let data = [...leads];
    let params = getParams();

    const req = await axios.get(apis.downloadAllLeads + "?" + params);

    console.log(req);

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

  const getParams = () => {
    console.log(searchFilterData);
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

    return params;
  };

  const onFilter = () => {
    let params = getParams();
    // console.log(params);
    fetchWithParams(params);
  };

  const reset = () => {
    setleads(lead);
    setSearchFilterData({});
    setPagination({});
  };

  const searchFilter = (val) => {
    val.preventDefault();
    const value = val?.target?.value;
    setSearchFilterData((prev) => ({ ...prev, search: value }));
    let params = "search=" + value;

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

  const fetchWithParams = async (params) => {
    setIsLoading(true);

    let res = await getMyLeads(params);
    if (res?.data?.length > 0) {
      setleads(res?.data);
      setPagination(res?.pagination);
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
    if (searchFilterData.search) {
      params = params + "search=" + searchFilterData.search;
    }
    if (6?.from) {
      params = params + "&fromDate=" + searchFilterData?.from;
    }
    if (searchFilterData?.to) {
      params = params + "&toDate=" + searchFilterData?.to;
    }
    if (searchFilterData.type) {
      params = params + "&type=" + searchFilterData?.to;
    }
    if (page) {
      params = params + "&page=" + page;
    }
    fetchWithParams(params);
  };

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      getAlLeads().then((e) => {
        setleads(e.data);
        setPagination(e.pagination);
        setIsLoading(false);
      });
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
  };
};

export default useHooksWithLeads;
