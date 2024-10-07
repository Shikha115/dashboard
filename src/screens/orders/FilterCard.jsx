import moment from "moment";
import React, { useEffect, useState } from "react";
import SearchBarComp from "./SearchBarComp";
import ListSelector from "../../components/ListSelector";
import useDataStore from "../../store/dataStore";
import UserTypeSelector from "../Users/UserSelector";
import useHooksWithOrders from "./useHooksWithOrders";
import useAuthStore from "../../store/authStore";

function FilterCard(props) {
  const {
    profile: { access },
  } = useAuthStore();
  return (
    <div className="card">
      <div className="card-body">
        <form action="#" className="row">
          <div className="col-12 col-md-4 mb-3">
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
          <div className="col-12 col-md-4 mb-3">
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
          {/* <ListSelector
            title="Lead Type"
            data={allOffer}
            onChangeSelector={(e) => {
              // console.log(e.target.value);
              props?.setSearchFilterData((prev) => ({
                ...prev.filter,
                type: e.target.value,
              }));
            }}
          /> */}

          <div className="col-12 col-12 col-md-4 mt-3">
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
          <div className="col-12 col-md-4 mb-3">
            <SearchBarComp
              setLeadModal={props.setLeadModal}
              exportExcel={props.exportExcel}
              searchFilter={props.searchFilter}
              handleFileUpload={props.handleFileUpload}
            ></SearchBarComp>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <UserTypeSelector
              value={props.searchFilterData?.type}
              title={false}
              data={[
                { type: "All", id: 1 },
                { type: "Settled", id: 1 },
                { type: "Pending", id: 2 },
                { type: "Redeem Request Setted", id: 3 },
                { type: "Redeem Request", id: 4 },
              ]}
              onChangeSelector={async (e) => {
                e.preventDefault();
                await props.setSearchFilterData((prev) => ({
                  ...prev,
                  type: e?.target?.value,
                }));

                props.typeFilter(e);
              }}
            />
          </div>

          {access?.payment?.edit ? (
            <div className="col-12">
              <div className="d-flex align-items-center gap-2">
                <div className="col-12 col-md-6 flex-row d-flex">
                  <button
                    className={`btn m-1 ${
                      props?.selection.length > 0
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      props?.setPaymentModal(true);
                      console.log(props?.isSelection);
                    }}
                  >
                    Settle Selected Payments - {props?.selection?.length}
                  </button>{" "}
                  <button
                    className={`btn m-1 ${
                      props?.selection.length > 0
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      props?.setSelection([]);
                      console.log(props?.isSelection);
                    }}
                  >
                    Clear All
                  </button>{" "}
                  <button
                    className={`btn m-1 btn-primary`}
                    onClick={(e) => {
                      e.preventDefault();
                      props?.selectAll();
                      console.log(props?.isSelection);
                    }}
                  >
                    Select All
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default FilterCard;
