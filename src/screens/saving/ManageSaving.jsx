import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { SAVING_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function ManageSaving() {
  const [isLoading, setIsLoading] = useState(true);
  const { saving, setSaving } = useDataStore();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank,
    },
    {
      name: "Opening Charges	",
      selector: (row) => row.opening_charge,
    },
    {
      name: "Minimum Balance	",
      selector: (row) => row.min_balance,
    },
    {
      name: "Interest Rate",
      selector: (row) => row.interest,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="form-check form-switch">
          <input type="checkbox" className="form-check-input" />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/add-saving">
            <MdEdit className="fs-18" />
          </Link>
          <Link className="btn btn-pink" to="#">
            <MdDelete className="fs-18" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      setSaving(SAVING_DATA);
      setIsLoading(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="manage-bank">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link className="btn btn-primary" to="/add-saving">
                    Add Saving Account
                  </Link>
                </div>
                <h4 className="page-title">Manage Saving Account</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={saving}
                progressPending={isLoading}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSaving;
