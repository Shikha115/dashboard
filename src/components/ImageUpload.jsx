import React from "react";
import { images } from "./Images";

function ImageUpload({ img, purpose, getImage }) {
  return (
    <div className="img-upload">
      <input
        className="form-control"
        type="file"
        required=""
        placeholder="Enter bank name"
        onChange={(e) => {
          if (e.target.files[0]) {
            getImage(e);
            // setCurrentData({ ...currentData, image });
          }
        }}
      />
      <div className="update-img">
        <img
          src={img === "" ? images.imageUpload : img}
          className={purpose}
          alt=""
        />
      </div>
    </div>
  );
}

export default ImageUpload;
