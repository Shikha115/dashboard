import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import OrderComp from "../../components/OrderComp";

function OrderModalComp(props) {
  console.log(props?.currentData, "fd");
  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="xl"
      show={props.OrderModal}
      centered
      onHide={() => {
        props.setOrderModal(false);
        props.setCurrentData(null);
      }}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">My Orders</h4>
        <p className="mt-3">All orders of {props?.currentData?.name}</p>
        <OrderComp id={props?.currentData?._id} />
      </Modal.Body>
    </Modal>
  );
}

export default OrderModalComp;
