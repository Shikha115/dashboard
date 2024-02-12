import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { MUTUAL_FUND_DATA } from "../../store/staticData";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function MutualFund() {
  const [isLoading, setIsLoading] = useState(true);
  const { mutualFund, setMutualFund } = useDataStore();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "60px",
    },
    {
      name: "	Title	",
      selector: (row) => row.title,
    },
    {
      name: "	Bank Name	",
      selector: (row) => row.bank,
    },
    {
      name: "	Fund Category	",
      selector: (row) => row.category,
    },
    {
      name: "	Return	",
      selector: (row) => row.return,
    },
    {
      name: "	Rank	",
      selector: (row) => row.rank,
    },
    {
      name: "	Minimum Investment",
      selector: (row) => row.min_investment,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="custom-table-btn">
          <Link className="btn btn-purple" to="/offer/mutual-fund/add">
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
      setMutualFund(MUTUAL_FUND_DATA);
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
                  <Link className="btn btn-primary" to="/offer/mutual-fund/add">
                    Add Mutual Fund
                  </Link>
                </div>
                <h4 className="page-title">Mutual Fund</h4>
              </div>
              <DataTable
                // title="Movie List"
                columns={columns}
                data={mutualFund}
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

export default MutualFund;
