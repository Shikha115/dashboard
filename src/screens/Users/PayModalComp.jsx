import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

function PayModalComp(props) {
  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="sm"
      show={props.PayModal}
      centered
      onHide={() => props.setPayModal(false)}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">Payment of ₹ {props.currentData?.earning}?</h4>
        <p className="mt-3">
          Warning: You are about to settle the payment for{" "}
          {props.currentData?.name}
          Are you sure you want to proceed with the Payment?
        </p>
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={() => props.setPayModal(false)}
        >
          Pay
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default PayModalComp;
