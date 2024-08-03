import React from "react";
import DataTable from "react-data-table-component";

import FilterCard from "./FilterCard";
import useHooksWithOrders from "./useHooksWithOrders";
import OrderModalComp from "../Users/OrderModalComp";
import NoDataComponent from "../../components/NoDataComp";

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
    setSearchFilterData,
  } = useHooksWithOrders();

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="manage-bank">
          <div className="page-title-box">
            <h4 className="page-title">Orders</h4>
          </div>
          <FilterCard
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
        </div>
      </div>
    </div>
  );
}

export default Order;
