import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apis } from "../utils/URL";
import { errorMessage } from "../utils/http";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";
import Loader from "../components/Loader";

// Human-readable file size. Backups are JSON, so they get big quickly and a
// raw byte count tells the operator nothing useful.
const formatSize = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// "users__14-30-05.json" -> "users"
const collectionOf = (file = "") => file.split("__")[0];

function Backup() {
  const { theme } = useAuthStore();
  const { setToastData } = useToastStore();

  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState([]);
  const [backupPath, setBackupPath] = useState("");
  const [openDay, setOpenDay] = useState("");

  const load = async () => {
    try {
      const [collectionsRes, backupsRes] = await Promise.all([
        axios.get(apis.getBackupCollections),
        axios.get(apis.getBackups),
      ]);
      setCollections(collectionsRes?.data?.data?.collections || []);
      setBackupPath(collectionsRes?.data?.data?.backupPath || "");
      const loadedDays = backupsRes?.data?.data?.days || [];
      setDays(loadedDays);
      setOpenDay((prev) => prev || loadedDays[0]?.day || "");
    } catch (err) {
      setToastData({ color: "red", message: errorMessage(err, "Failed to load backups") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalDocuments = useMemo(
    () => collections.reduce((sum, c) => sum + (c.count || 0), 0),
    [collections]
  );

  const toggle = (name) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  // `names` empty means "every collection" to the backend.
  const run = async (names) => {
    setRunning(true);
    try {
      const res = await axios.post(apis.runBackup, { collections: names });
      const data = res?.data?.data || {};
      const failures = data.failures || [];
      setToastData({
        color: failures.length ? "red" : "#00ff1e",
        message: failures.length
          ? `${res?.data?.message}: ${failures.map((f) => f.collection).join(", ")}`
          : `${res?.data?.message} into ${data.day} (${formatSize(data.totalSize || 0)})`,
      });
      setSelected([]);
      setOpenDay(data.day || "");
      await load();
    } catch (err) {
      setToastData({ color: "red", message: errorMessage(err, "Backup failed") });
    } finally {
      setRunning(false);
    }
  };

  // The file is served with the bearer token attached by the axios
  // interceptor, so it has to be fetched as a blob rather than linked to.
  const download = async (day, file) => {
    try {
      const res = await axios.get(apis.downloadBackup, {
        params: { day, file },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setToastData({ color: "red", message: errorMessage(err, "Download failed") });
    }
  };

  if (loading) return <Loader />;

  const dark = theme === "dark";
  const card = {
    background: dark ? "#1e1e2d" : "#fff",
    color: dark ? "#fff" : "#1e1e2d",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  };
  const button = (bg) => ({
    padding: "10px 22px",
    borderRadius: 8,
    border: "none",
    background: bg,
    color: "#fff",
    fontWeight: 600,
    marginRight: 12,
    cursor: running ? "wait" : "pointer",
    opacity: running ? 0.7 : 1,
  });
  const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: `1px solid ${dark ? "#2f2f42" : "#eef0f4"}`,
  };

  return (
    <div style={{ padding: 24 }}>
      <h3 style={{ marginBottom: 20, color: dark ? "#fff" : "#1e1e2d" }}>
        Database Backup
      </h3>

      <div style={card}>
        <h5 style={{ marginTop: 0 }}>Take a backup</h5>
        <small style={{ opacity: 0.7 }}>
          Every backup is written on the server under{" "}
          <code>{backupPath || "backups"}</code>, in one folder per day. Running
          it again the same day adds to that day's folder — the time is part of
          each file name, so nothing is overwritten.
        </small>

        <div style={{ margin: "18px 0" }}>
          <button
            style={button("#0d6efd")}
            disabled={running}
            onClick={() => run([])}
          >
            {running ? "Backing up..." : `Backup all (${collections.length})`}
          </button>
          <button
            style={button("#198754")}
            disabled={running || selected.length === 0}
            onClick={() => run(selected)}
          >
            Backup selected ({selected.length})
          </button>
          {selected.length ? (
            <button
              style={{ ...button("#6c757d"), marginRight: 0 }}
              disabled={running}
              onClick={() => setSelected([])}
            >
              Clear
            </button>
          ) : null}
        </div>

        <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 8 }}>
          {collections.length} collections, about{" "}
          {totalDocuments.toLocaleString()} documents
        </div>

        {collections.map((c) => (
          <div key={c.name} style={row}>
            <label style={{ margin: 0, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selected.includes(c.name)}
                disabled={running}
                onChange={() => toggle(c.name)}
                style={{ marginRight: 10 }}
              />
              {c.name}
              <span style={{ opacity: 0.6, marginLeft: 10, fontSize: 13 }}>
                {(c.count || 0).toLocaleString()} docs
              </span>
            </label>
            <button
              style={{
                ...button("#0d6efd"),
                padding: "5px 14px",
                marginRight: 0,
                fontSize: 13,
              }}
              disabled={running}
              onClick={() => run([c.name])}
            >
              Backup
            </button>
          </div>
        ))}
      </div>

      <div style={card}>
        <h5 style={{ marginTop: 0 }}>Existing backups</h5>
        {days.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No backups taken yet.</div>
        ) : (
          days.map((d) => (
            <div key={d.day} style={{ marginBottom: 10 }}>
              <div
                style={{ ...row, cursor: "pointer" }}
                onClick={() => setOpenDay(openDay === d.day ? "" : d.day)}
              >
                <strong>
                  {openDay === d.day ? "▾" : "▸"} {d.day}
                </strong>
                <span style={{ opacity: 0.7, fontSize: 13 }}>
                  {d.files.length} file(s) · {formatSize(d.totalSize)}
                </span>
              </div>

              {openDay === d.day
                ? d.files.map((f) => (
                    <div
                      key={f.file}
                      style={{ ...row, paddingLeft: 20, fontSize: 14 }}
                    >
                      <span>
                        {collectionOf(f.file)}
                        <span style={{ opacity: 0.6, marginLeft: 10 }}>
                          {new Date(f.createdAt).toLocaleTimeString()} ·{" "}
                          {formatSize(f.size)}
                        </span>
                      </span>
                      <button
                        style={{
                          ...button("#6c757d"),
                          padding: "5px 14px",
                          marginRight: 0,
                          fontSize: 13,
                        }}
                        onClick={() => download(d.day, f.file)}
                      >
                        Download
                      </button>
                    </div>
                  ))
                : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Backup;
