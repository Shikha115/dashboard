import moment from "moment";
import React from "react";
import SearchBarComp from "./SearchBarComp";
import ListSelector from "../../components/ListSelector";
import useDataStore from "../../store/dataStore";

// The filter posts these straight into a query string, so the value has to be
// both URL-safe unencoded and unambiguous to `new Date()` on the server. An ISO
// UTC timestamp is both: no "+" to be mangled into a space, and the exact
// instant the user picked rather than a date the server re-reads in its own
// timezone. An empty input clears the filter instead of producing
// "Invalid date".
const toTimestamp = (value) => (value ? moment(value).toISOString() : "");

function FilterCard(props) {
  const { allOffer } = useDataStore();
  return (
    <div className="card">
      <div className="card-body">
        <form action="#" className="row">
          <div className="col-12 col-md-3 mb-3">
            <label className="form-label">From Date &amp; Time</label>
            <input
              className="form-control"
              type="datetime-local"
              name="from"
              step="1"
              onChange={(e) => {
                props.setSearchFilterData((prev) => ({
                  ...prev,
                  from: toTimestamp(e.target.value),
                }));
              }}
            />
          </div>
          <div className="col-12 col-md-3 mb-3">
            <label className="form-label">To Date &amp; Time</label>
            <input
              className="form-control"
              type="datetime-local"
              name="to"
              step="1"
              onChange={(e) => {
                props.setSearchFilterData((prev) => ({
                  ...prev,
                  to: toTimestamp(e.target.value),
                }));
              }}
            />
          </div>
          <div className="col-12 col-md-3 mr-3">

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
            </div>

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
