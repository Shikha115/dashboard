import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { apis } from "../utils/URL";

function OrderComp({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [Orders, setOrders] = useState(false);
  const [Pagination, setPagination] = useState(false);

  const getOrders = async (id, params) => {
    let urlParams = `?limit=${params?.limit ?? 10}&sortField=${
      params?.sortField ?? "date"
    }&sortOrder=${params?.sortOrder ?? "desc"}&page=${
      params?.page ?? 1
    }&search=${params?.search ?? ""}`;
    setIsLoading(true);
    // console.log(apis.getOrdersByUid + urlParams, { user_id: id });

    axios
      .post(apis.getAllPayment + urlParams, { user_id: id })
      .then((res) => {
        setOrders(res?.data?.data);
        setPagination(res.data.pagination);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders(id);
  }, [id]);

  // console.log(Orders, Pagination);
  const columns = [
    {
      name: "#",
      cell: (row, index) => (
        <div>
          {Pagination?.currentPage > 1
            ? Pagination?.currentPage * 10 + index + 1
            : index + 1}
        </div>
      ),
      width: "50px",
      center: true,
    },
    {
      name: "Order No.",
      selector: (row) => row?.invoice_no,
      center: true,
      width: "auto",
    },

    {
      name: "Total",
      selector: (row) => row?.total,
      center: true,
      width: "120px",
    },
    {
      name: "Orders",
      selector: (row) => row?.orders?.length,
      center: true,
      width: "120px",
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={Orders?.length > 0 ? Orders : []}
        progressPending={isLoading}
        pagination
        // onChangePage={(e) => {
        //   setPage(e - 1);
        // }}
      />
    </div>
  );
}

export default OrderComp;
