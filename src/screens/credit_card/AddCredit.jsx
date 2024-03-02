import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import axios from "axios";
import { apis } from "../../utils/URL";

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
  const earning = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddBank();
  };

  const AddBank = async () => {
    let BANK_INFO = JSON.parse(bank_name.current.value);

    const formData = new FormData();

    formData.append("type_id", "65c4bb05058cfc0846d4685c");
    formData.append("title", title.current.value);
    formData.append("bank_id", BANK_INFO?._id);
    formData.append("card_type", card_type.current.value);
    formData.append("annual_fees", annual_fee.current.value);
    formData.append("joining_fees", join_fee.current.value);
    formData.append("image", card_image.current.files[0]);
    formData.append("apply_link", apply_link.current.value);
    formData.append("desc[eligibility]", eligibility.current.value);
    formData.append("desc[benefits]", benefits.current.value);
    formData.append("desc[documents]", documents.current.value);
    formData.append("rank", rank.current.value);
    formData.append("status", true);
    formData.append("bank_name", BANK_INFO?.bank_name);
    formData.append("earning", earning?.current?.value);

    // // console.log(card_image.current.files[0], "img");
    // // for (const pair of formData.entries()) {
    //   // console.log(pair[0] + ": " + pair[1]);
    // // }

    axios
      .post(apis.createOffer, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        console.log(e);
        alert("e.data.message");
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
                            <option value={JSON.stringify(item)} key={i}>
                              {item.bank_name}
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
                      accept="image/*"
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
                    <label className="form-label">Benefits</label>
                    <textarea
                      type="text"
                      className="form-control"
                      ref={benefits}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">Documents</label>
                    <textarea
                      type="text"
                      className="form-control"
                      ref={documents}
                    />
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
                    <label className="form-label">Earning</label>
                    <input type="text" className="form-control" ref={earning} />
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
