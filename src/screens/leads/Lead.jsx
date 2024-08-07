import React from "react";
import DataTable from "react-data-table-component";

import useHooksWithLeads from "./useHooksWithLeads";
import LeadModalComp from "./LeadModalComp";
import FilterCard from "./FilterCard";
import Loader from "../../components/Loader";
import NoDataComponent from "../../components/NoDataComp";

function Lead() {
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
  } = useHooksWithLeads();


  return (
    <div className="content">
      <div className="container-fluid">
        <div className="manage-bank">
          <div className="page-title-box">
            <h4 className="page-title">Lead</h4>
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
          {isLoading ? <Loader /> : null}

          {leads?.length > 0 ? (
            <DataTable
              noDataComponent={NoDataComponent}
              paginationPerPage={Pagination?.limit ?? 10}
              paginationDefaultPage={Pagination?.currentPage}
              columns={columns}
              data={leads}
              // progressPending={isLoading}
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
          <LeadModalComp LeadModal={LeadModal} setLeadModal={setLeadModal} />
        </div>
      </div>
    </div>
  );
}

export default Lead;
