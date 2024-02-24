import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useDataStore from "../store/dataStore";
import { LEAD_DATA } from "../store/staticData";
import moment from "moment";

function Lead() {
  const { lead, setLead, getAlLeads } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Date	",
      selector: (row) =>
        row?.created ? moment(row?.created).format("YYYY-MM-DD") : row?.created,
    },
    {
      name: "Time	",
      selector: (row) =>
        row?.created ? moment(row?.created).format(" HH:mm:ss") : row?.created,
    },
    {
      name: "Name	",
      selector: (row) => row.first_name + row?.last_name,
    },
    {
      name: "Mobile	",
      selector: (row) => row?.phone,
    },
    {
      name: "Bank Name	",
      selector: (row) => row?.bank_info?.bank_name,
    },
    {
      name: "Email	",
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
    {
      name: "Title",
      selector: (row) => row?.offer_info?.title,
    },
  ];

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

  const Export = ({ onExport }) => (
    <button
      className="btn btn-primary"
      onClick={(e) => onExport(e.target.value)}
    >
      Export
    </button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(LEAD_DATA)} />,
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
                      <option value="1" selected>
                        Select All
                      </option>
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
