import moment from "moment";
import React from "react";
import SearchBarComp from "./SearchBarComp";
import ListSelector from "../../components/ListSelector";
import useDataStore from "../../store/dataStore";

function FilterCard(props) {
  const { allOffer } = useDataStore();
  return (
    <div className="card">
      <div className="card-body">
        <form action="#" className="row">
          <div className="col-12 col-md-3 mb-3">
            <label className="form-label">From Date</label>
            <input
              className="form-control"
              type="date"
              name="date"
              onChange={(e) => {
                props.setSearchFilterData((prev) => ({
                  ...prev,
                  from: moment(e.target.value).format("YYYY/MM/DD"),
                }));
              }}
            />
          </div>
          <div className="col-12 col-md-3 mb-3">
            <label className="form-label">To Date</label>
            <input
              className="form-control"
              type="date"
              name="date" // defaultValue={moment()?.format("YYYY/MM/DD")}
              onChange={(e) => {
                props.setSearchFilterData((prev) => ({
                  ...prev,
                  to: moment(e.target.value).format("YYYY/MM/DD"),
                }));
              }}
            />
          </div>
          <ListSelector
            title="Lead Type"
            data={allOffer}
            onChangeSelector={(e) => {
              // console.log(e.target.value);
              props?.setSearchFilterData((prev) => ({
                ...prev.filter,
                type: e.target.value,
              }));
            }}
          />

          <div className="col-12 col-12 col-md-3 mt-3">
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  props.onFilter();
                }}
              >
                Search
              </button>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  props.reset();
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <SearchBarComp
            setLeadModal={props.setLeadModal}
            exportExcel={props.exportExcel}
            searchFilter={props.searchFilter}
            handleFileUpload={props.handleFileUpload}
          />
        </form>
      </div>
    </div>
  );
}

export default FilterCard;
