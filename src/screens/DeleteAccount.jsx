import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apis } from "../utils/URL";
import Loader from "../components/Loader";

// The route param is a short-lived signed token from the confirmation email,
// not a user id: a bare id would let anyone delete any account by guessing it.
function DeleteAccount() {
  const { id: token } = useParams();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const confirmDeletion = async () => {
    setStatus("working");
    try {
      const res = await axios.post(apis.confirmAccountDeletion, { token });
      setStatus("done");
      setMessage(res?.data?.message || "Account deleted successfully");
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "This deletion link is invalid or has expired."
      );
    }
  };

  if (status === "working") {
    return <Loader />;
  }

  return (
    <section className="authentication-bg position-relative">
      <div className="account-pages pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card p-4 text-center">
                {status === "idle" && (
                  <>
                    <h4 className="mt-0 fs-20">Delete your account?</h4>
                    <p className="text-muted mb-4">
                      This permanently removes your RojgarApp account and
                      profile data. This cannot be undone.
                    </p>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={confirmDeletion}
                    >
                      Yes, delete my account
                    </button>
                  </>
                )}

                {status !== "idle" && (
                  <>
                    <h4 className="mt-0 fs-20">
                      {status === "done" ? "Account deleted" : "Link problem"}
                    </h4>
                    <p className="text-muted mb-0">{message}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeleteAccount;
