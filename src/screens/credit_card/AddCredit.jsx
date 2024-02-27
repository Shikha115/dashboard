import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { BANK_DATA } from "../../store/staticData";
import { Link } from "react-router-dom";
import useDataStore from "../../store/dataStore";
import { apis } from "../../utils/URL";
import axios from "axios";

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
    const bank_detail = bank_name.current.value.split(",");
    let data = {
      type_id: "65c4bb05058cfc0846d4685c",
      title: title.current.value,
      bank_id: bank_detail[1],
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
      bank_name: bank_detail[0],
    };
    axios
      .post(apis.getallOffers, data)
      .then((response) => {
        console.log(data, "data");
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <label className="form-label">
                      Title<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      ref={title}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Choose Bank<span className="fs-17 text-danger">*</span>
                    </label>
                    <select className="form-select" required ref={bank_name}>
                      {bank &&
                        bank?.map((item, i) => {
                          return (
                            <option
                              value={`${item?.bank_name},${item?._id}`}
                              key={i}
                            >
                              {item?.bank_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Card Type<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      ref={card_type}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Joining Fee<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      ref={join_fee}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Annual Fee<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      ref={annual_fee}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Upload Card Image
                      <span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      ref={card_image}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Apply Link<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      required
                      ref={apply_link}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">
                      Rank<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      ref={rank}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">
                      Eligibility<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      ref={eligibility}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">
                      Benefits<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      ref={benefits}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <label className="form-label">
                      Documents<span className="fs-17 text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
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
