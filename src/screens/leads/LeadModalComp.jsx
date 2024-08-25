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
  const fileInputRef = useRef(null);
  const { allOffer, getAllOffer } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

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
        setLeadModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload lead to settle them</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(e) => {
                setSelectedOffer(e.target.value);
              }}
            >
              <option disabled value={""} selected={true}>
                Select Category
              </option>
              {allOffer?.map((e, i) => (
                <option index={i} key={e?._id} value={e?._id}>
                  {e?.mobile_data?.title} - {e?.mobile_data?.earning}
                </option>
              ))}
            </select>
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
