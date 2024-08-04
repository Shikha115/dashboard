import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useAuthStore from "../store/authStore";

function ImageModal(props) {
  const { theme } = useAuthStore();
  const [imgModal, setImgModal] = useState(false);
  const { imgStyle, ...rest } = props;
  const onShow = () => {
    setImgModal(true);
  };
  const onHide = () => {
    setImgModal(false);
  };

  return (
    <div className="overflow-hidden">
      <img
        alt=""
        {...rest}
        onClick={onShow}
        // style={imgStyle}
        style={{ width: 200, height: 200 }}
        className="h-[20px] w-[20px] object-contain"
      />
      <Modal
        className={theme && theme}
        size="l"
        scrollable
        show={imgModal}
        centered
        onHide={onHide}
      >
        <img {...rest} onClick={onShow} className="object-contain" />
      </Modal>
    </div>
  );
}

export default ImageModal;
