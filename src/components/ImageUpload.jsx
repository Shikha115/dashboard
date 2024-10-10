import React, { useEffect, useState } from "react";
import { images } from "./Images";
import axios from "axios";
import { apis } from "../utils/URL";
import useToastStore from "../store/toastStore";

function ImageUpload({ img, purpose, setImage, disabled }) {
  const { setToastData } = useToastStore();
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .post(apis.uploadImage, formData)
      .then((res) => {
        console.log(res.data);
        setToastData({ message: res?.data?.message });
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="img-upload">
      <input
        disabled={disabled}
        className="form-control"
        type="file"
        required=""
        placeholder="Enter bank name"
        onChange={(e) => {
          if (e.target.files[0]) {
            // getImage(e);
            uploadImage(e);
            // setCurrentData({ ...currentData, image });
          }
        }}
      />
      <div className="update-img">
        <img src={!img ? images.imageUpload : img} className={purpose} alt="" />
      </div>
    </div>
  );
}

export default ImageUpload;

export const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // Append file to FormData

  try {
    const response = await axios.post(apis.uploadImage, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Add authentication or other headers if required
      },
    });

    console.log(response, "res");
    return response.data.image;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
