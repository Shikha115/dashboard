import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import { LEAD_DATA } from "../store/staticData";
import moment from "moment";
import * as XLSX from "xlsx";
import axios from "axios";
import { apis } from "../utils/URL";

function Lead() {
  const { lead, setLead, getAlLeads } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);

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
      selector: (row) =>
        row?.created
          ? moment(row?.created).format("YYYY-MM-DD") +
            "\n" +
            moment(row?.created).format(" HH:mm:ss")
          : row?.created,
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

  // console.log(lead);
  //   =============================== EXPORT CSV ======================================================
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(lead);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming there's only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to an array of objects
      const objectData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
      });

      // Assuming the first row contains headers
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

  const Export = ({ onExport }) => (
    <button
      className="btn btn-primary"
      onClick={(e) => onExport(e.target.value)}
    >
      Export
    </button>
  );
  const Import = ({ onImport }) => (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileUpload}
      title="Import"
    />
  );

  const actionsMemo = React.useMemo(
    () => (
      <>
        <Export onExport={() => downloadCSV(LEAD_DATA)} />
        <Import />
      </>
    ),
    []
  );
  //   =====================================================================================

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
    <div className="content-page">
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
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Enter a Date Range</label>
                    <input className="form-control" type="date" name="date" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Bank Name</label>
                    <select className="form-select">
                      <option value="1">Select All</option>
                      <option value="1">SBI BANK</option>
                      <option value="1">Standard Chartered Bank</option>
                      <option value="1">AXIS BANK</option>
                      <option value="1">Aditya Birla (NBFC)</option>
                      <option value="1">HDFC Bank</option>
                      <option value="1">Yes Bank</option>
                      <option value="1">Equitas Bank</option>
                      <option value="1">IndusInd Bank</option>
                      <option value="1">DENA BANK</option>
                      <option value="1">ICICI BANK</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Lead Type</label>
                    <select className="form-select">
                      <option value="1">Select All</option>
                      <option value="1">saving account</option>
                      <option value="1">credit card</option>
                      <option value="1">home loan</option>
                      <option value="1">Instant Loan</option>
                      <option value="1">personal loan</option>
                      <option value="1">demat</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Emp Status</label>
                    <select className="form-select">
                      <option value="1">Select All</option>
                      <option value="1">salaried</option>
                      <option value="1">self-employed</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Search by name</label>
                    <input className="form-control" type="search" name="date" />
                  </div>
                </form>
              </div>
            </div>
            <DataTable
              // title="Movie List"
              columns={columns}
              data={lead}
              progressPending={isLoading}
              pagination
              actions={actionsMemo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lead;
