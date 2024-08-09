import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";
import useDataStore from "../../store/dataStore";
import useAuthStore from "../../store/authStore";

function NotificationModal(props) {
  const { getTemplates, templates } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  const [SelectedTemplate, setSelectedTemplate] = useState();

  const sendNotification = async () => {
    if (!SelectedTemplate) {
      setToastData({ message: "Select a template to continue" });
      return;
    }

    // console.log(props);

    // return;
    // console.log(SelectedTemplate);
    if (SelectedTemplate?.type === "email") {
      const params = {
        tokens: props.currentData?.fcm_token,
        title: SelectedTemplate?.title,
        body: SelectedTemplate?.message,
        image: SelectedTemplate?.image,
      };

      axios
        .post(apis.multiNotification, {
          ...params,
        })
        .then((e) => {
          // console.log(e);
          props.setNotificationModal(false);
          setToastData({ message: "Notification sent" });
        })
        .catch((err) => {
          console.log(err);
          setToastData({
            message: "Failed to send notification",
            color: "red",
          });
        });
    } else {
      const params = {
        tokens: props.currentData?.fcm_token,
        user_id: props?.currentData?._id,
        title: SelectedTemplate?.title,
        body: SelectedTemplate?.message,
        image: SelectedTemplate?.image,
        route: SelectedTemplate?.route,
        route_id: SelectedTemplate?.route_id,
      };

      axios
        .post(apis.multiNotification, {
          ...params,
        })
        .then((e) => {
          axios
            .post(apis.saveNotification, { ...params })
            .then((item) => {
              // console.log(item);
            })
            .catch((err) => {
              console.log(err);
            });
          // console.log(e);
          props.setNotificationModal(false);
          setToastData({ message: "Notification sent" });
        })
        .catch((err) => {
          console.log(err);
          setToastData({
            message: "Failed to send notification",
            color: "red",
          });
        });
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <Modal
      className={theme ? theme : ""}
      size="md"
      show={props.notificationModal}
      centered
      onHide={() => {
        props.setNotificationModal(false);
        setSelectedTemplate({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Send Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="#" className="row">
          <div className="col-12 mb-2">
            <label className="form-label">
              Select a Template <span className="fs-17 text-danger">*</span>
            </label>
            <select
              className="form-select"
              required
              onChange={(e) => {
                const selectedPage = templates[e.target.selectedIndex - 1];
                // console.log(templates);
                setSelectedTemplate(selectedPage);
              }}
              defaultValue={""}
            >
              <option disabled value={""} selected={true}>
                Select Template
              </option>
              {templates &&
                templates?.map((val, index) => {
                  return (
                    <option key={index} defaultValue={val?.title}>
                      {val?.title} - {val?.type}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Title</label>
            <input
              disabled
              className="form-control"
              type="text"
              required=""
              value={SelectedTemplate?.title ?? ""}
            />
          </div>{" "}
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label">Type</label>
            <input
              disabled
              className="form-control"
              type="text"
              required=""
              value={SelectedTemplate?.type ?? ""}
            />
          </div>{" "}
          {SelectedTemplate?.subject ? (
            <div className="col-12 col-md-12 mb-2">
              <label className="form-label">Subject</label>
              <input
                disabled
                className="form-control"
                type="text"
                required=""
                defaultValue={SelectedTemplate?.subject ?? ""}
              />
            </div>
          ) : null}
          <div className="col-12 col-md-12 mb-2">
            <label className="form-label">Message</label>
            <input
              disabled
              className="form-control"
              type="text"
              required=""
              value={SelectedTemplate?.message ?? ""}
            />
          </div>{" "}
          <div className="col-12 col-md-12">
            <label className="form-label">Upload Image</label>
            <ImageUpload
              img={SelectedTemplate?.image}
              purpose={"add"}
              disabled={true}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            props.setNotificationModal(false);
            setSelectedTemplate({});
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            sendNotification();
          }}
        >
          Send
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;
