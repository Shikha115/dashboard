import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import moment from "moment";
import * as XLSX from "xlsx";
import axios from "axios";
import { apis } from "../utils/URL";

function Lead() {
  const { lead, setLead, getAlLeads, bank, category } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ bank: "", leadType: "" });
  const [leads, setleads] = useState(lead);
  const fileInputRef = useRef(null);
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
      selector: (row) => {
        // console.log(row);
        return row?.offer_info?.title;
      },
    },
    {
      name: "Date",
      selector: (row) => {
        return row?.created
          ? moment(row?.created).format("YYYY-MM-DD") +
              "\n" +
              moment(row?.created).format(" HH:mm:ss")
          : row?.created;
      },
    },

    {
      name: "Name	",
      selector: (row) => row.name,
    },
    {
      name: "Mobile	",
      selector: (row) => row?.phone,
    },
    {
      name: "Bank Name",
      selector: (row) => row?.bank_info?.bank_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Income	",
      selector: (row) => row?.user_info?.income,
    },
    {
      name: "Pan	",
      selector: (row) => row?.user_info?.pan_no,
    },

    {
      name: "Lead Type	",
      selector: (row) => row.category_info?.name,
    },
  ];

  const onFilter = () => {
    const arr = lead.filter((e) => {
      const itemDate = moment(e?.created).valueOf();
      return dateRange.from <= itemDate && dateRange.to >= itemDate;
    });
    let arr2;
    if (filter?.bank) {
      arr2 = arr?.filter((e) => e?.bank_id === filter?.bank);
    }
    if (filter?.bank) {
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
    const value = val?.toLowerCase()?.trim();
    const arr = lead.filter((e) => {
      return (
        e?.offer_info?.title?.toLowerCase()?.trim()?.includes(value) ||
        e?.bank_info?.bank_name?.toLowerCase()?.trim()?.includes(value) ||
        e?.category_info?.name?.toLowerCase()?.trim()?.includes(value)
      );
    });
    setleads(arr);
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
          obj[header.toLowerCase()] =
            typeof row[index] === "number" ? String(row[index]) : row[index];

          if (header.toLowerCase() === "affiliate_id") {
            obj["refferal_id"] = obj?.affiliate_id?.split("_")[0];
            obj["click_id"] = obj?.affiliate_id?.split("_")[1];
            delete obj.affiliate_id;
          }
        });
        return obj;
      });

      let res = await axios.post(apis.settleLeads, { data: arrayData });
      console.log(res);
    };

    reader.readAsArrayBuffer(file);
  };

  const Import = ({ onImport }) => (
    <>
      <div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Leads
        </button>
      </div>
    </>
  );

  const actionsMemo = React.useMemo(() => <Import />, []);

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
            {/* <div className="page-title-right">
              <Link className="btn btn-primary" to="/offer/loan/add">
               Lead
              </Link>
            </div> */}
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
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Bank Name</label>
                  <select
                    onChange={(e) =>
                      setFilter({ ...filter, bank: e.target.value })
                    }
                    className="form-select"
                  >
                    <option defaultValue={""} selected={true} disabled>
                      Select
                    </option>
                    {bank?.map((e) => (
                      <option key={e?._id} value={e?._id}>
                        {e?.bank_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Lead Type</label>
                  <select
                    onChange={(e) =>
                      setFilter({ ...filter, leadType: e.target.value })
                    }
                    className="form-select"
                  >
                    <option defaultValue={""} selected={true} disabled>
                      Select
                    </option>
                    {category?.map((item) => (
                      <option value={item?._id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
                <div className="container d-flex justify-content-center align-items-center">
                  <div className="col-12 col-md-2 mb-3 ">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        onFilter();
                      }}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-12 col-md-2 mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        reset();
                      }}
                    >
                      Reset
                    </button>
                  </div>{" "}
                </div>
                <div className="col-12">
                  <label className="form-label">Search by name</label>
                  <input
                    className="form-control"
                    type="search"
                    name="date"
                    onChange={(e) => {
                      searchFilter(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <DataTable
            // title="Movie List"
            columns={columns}
            data={leads}
            progressPending={isLoading}
            pagination
            actions={actionsMemo}
          />
        </div>
      </div>
    </div>
  );
}

export default Lead;
