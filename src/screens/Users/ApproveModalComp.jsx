import axios from "axios";
import useAuthStore from "../../store/authStore";
import useToastStore from "../../store/toastStore";
import { apis } from "../../utils/URL";
import { CiSquareCheck } from "react-icons/ci";
import { Modal } from "react-bootstrap";

const ApproveModalComp = ({
  setApproveModal,
  currentData,
  ApproveModal,
  getAllUsers,
}) => {
  const { theme } = useAuthStore();

  const { setToastData } = useToastStore();
  const approve = () => {
    axios
      .post(apis.approveProfile, { id: currentData?._id, value: "approved" })
      .then((e) => {
        // console.log(e);
        setToastData({ message: e.data?.message });
        getAllUsers();
        setApproveModal(false);
      })
      .catch((err) => {
        setToastData({ message: "Failed to update user" });
        setApproveModal(false);
      });
  };
  const reject = () => {
    axios
      .post(apis.approveProfile, { id: currentData?._id, value: "rejected" })
      .then((e) => {
        // console.log(e);
        setToastData({ message: e.data?.message });
        getAllUsers();
        setApproveModal(false);
      })
      .catch((err) => {
        setToastData({ message: "Failed to update user" });
        setApproveModal(false);
      });
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="sm"
      show={ApproveModal}
      centered
      onHide={() => setApproveModal(false)}
    >
      <Modal.Body className="text-center p-4">
        <CiSquareCheck className="fs-48 text-success" />
        <h4 className="mt-2">Approve advisor </h4>
        <h5 className="mt-2">{currentData?.name}</h5>
        <p className="mt-3"></p>
        <button type="button" className="btn btn-primary" onClick={approve}>
          Approve
        </button>{" "}
        <button type="button" className="btn btn-danger" onClick={reject}>
          Reject
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ApproveModalComp;
