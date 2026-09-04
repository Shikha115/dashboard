import axios from "axios";
import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
function DeleteManagerModal(props) {
  const { setToastData } = useToastStore();

  const deleteUser = async () => {
    if (props?.managerDetails?._id) {
      axios
        .post(apis.deleteWebUser, { id: props.managerDetails?._id })
        .then((res) => {
          // console.log(res.data);

          setToastData({ message: "User Deleted", color: "green" });
          props.getAllUsers();
          props.setDeleteModal(false);
        })
        .catch((err) => {
          // console.log(err);

          setToastData({ message: "Failed to delete user", color: "red" });
        });
    } else {
      setToastData({ message: "No Data Provided", color: "red" });
    }
  };
  return (
    <DeleteConfirmModal
      show={props.deleteModal}
      onHide={() => props.setDeleteModal(false)}
      onConfirm={deleteUser}
      confirmLabel="Continue"
    />
  );
}

export default DeleteManagerModal;
