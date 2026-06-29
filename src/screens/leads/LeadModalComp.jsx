import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

import useDataStore from "../../store/dataStore";
import useToastStore from "../../store/toastStore";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { apis } from "../../utils/URL";
import { Modal } from "react-bootstrap";

function LeadModalComp({ LeadModal, setLeadModal }) {
  const [SelectedOffer, setSelectedOffer] = useState();
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const categoryRef = useRef(null);
  const categoryInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const { allOffer, getAllOffer } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getAllOffer();
  }, []);

  const handleFileUpload = (event) => {
    // affiliate_id,offer_name,status

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const objectData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
      });

      const headers = objectData[0];
      const arrayData = objectData.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header?.toLowerCase()] =
            typeof row[index] === "number" ? String(row[index]) : row[index];

          // obj["offer_id"] = SelectedOffer;
          if (header?.toLowerCase() === "affiliate_id") {
            obj["refferal_id"] = obj?.affiliate_id?.split("_")[0].trim();
            obj["click_id"] = obj?.affiliate_id?.split("_")[1].trim();
            delete obj.affiliate_id;
          }
        });
        obj.status = obj.status?.toLowerCase().trim();
        return obj;
      });

      fileInputRef.current.value = "";
      // return;

      let apiArr = arrayData.filter((val) => val?.status);

      // return;
      let res = await axios.post(apis.settleLeads, {
        data: apiArr,
        offer_id: SelectedOffer,
      });

      if (res.data.message === "Invalid offer selected") {
        setToastData({ message: res.data.message, color: "red" });
      } else {
        setToastData({
          message: res.data.message,
          color: res.data.color ?? "red",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="l"
      show={LeadModal}
      centered
      scrollable
      onHide={() => {
        setSelectedOffer("");
        setSelectedLabel("");
        setCategorySearch("");
        setLeadModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload lead to settle them</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-12 col-md-6 mb-3" ref={categoryRef}>
            <label className="form-label">Category</label>
            <div style={{ position: "relative" }}>
              <input
                ref={categoryInputRef}
                type="text"
                className="form-control"
                placeholder={selectedLabel || "Search category..."}
                value={categorySearch}
                onFocus={() => {
                  const rect = categoryInputRef.current?.getBoundingClientRect();
                  if (rect) {
                    setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
                  }
                  setShowCategoryDropdown(true);
                }}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                  const rect = categoryInputRef.current?.getBoundingClientRect();
                  if (rect) {
                    setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
                  }
                  setShowCategoryDropdown(true);
                }}
              />
              {showCategoryDropdown && (
                <ul
                  className="list-group"
                  style={{
                    position: "fixed",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                    zIndex: 9999,
                    maxHeight: 200,
                    overflowY: "auto",
                    border: "1px solid #dee2e6",
                    borderRadius: "0 0 4px 4px",
                    backgroundColor: "var(--bs-body-bg, #fff)",
                  }}
                >
                  {allOffer
                    ?.filter((o) =>
                      `${o?.mobile_data?.title} ${o?.mobile_data?.earning}`
                        .toLowerCase()
                        .includes(categorySearch.toLowerCase())
                    )
                    .map((o) => (
                      <li
                        key={o._id}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: "pointer" }}
                        onMouseDown={() => {
                          setSelectedOffer(o._id);
                          setSelectedLabel(
                            `${o?.mobile_data?.title} - ${o?.mobile_data?.earning}`
                          );
                          setCategorySearch("");
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {o?.mobile_data?.title} - {o?.mobile_data?.earning}
                      </li>
                    ))}
                  {allOffer?.filter((o) =>
                    `${o?.mobile_data?.title} ${o?.mobile_data?.earning}`
                      .toLowerCase()
                      .includes(categorySearch.toLowerCase())
                  ).length === 0 && (
                    <li className="list-group-item text-muted">
                      No categories found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="">
            {" "}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (!SelectedOffer) {
                  return setToastData({
                    message: "Select any category",
                    color: "red",
                  });
                }
                fileInputRef.current.click();
              }}
            >
              Upload Leads and settle
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedOffer("");
            setSelectedLabel("");
            setCategorySearch("");
            setLeadModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setLeadModal(false);
            // ref.current.click();
          }}
        >
          Done{" "}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default LeadModalComp;
