import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { apis } from "../utils/URL";
import useAuthStore from "../store/authStore";

function OrderComp({ id }) {
  const { theme } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [Pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    totalDocuments: 0,
  });

  const getOrders = async (id, params) => {
    let urlParams = `?limit=${params?.limit ?? Pagination.limit}&sortField=${
      params?.sortField ?? "created_at"
    }&sortOrder=${params?.sortOrder ?? "desc"}&page=${
      params?.page ?? Pagination.currentPage
    }&search=${params?.search ?? ""}`;

    setIsLoading(true);

    axios
      .post(apis.getAllPayment + urlParams, { id })
      .then((res) => {
        setOrders(res?.data?.data || []);
        setPagination({
          ...Pagination,
          currentPage: res?.data?.pagination?.currentPage || 1,
          totalPages: res?.data?.pagination?.totalPages || 1,
          totalDocuments: res?.data?.pagination?.totalDocuments || 0,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders(id, { page: Pagination.currentPage });
  }, [id, Pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination({ ...Pagination, currentPage: page });
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => (
        <div>
          {Pagination?.currentPage > 1
            ? (Pagination?.currentPage - 1) * Pagination?.limit + index + 1
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
        data={Orders}
        progressPending={isLoading}
        pagination
        paginationServer
        paginationTotalRows={Pagination.totalDocuments}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationDefaultPage={Pagination.currentPage}
      />
    </div>
  );
}

export default OrderComp;
