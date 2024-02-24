import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";
import useDataStore from "../../store/dataStore";

function AddCredit() {
  const [description, setDescription] = useState("");
  const { bank, setBank, getAllBank, getAllCategory, category } =
    useDataStore();

  useEffect(() => {
    getAllBank();
    getAllCategory();
  }, []);

  const AddBank = async () => {
    let data = {
      type_id: "65c4bb05058cfc0846d4685c",
      title: "",
      bank_id: "65c0685d058cfc0846d46844",
      card_type: "",
      annual_fees: "",
      joining_fees: "T",
      bank_image: "",
      apply_link: "",
      desc: {
        eligibility: "",
        benefits: [],
        documents: [],
      },
      rank: 9,
      status: true,
      bank_name: "Standard Chartered Bank",
    };
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="add-credit">
            <div className="page-title-box">
              <h4 className="page-title">Add Credit Card</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <form className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Choose Bank</label>
                    <select className="form-select">
                      {bank &&
                        bank?.map((item, i) => {
                          return (
                            <option value={item?.bank_name} key={i}>
                              {item?.bank_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Joining Fee</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Annual Fee</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Upload Card Image</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Apply Link</label>
                    <input type="url" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Apply Link</label>
                    <input type="url" className="form-control" />
                  </div>
                  <div className="col-12 mb-3"></div>
                  <div className="col-12">
                    <button className="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCredit;
