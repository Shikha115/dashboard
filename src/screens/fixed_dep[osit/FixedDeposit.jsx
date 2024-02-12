import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { DEMAT_DATA, FIXED_DEPOSIT_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function FixedDeposit() {
  const [isLoading, setIsLoading] = useState(true);
  const { fixedDeposit, setFixedDeposit } = useDataStore();

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
      name: "Deposit Range",
      selector: (row) => row.deposit_range,
    },
    {
      name: "Tenure Range",
      selector: (row) => row.tenure_range,
    },
    {
      name: "Rank",
      selector: (row) => row.rank,
    },
    {
      name: "Interest Rate",
      selector: (row) => row.interest,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/offer/fixed-deposit/add">
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
      setFixedDeposit(FIXED_DEPOSIT_DATA);
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
                  <Link
                    className="btn btn-primary"
                    to="/offer/fixed-deposit/add"
                  >
                    Add Fixed Deposit
                  </Link>
                </div>
                <h4 className="page-title">Manage Fixed Deposit</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={fixedDeposit}
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

export default FixedDeposit;
