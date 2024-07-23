import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function ImageModal(props) {
  const [imgModal, setImgModal] = useState(false);
  const { imgStyle, ...rest } = props;
  const onShow = () => {
    setImgModal(true);
  };
  const onHide = () => {
    setImgModal(false);
  };

  return (
    <div>
      <img {...rest} onClick={onShow} style={imgStyle} />
      <Modal
        // className={theme && theme}
        size="l"
        scrollable
        show={imgModal}
        centered
        onHide={onHide}
      >
        <img {...rest} onClick={onShow} className="object-cover" />
      </Modal>
    </div>
  );
}

export default ImageModal;
