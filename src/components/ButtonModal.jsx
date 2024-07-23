import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useAuthStore from "../store/authStore";

function ButtonModal(props) {
  const { theme } = useAuthStore();
  const [imgModal, setImgModal] = useState(false);

  const onShow = () => {
    setImgModal(true);
  };
  const onHide = () => {
    setImgModal(false);
  };
  // console.log(props.title, props.src, props.className);
  return (
    <div>
      <button className={props.className} onClick={onShow}>
        {props.title}
      </button>
      <img src={props?.src} alt="" className="img-thumbnail w-10" />
      <Modal
        className={theme && theme}
        size="l"
        scrollable
        show={imgModal}
        centered
        onHide={onHide}
      >
        <img
          src={props.src}
          onClick={onShow}
          className="w-600 h-600 object-cover"
        />
      </Modal>
    </div>
  );
}

export default ButtonModal;
