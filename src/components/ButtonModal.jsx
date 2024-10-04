import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useAuthStore from "../store/authStore";

function ButtonModal(props) {
  const { image = true } = props;
  const { theme } = useAuthStore();
  const [imgModal, setImgModal] = useState(false);

  const onShow = () => {
    if (props.noModal) {
      return;
    }
    setImgModal(true);
  };
  const onHide = () => {
    setImgModal(false);
  };

  return (
    <div>
      <button className={props.className} onClick={onShow}>
        {props.title}
      </button>
      {image ? (
        <img
          src={props?.src}
          alt=""
          className="img-thumbnail w-10 object-cover"
          style={props?.imgStyle}
        />
      ) : null}
      <Modal
        className={theme && theme}
        size="l"
        scrollable
        show={imgModal}
        centered
        onHide={onHide}
      >
        <img
          alt=""
          src={props.src}
          onClick={onShow}
          // className="w-600 h-600 object-cover"
        />
      </Modal>
    </div>
  );
}

export default ButtonModal;
