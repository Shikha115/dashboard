import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";
import { apis } from "../../utils/URL";
import useToastStore from "../../store/toastStore";
import useDataStore from "../../store/dataStore";
import useAuthStore from "../../store/authStore";

// Personal notification to one user (row button) or to every ticked user
// ("Notify selected"). Each recipient gets their own copy in the app's
// notification list, marked "For you", plus a push.
function NotificationModal(props) {
  const { getTemplates, templates } = useDataStore();
  const { setToastData } = useToastStore();
  const { theme } = useAuthStore();

  const [draft, setDraft] = useState({ title: "", message: "", image: "" });
  const [sending, setSending] = useState(false);

  const userIds = useMemo(
    () => (Array.isArray(props.userIds) ? props.userIds.filter(Boolean) : []),
    [props.userIds]
  );
  const single = userIds.length === 1 && props.currentData?._id;

  // Email templates can't be pushed; only offer notification ones.
  const pushTemplates = (templates || []).filter(
    (t) => !t?.type || t.type === "notification"
  );

  useEffect(() => {
    getTemplates();
  }, []);

  const close = () => {
    props.setNotificationModal(false);
    setDraft({ title: "", message: "", image: "" });
  };

  const pickTemplate = (index) => {
    const t = pushTemplates[index];
    if (!t) {
      setDraft({ title: "", message: "", image: "" });
      return;
    }
    setDraft({
      title: t.title || "",
      message: t.message || "",
      image: t.image || "",
      route: t.route || "",
      route_id: t.route_id || "",
    });
  };

  const send = async () => {
    if (!userIds.length) {
      setToastData({ message: "Select at least one user", color: "red" });
      return;
    }
    if (!draft.title?.trim() || !draft.message?.trim()) {
      setToastData({ message: "Add a title and a message", color: "red" });
      return;
    }
    setSending(true);
    try {
      const res = await axios.post(apis.sendNotificationToUsers, {
        user_ids: userIds,
        title: draft.title.trim(),
        body: draft.message.trim(),
        image: draft.image || "",
        route: draft.route || "",
        route_id: draft.route_id || "",
      });
      setToastData({ message: res?.data?.message || "Notification sent" });
      close();
    } catch (err) {
      setToastData({
        message:
          err?.response?.data?.message || "Failed to send notification",
        color: "red",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="md"
      show={props.notificationModal}
      centered
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Send personal notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-light border py-2 mb-3">
          <strong>To: </strong>
          {single
            ? `${props.currentData?.name || "User"} (${
                props.currentData?.phone || ""
              })`
            : `${userIds.length} selected user${
                userIds.length === 1 ? "" : "s"
              }`}
          <div className="small text-muted">
            Only {single ? "this user" : "these users"} will see it, marked
            "For you" in the app.
          </div>
        </div>
        <form className="row" onSubmit={(e) => e.preventDefault()}>
          <div className="col-12 mb-2">
            <label className="form-label">Start from a template</label>
            <select
              className="form-select"
              defaultValue=""
              onChange={(e) => pickTemplate(e.target.selectedIndex - 1)}
            >
              <option value="">Write my own</option>
              {pushTemplates.map((val, index) => (
                <option key={val?._id || index} value={index}>
                  {val?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mb-2">
            <label className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              maxLength={80}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className="col-12 mb-2">
            <label className="form-label">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows={3}
              maxLength={240}
              value={draft.message}
              onChange={(e) => setDraft({ ...draft, message: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Image (optional)</label>
            <ImageUpload
              img={draft.image}
              setImage={(image) => setDraft({ ...draft, image })}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={close}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={send} disabled={sending}>
          {sending
            ? "Sending…"
            : `Send to ${userIds.length} user${userIds.length === 1 ? "" : "s"}`}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;
