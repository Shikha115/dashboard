import React from "react";
import DataTable from "react-data-table-component";

import FilterCard from "./FilterCard";
import useHooksWithOrders from "./useHooksWithOrders";
import OrderModalComp from "../Users/OrderModalComp";
import NoDataComponent from "../../components/NoDataComp";
import PaymentModel from "./PaymentModel";

function Order() {
  const {
    isLoading,
    filter,
    setFilter,
    leads,
    Pagination,
    LeadModal,
    setLeadModal,
    dateRange,
    setDateRange,
    columns,
    exportExcel,
    onFilter,
    reset,
    searchFilter,
    handleFileUpload,
    onNextPageClick,
    searchFilterData,
    isSelection,
    setIsSelection,
    selection,
    setSelection,
    setSearchFilterData,
    typeFilter,
    selectAll,
    PaymentModal,
    setPaymentModal,
    PaymentModalData,
    setPaymentModalData,
    onRefresh,
    access,
  } = useHooksWithOrders();

  return (
    <div className="content">
      <div className="container-fluid">
        {!access?.payment?.read ? (
          <div
            style={{ height: "40vh" }}
            className="manage-bank d-flex justify-content-center align-items-center "
          >
            <h1 className="item">No Access Provided</h1>
          </div>
        ) : (
          <div className="manage-bank">
            <div className="page-title-box">
              <h4 className="page-title">Orders</h4>
            </div>
            <FilterCard
              setPaymentModal={setPaymentModal}
              selectAll={selectAll}
              typeFilter={typeFilter}
              filter={filter}
              setFilter={setFilter}
              setLeadModal={setLeadModal}
              dateRange={dateRange}
              setDateRange={setDateRange}
              exportExcel={exportExcel}
              onFilter={onFilter}
              reset={reset}
              searchFilter={searchFilter}
              searchFilterData={searchFilterData}
              handleFileUpload={handleFileUpload}
              setSearchFilterData={setSearchFilterData}
              isSelection={isSelection}
              setIsSelection={setIsSelection}
              selection={selection}
              setSelection={setSelection}
            />
            {leads?.length > 0 ? (
              <DataTable
                noDataComponent={NoDataComponent}
                paginationPerPage={Pagination?.limit ?? 10}
                paginationDefaultPage={Pagination?.currentPage}
                columns={columns}
                data={leads}
                progressPending={isLoading}
                pagination
                paginationServer
                paginationTotalRows={Pagination?.totalDocuments}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                onChangePage={onNextPageClick}
              />
            ) : (
              <NoDataComponent />
            )}
            <OrderModalComp LeadModal={LeadModal} setLeadModal={setLeadModal} />
            <PaymentModel
              selection={selection}
              setSelection={setSelection}
              PaymentModal={PaymentModal}
              setPaymentModal={setPaymentModal}
              PaymentModalData={PaymentModalData}
              setPaymentModalData={setPaymentModalData}
              onRefresh={onRefresh}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
