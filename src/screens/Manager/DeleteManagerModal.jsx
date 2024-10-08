import axios from "axios";
import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";

function DeleteManagerModal(props) {
  const { setToastData } = useToastStore();

  const deleteUser = async () => {
    if (props?.managerDetails?._id) {
      axios
        .post(apis.deleteWebUser, { id: props.managerDetails?._id })
        .then((res) => {
          console.log(res.data);

          setToastData({ message: "User Deleted", color: "green" });
          props.getAllUsers();
          props.setDeleteModal(false);
        })
        .catch((err) => {
          console.log(err);

          setToastData({ message: "Failed to delete user", color: "red" });
        });
    } else {
      setToastData({ message: "No Data Provided", color: "red" });
    }
  };
  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="sm"
      show={props.deleteModal}
      centered
      onHide={() => props.setDeleteModal(false)}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">Are You Sure?</h4>
        <p className="mt-3">
          Warning: You are about to delete this item. This action cannot be
          undone. Are you sure you want to proceed with the deletion?
        </p>
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={deleteUser}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteManagerModal;
