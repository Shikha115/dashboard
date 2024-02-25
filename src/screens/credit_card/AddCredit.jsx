import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";

function AddCredit() {
  const [description, setDescription] = useState("");
  const { bank, setBank, getAllBank, getAllCategory, category } =
    useDataStore();

  useEffect(() => {
    getAllBank();
    getAllCategory();
  }, []);

  const title = useRef(null);
  const bank_name = useRef(null);
  const card_type = useRef(null);
  const join_fee = useRef(null);
  const annual_fee = useRef(null);
  const card_image = useRef(null);
  const apply_link = useRef(null);
  const rank = useRef(null);
  const eligibility = useRef(null);
  const benefits = useRef(null);
  const documents = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddBank();
  };

  const AddBank = async () => {
    
    
    let data = {
      type_id: "65c4bb05058cfc0846d4685c",
      title: title.current.value,
      bank_id: "65c0685d058cfc0846d46844",
      card_type: card_type.current.value,
      annual_fees: annual_fee.current.value,
      joining_fees: join_fee.current.value,
      image: card_image.current.value,
      apply_link: apply_link.current.value,
      desc: {
        eligibility: eligibility.current.value,
        benefits: benefits.current.value.split(","),
        documents: documents.current.value.split(","),
      },
      rank: rank.current.value,
      status: true,
      bank_name: bank_name.current.value,
    };
    console.log(data, "data");
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="add-credit">
            <div className="page-title-box">
              <div className="page-title-right">
                <Link className="btn btn-primary" to="/offer/credit-card">
                  Back
                </Link>
              </div>
              <h4 className="page-title">Add Credit Card</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" ref={title} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Choose Bank</label>
                    <select className="form-select" ref={bank_name}>
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
                    <label className="form-label">Card Type</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={card_type}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Joining Fee</label>
                    <input
                      type="number"
                      className="form-control"
                      ref={join_fee}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Annual Fee</label>
                    <input
                      type="number"
                      className="form-control"
                      ref={annual_fee}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Upload Card Image</label>
                    <input
                      type="file"
                      className="form-control"
                      ref={card_image}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Apply Link</label>
                    <input
                      type="url"
                      className="form-control"
                      ref={apply_link}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Rank</label>
                    <input type="number" className="form-control" ref={rank} />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Eligibility</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={eligibility}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Benefits</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={benefits}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Documents</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={documents}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
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
