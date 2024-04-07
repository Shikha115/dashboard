import React, { useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";

function ToastComponent() {
  const { toastData, showToast, setShowToast } = useToastStore();

  useEffect(() => {
    setShowToast(true);
    let timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [toastData]);

  return (
    <ToastContainer position="top-end" className="position-fixed">
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{ backgroundColor: toastData.color }}
      >
        <Toast.Header>
          <h2>Message!</h2>
        </Toast.Header>
        <Toast.Body>{toastData.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastComponent;
