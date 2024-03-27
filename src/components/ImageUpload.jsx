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
      />
      <div className="update-img">
        {purpose == "add" ? (
          <img
            src={img}
            className={purpose}
            onChange={(e) => {
              if (e.target.files[0]) {
                let image = URL.createObjectURL(e.target.files[0]);
                console.log(image, "image");
                getImage(image);
                // setCurrentData({ ...currentData, image });
              }
            }}
          />
        ) : (
          <img src={img} className={purpose} />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
