import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";
import { LoaderComp } from "../../components/ToastComponent";
import * as XLSX from "xlsx";

const PaymentModel = ({
  PaymentModal,
  setPaymentModal,
  PaymentModalData,
  setPaymentModalData,
  selection,
  setSelection,
  onRefresh,
}) => {
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();
  const [isLoading, setIsloading] = useState();

  const settlePaymentOffline = async () => {
    if (!selection[0]) {
      return;
    }
    // console.log(selection);

    setIsloading(true);
    axios
      .post(apis.settlePaymentOffline, { paymentIds: selection })
      .then((e) => {
        console.log(e.data);
        setToastData({
          message: "Payment Settled Succesfully",
          color: "green",
        });
        setSelection([]);
        generateExcel(e.data.results);
        onRefresh();
      })
      .catch((err) => {
        console.log(err);
        setToastData({ message: "Payment Failed try again later" });
      })
      .finally(() => {
        setTimeout(() => {
          setIsloading(false);
        }, 400);
        setPaymentModal(false);
      });
  };

  const generateExcel = (data) => {
    const formattedData = data.map((item) => ({
      "Transaction type (Within Bank (WIB)/ NEFT (NFT)/ RTGS (RTG)/IMPS (IFC)":
        "IFC",
      "Amount (₹)(Should not be more than 15 digit including decimals and paise)":
        item.details.total,
      "Debit Account no Should be exactly 12 digit": 100505001377,
      "IFSC (Always 11 character alphanumeric and 5th character always 0 (zero)) (For ICICI bank accounts keep it blank)":
        item.details.bank_ifsc,
      "Beneficiary Account No (Max length for other bank 34 character alphanumeric and for ICICI Bank 12 digit number )":
        item.details.account_no,
      "Beneficiary Name (Max length 32 Character) (No Special Character is allowed but Space is allowed)":
        item.details.bank_name,
      "Remarks for Client (should not be more than 21 characters)":
        item.message || "Payment Failed",
      "Remarks for Beneficiary (should not be more than 30 characters)": "",
      PANNumber: item.details.pan_no_new,
      InvoiceNumber: item.details.invoice_no,
      Status: item.status ? "Success" : "Failed",
      Message: item.message,
    }));

    // Create a worksheet from the formatted data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    // Generate a filename based on the current date and time
    const now = new Date();
    const filename = `payments_${now.getDate()}_${
      now.getMonth() + 1
    }_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.xlsx`;

    // Generate an Excel file and trigger a download
    XLSX.writeFile(workbook, filename);
  };
  return (
    <Modal
      className={theme ? theme : ""}
      size="l"
      show={PaymentModal}
      centered
      scrollable
      onHide={() => {
        // setSelectedOffer("");
        setPaymentModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Complete Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="col">
          <div
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              className="btn btn-primary btn-md"
              style={{ textWrap: "nowrap", marginRight: 20 }}
              onClick={settlePaymentOffline}
            >
              Offline
            </Link>{" "}
            <Link
              className="btn btn-success btn-md"
              style={{ textWrap: "nowrap" }}
              onClick={() => {}}
            >
              Online
            </Link>
          </div>
          {isLoading ? <LoaderComp /> : null}
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            // setSelectedOffer("");
            setPaymentModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setPaymentModal(false);
            // ref.current.click();
          }}
        >
          Done{" "}
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default PaymentModel;
