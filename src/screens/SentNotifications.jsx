import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { MdDelete } from "react-icons/md";

import { apis } from "../utils/URL";
import useToastStore from "../store/toastStore";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const AUDIENCES = [
  { value: "", label: "All notifications" },
  { value: "all", label: "Sent to everyone" },
  { value: "user", label: "Sent to specific users" },
];

const when = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

// Everything the app's notification list shows: announcements (everyone)
// and personal ones (one partner each), newest first.
function SentNotifications({ access, refreshKey }) {
  const { setToastData } = useToastStore();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [audience, setAudience] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(apis.getSentNotifications, {
        params: { page, limit: 20, audience, search },
      });
      setRows(res?.data?.data || []);
      setTotal(res?.data?.pagination?.totalDocuments || 0);
    } catch (err) {
      setRows([]);
      setToastData({ message: "Could not load sent notifications", color: "red" });
    } finally {
      setLoading(false);
    }
  }, [page, audience, search, setToastData]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load, refreshKey]);

  const remove = async () => {
    try {
      await axios.post(apis.deleteSentNotification, { id: toDelete?._id });
      setToastData({ message: "Notification deleted", color: "#00ff1e" });
      setToDelete(null);
      load();
    } catch (err) {
      setToastData({
        message: err?.response?.data?.message || "Failed to delete",
        color: "red",
      });
    }
  };

  const columns = [
    { name: "Sent", width: "140px", selector: (r) => when(r.created_at) },
    {
      name: "Audience",
      width: "220px",
      cell: (r) =>
        r.audience === "all" ? (
          <span className="badge bg-primary">Everyone</span>
        ) : (
          <div>
            <span className="badge bg-success me-1">Personal</span>
            <div className="small">
              {r.recipient?.name || "Unknown user"}
              {r.recipient?.phone ? ` · ${r.recipient.phone}` : ""}
            </div>
          </div>
        ),
    },
    { name: "Title", wrap: true, selector: (r) => r.title },
    { name: "Message", wrap: true, grow: 2, selector: (r) => r.body },
    {
      name: "Status",
      width: "120px",
      cell: (r) =>
        r.audience === "all" ? (
          <span className="small text-muted">{r.read_count || 0} opened</span>
        ) : r.read ? (
          <span className="badge bg-secondary">Read</span>
        ) : (
          <span className="badge bg-warning text-dark">Unread</span>
        ),
    },
    {
      name: "",
      width: "70px",
      cell: (r) => (
        <button
          className="btn btn-pink btn-sm"
          aria-label="Delete notification"
          onClick={() => {
            if (!access?.notification?.delete) {
              setToastData({
                message: "You don't have delete access",
                color: "red",
              });
              return;
            }
            setToDelete(r);
          }}
        >
          <MdDelete className="fs-18" />
        </button>
      ),
    },
  ];

  return (
    <div className="manage-bank mt-4">
      <div className="page-title-box">
        <div className="page-title-right d-flex gap-2">
          <select
            className="form-select"
            style={{ minWidth: 220 }}
            value={audience}
            onChange={(e) => {
              setPage(1);
              setAudience(e.target.value);
            }}
          >
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
          <input
            type="search"
            className="form-control"
            placeholder="Search title or message…"
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
        <h4 className="page-title">Sent notifications</h4>
      </div>
      <DataTable
        columns={columns}
        data={rows}
        progressPending={loading}
        pagination
        paginationServer
        paginationPerPage={20}
        paginationTotalRows={total}
        paginationComponentOptions={{ noRowsPerPage: true }}
        onChangePage={setPage}
      />
      <DeleteConfirmModal
        show={!!toDelete}
        onHide={() => setToDelete(null)}
        onConfirm={remove}
        confirmLabel="Delete"
        message="It will disappear from the app for everyone who received it. This can't be undone."
      />
    </div>
  );
}

export default SentNotifications;
