import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ImageUpload from "../../components/ImageUpload";
import _ from "lodash";

function AddModalComp(props) {
  const [changed, setChanged] = useState(false);

  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="lg"
      scrollable
      show={props.addModal.state}
      centered
      onHide={() => {
        // props.setAddonData({});
        // props.setCurrentData({});
        props.setAddModal((prev) => {
          return { ...prev, state: false };
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.addModal.type === "add" ? "Add" : "Edit"}{" "}
          {props.currentCategory?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          {props.currentData?.length > 0 &&
            props.currentData?.map((item, index) => {
              //   if (item?.key === "Rank") {
              //     <div key={index} className="col-12 col-md-6 mb-2">
              //       <label className="form-label">Rank</label>
              //       <span className="fs-17 text-danger">*</span>
              //       <input
              //         className="form-control"
              //         type="number"
              //         defaultValue={item?.rank}
              //         onChange={(e) => {
              //           let val = e.target.value;
              //           item.status = val;
              //           setChanged(true);

              //           props.setAddonData({
              //             ...props.addonData,
              //             bank_id: e.target.value.split(",")[1],
              //             type_id: props.category_id,
              //             rank: val,
              //           });
              //         }}
              //         placeholder="Enter rank"
              //       />
              //     </div>;
              //   }

              //   if (item?.key === "Status") {
              //     return (
              //       <div key={index} className="col-12 col-md-6 mb-2">
              //         <label className="form-label">Status</label>
              //         <span className="fs-17 text-danger">*</span>
              //         <div className="form-check form-switch">
              //           <input
              //             type="checkbox"
              //             className="form-check-input"
              //             defaultChecked={props.addonData?.status}
              //             onChange={(e) => {
              //               let val = e.target.checked;
              //               item.status = val;
              //               setChanged(true);

              //               props.setAddonData({
              //                 ...props.addonData,
              //                 bank_id: e.target.value.split(",")[1],
              //                 type_id: props.category_id,
              //                 status: val,
              //               });
              //             }}
              //           />
              //         </div>
              //       </div>
              //     );
              //   }

              if (item?.key === "Card Type") {
                return null;
              }

              if (item?.key === "Product Image") {
                return (
                  <div key={index} className="col-12 col-md-6 mb-2">
                    <div className="col-12 col-md-12">
                      <label className="form-label">
                        Product Image{" "}
                        <span className="fs-17 text-danger">*</span>
                      </label>

                      <ImageUpload
                        img={item?.value}
                        purpose={"add"}
                        setImage={(e) => {
                          setChanged(true);
                          item.value = e;
                          props.setCurrentData([...props.currentData]);
                        }}
                      />
                    </div>
                  </div>
                );
              }

              if (item?.key === "Product Image Web") {
                return (
                  <div key={index} className="col-12 col-md-6 mb-2">
                    <div className="col-12 col-md-12">
                      <label className="form-label">
                        Product Image Web{" "}
                        <span className="fs-17 text-danger">*</span>
                      </label>

                      <ImageUpload
                        img={item?.value}
                        purpose={"add"}
                        setImage={(e) => {
                          setChanged(true);
                          item.value = e;
                          props.setCurrentData([...props.currentData]);
                        }}
                      />
                    </div>
                  </div>
                );
              } // if (item?.key === "Bank Name") {
              //   return (
              //     <div key={index} className="col-12 col-md-6 mb-3">
              //       <label className="form-label">
              //         Choose Bank
              //         <span className="fs-17 text-danger">*</span>
              //       </label>
              //       <select
              //         className="form-select"
              //         required
              //         onChange={(e) => {
              //           item.value = e.target.value.split(",")[1];
              //           setAddonData({
              //             ...addonData,
              //             bank_id: item?.value,
              //             type_id: category_id,
              //           });
              //         }}
              //         defaultValue={
              //           bankData?.bank_name + "," + bankData?._id ??
              //           "Select a bank"
              //         }
              //       >
              //         {bank &&
              //           bank?.map((val, i) => {
              //             return (
              //               <option
              //                 key={i}
              //                 defaultValue={
              //                   bankData?.bank_name + "," + bankData?._id
              //                 }
              //                 value={`${val?.bank_name},${val?._id}`}
              //               >
              //                 {val?.bank_name}
              //               </option>
              //             );
              //           })}
              //       </select>
              //     </div>
              //   );
              // }

              return (
                <div key={index} className="col-12 col-md-6 mb-2">
                  <label className="form-label">{item?.key}</label>
                  <span className="fs-17 text-danger">*</span>
                  <textarea
                    className="form-control"
                    type="text"
                    rows={Array.isArray(item?.value) ? item?.value.length : 1}
                    defaultValue={
                      Array.isArray(item?.value)
                        ? item?.value.join("\n")
                        : item?.value
                    }
                    style={{
                      height: "auto",
                      resize: "vertical",
                      overflow: "hidden",
                    }}
                    onChange={(e) => {
                      setChanged(true);
                      item.value = e.target.value;
                    }}
                    placeholder={"Enter " + item?.key}
                  />
                </div>
              );
            })}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() =>
            props.setAddModal((prev) => {
              return { ...prev, state: false };
            })
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={props.handleSubmit}
        >
          {props.addModal.type === "edit" ? (changed ? "Save" : "Edit") : "Add"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModalComp;
