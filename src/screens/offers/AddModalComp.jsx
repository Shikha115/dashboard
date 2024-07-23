import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ImageUpload from "../../components/ImageUpload";
import _ from "lodash";
import TextEditor from "../../components/TextEditor";

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
              if (item?.key === "Card Type" || item?.key === "Status") {
                return null;
              }
              if (
                item?.key === "Benefit" ||
                item?.key === "Who can apply" ||
                item?.key === "How to process" ||
                item?.key === "Marketing" ||
                item?.key === "T&C"
              ) {
                return (
                  <div key={index} className="col-12 col-md-12 mb-2">
                    <div className="col-12 col-md-12">
                      <label className="form-label">
                        {item?.key}
                        <span className="fs-17 text-danger">*</span>
                      </label>{" "}
                      <TextEditor
                        item={
                          Array.isArray(item?.value)
                            ? item.value.join("")
                            : item?.value
                        }
                        onChange={(e) => {
                          // console.log(e);
                          item.value = e;
                        }}
                      />
                    </div>
                  </div>
                );
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
