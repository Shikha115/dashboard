import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";
import { LoaderComp } from "../../components/ToastComponent";

const PaymentModel = ({
  PaymentModal,
  setPaymentModal,
  PaymentModalData,
  setPaymentModalData,
}) => {
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();
  const [isLoading, setIsloading] = useState();

  const settlePaymentOffline = async () => {
    console.log(PaymentModalData?._id);
    if (!PaymentModalData?._id) {
      return;
    }
    setIsloading(true);
    axios
      .post(apis.settlePaymentOffline, { id: PaymentModalData?._id })
      .then((e) => {
        console.log(e.data);
        
        setToastData({
          message: "Payment Settled Succesfully",
          color: "green",
        });
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
