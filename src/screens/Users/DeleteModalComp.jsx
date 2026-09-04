import axios from "axios";
import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
function DeleteModalComp(props) {
  const { setToastData } = useToastStore();

  const deleteUser = async () => {
    if (props?.currentData?._id) {
      axios
        .post(apis.deleteUser, { id: props.currentData._id })
        .then((res) => {
          // console.log(res.data);

          setToastData({ message: "User Deleted", color: "green" });
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

export default DeleteModalComp;
