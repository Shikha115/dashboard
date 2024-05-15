import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import moment from "moment";
import * as XLSX from "xlsx";
import axios from "axios";
import { apis } from "../utils/URL";
import { Modal } from "react-bootstrap";
import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";

function Lead() {
  const { lead, getAlLeads, category } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ bank: "", leadType: "" });
  const [leads, setleads] = useState(lead);
  const [LeadModal, setLeadModal] = useState(false);

  useEffect(() => {
    setleads(lead);
  }, [lead]);

  const [dateRange, setDateRange] = React.useState({
    from: 0,
    to: Date.now(),
  });

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Title",
      center: true,
      width: "auto",
      selector: (row) => {
        // console.log(row);
        return row?.offer_info?.mobile_data?.title;
      },
    },
    {
      name: "Date",
      center: true,
      width: "auto",
      selector: (row) => {
        return row?.created
          ? moment(row?.created).format("YYYY-MM-DD  HH:mm:ss")
          : row?.created;
      },
    },

    {
      name: "Name	",
      center: true,
      width: "auto",
      selector: (row) => row.name,
    },
    {
      name: "Mobile	",
      center: true,
      width: "auto",
      selector: (row) => row?.phone,
    },

    {
      name: "Email",
      center: true,
      width: "auto",
      selector: (row) => row.email,
    },
    {
      name: "Referal ID",
      center: true,
      width: "auto",
      selector: (row) => row?.affiliate_id,
    },
    {
      name: "Click ID",
      center: true,
      width: "auto",
      selector: (row) => row?.affiliate_id + "_" + row?.click_id,
    },

    {
      name: "Lead Type",
      center: true,
      width: "auto",
      selector: (row) => row.category_info?.name,
    },
  ];

  const exportExcel = () => {
    // if (leads?.length < 1) {
    //   console.log("run");
    //   return;
    // }
    let data = [...leads];
    data = data?.map((item) => {
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

  const onFilter = () => {
    const arr = lead.filter((e) => {
      const itemDate = moment(e?.created).valueOf();
      return dateRange.from <= itemDate && dateRange.to >= itemDate;
    });
    let arr2;
    // if (filter?.bank) {
    //   arr2 = arr?.filter((e) => e?.bank_id === filter?.bank);
    // }
    if (filter?.leadType) {
      arr2 = arr?.filter((e) => e?.category_id === filter?.leadType);
    }
    if (!arr2) {
      setleads(arr);
      return;
    }
    setleads(arr2);
  };

  const reset = () => {
    setleads(lead);
  };

  const searchFilter = (val) => {
    if (!val) {
      setleads(lead);
      return;
    }
    const value = val?.toLowerCase()?.replace(" ", "");
    const arr = lead.filter((e) => {
      return (
        e?.offer_info?.title
          ?.toLowerCase()
          ?.replace(" ", "")
          ?.includes(value) ||
        e?.name?.toLowerCase()?.replace(" ", "")?.includes(value) ||
        e?.category_info?.name
          ?.toLowerCase()
          ?.replace(" ", "")
          ?.includes(value) ||
        e?.offer_info?.mobile_data?.title
          .toLowerCase()
          ?.replace(" ", "")
          ?.includes(value)
      );
    });
    setleads(arr);
  };

  const handleFileUpload = (event) => {
    // affiliate_id,offer_name,status

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

  const Import = ({ onImport }) => (
    <div className="d-flex align-items-center justify-content-end w-100 gap-2 ">
      <input
        className="form-control w-50"
        type="search"
        name="Search by name"
        placeholder="Search by name"
        onChange={(e) => {
          searchFilter(e.target.value);
        }}
      />
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          // fileInputRef.current.click();
          setLeadModal(true);
        }}
      >
        Upload Leads
      </button>{" "}
      <button
        className="btn btn-primary"
        onClick={() => {
          exportExcel();
        }}
      >
        Export Leads
      </button>
    </div>
  );

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      getAlLeads();
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="manage-bank">
          <div className="page-title-box">
            <h4 className="page-title">Lead</h4>
          </div>
          <div className="card">
            <div className="card-body">
              <form action="#" className="row">
                <div className="col-12 col-md-3 mb-3">
                  <label className="form-label">From Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    onChange={(e) => {
                      setDateRange({
                        ...dateRange,
                        from: moment(e.target.value).valueOf(),
                      });
                    }}
                  />
                </div>{" "}
                <div className="col-12 col-md-3 mb-3">
                  <label className="form-label">To Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    onChange={(e) => {
                      setDateRange({
                        ...dateRange,
                        to: moment(e.target.value).valueOf(),
                      });
                    }}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="form-label">Lead Type</label>
                  <select
                    onChange={(e) =>
                      setFilter({ ...filter, leadType: e.target.value })
                    }
                    className="form-select"
                    defaultValue="Select"
                  >
                    <option hidden disabled>
                      Select
                    </option>
                    {category?.map((item, i) => (
                      <option key={i} value={item?._id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        onFilter();
                      }}
                    >
                      Search
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        reset();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Import />
          <DataTable
            columns={columns}
            data={leads}
            progressPending={isLoading}
            pagination
            // actions={actionsMemo}
          />
          <LeadModalComp LeadModal={LeadModal} setLeadModal={setLeadModal} />
        </div>
      </div>
    </div>
  );
}

export default Lead;

function LeadModalComp({ LeadModal, setLeadModal }) {
  const [SelectedOffer, setSelectedOffer] = useState();
  const fileInputRef = useRef(null);
  const { allOffer, getAllOffer } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  useEffect(() => {
    getAllOffer();
  }, []);

  const handleFileUpload = (event) => {
    // affiliate_id,offer_name,status

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

          obj["offer_id"] = SelectedOffer;
          if (header?.toLowerCase() === "affiliate_id") {
            obj["refferal_id"] = obj?.affiliate_id?.split("_")[0];
            obj["click_id"] = obj?.affiliate_id?.split("_")[1];
            delete obj.affiliate_id;
          }
        });
        obj.status = obj.status?.toLowerCase();
        return obj;
      });
      // console.log(arrayData);
      fileInputRef.current.value = "";
      // return;
      let res = await axios.post(apis.settleLeads, { data: arrayData });
      // console.log(res);
      if (res.data.message === "Invalid offer selected") {
        setToastData({ message: res.data.message, color: "red" });
      } else if (res.data.message.trim() === "No documents updated") {
        setToastData({ message: res.data.message, color: "orange" });
      } else if (res.data.message.includes("Documents updated successfully")) {
        setToastData({ message: res.data.message, color: "green" });
      } else if (res.data.message.includes("Failed to update")) {
        setToastData({ message: res.data.message, color: "red" });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="l"
      show={LeadModal}
      centered
      scrollable
      onHide={() => {
        setSelectedOffer("");
        setLeadModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload lead to settle them</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(e) => {
                setSelectedOffer(e.target.value);
              }}
            >
              <option disabled value={""} selected={true}>
                Select Category
              </option>
              {allOffer?.map((e, i) => (
                <option index={i} value={e?._id}>
                  {e?.mobile_data?.title} - {e?.mobile_data?.earning}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            {" "}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (!SelectedOffer) {
                  return setToastData({
                    message: "Select any category",
                    color: "red",
                  });
                }
                fileInputRef.current.click();
              }}
            >
              Upload Leads and settle
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedOffer("");
            setLeadModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setLeadModal(false);
            // ref.current.click();
          }}
        >
          Done{" "}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
