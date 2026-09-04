import React, { useEffect, useState } from "react";
import axios from "axios";
import { apis } from "../utils/URL";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";
import Loader from "../components/Loader";

const PLATFORMS = [
  { key: "android", label: "Android" },
  { key: "ios", label: "iOS" },
];

// Maintenance mode is the only section today. New settings sections go in the
// same document and render as further blocks on this page.
function Settings() {
  const { theme } = useAuthStore();
  const { setToastData } = useToastStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [maintenance, setMaintenance] = useState({
    enabled: false,
    title: "",
    message: "",
    platforms: ["android", "ios"],
    min_supported_version: "",
    until: "",
    updated_by: "",
    updated_at: null,
  });

  const loadSettings = async () => {
    try {
      const res = await axios.get(apis.getSettings);
      const m = res?.data?.data?.maintenance || {};
      setMaintenance({
        enabled: Boolean(m.enabled),
        title: m.title || "",
        message: m.message || "",
        platforms: Array.isArray(m.platforms) ? m.platforms : ["android", "ios"],
        min_supported_version: m.min_supported_version || "",
        // datetime-local wants "YYYY-MM-DDTHH:mm" with no zone suffix.
        until: m.until ? new Date(m.until).toISOString().slice(0, 16) : "",
        updated_by: m.updated_by || "",
        updated_at: m.updated_at || null,
      });
    } catch (err) {
      setToastData({
        color: "red",
        message:
          err?.response?.data?.message || "Failed to load settings",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (override = {}) => {
    const next = { ...maintenance, ...override };
    setSaving(true);
    try {
      const res = await axios.post(apis.updateSettings, {
        maintenance: {
          enabled: next.enabled,
          title: next.title,
          message: next.message,
          platforms: next.platforms,
          min_supported_version: next.min_supported_version,
          until: next.until ? new Date(next.until).toISOString() : null,
        },
      });
      const m = res?.data?.data?.maintenance || {};
      setMaintenance((prev) => ({
        ...prev,
        ...override,
        updated_by: m.updated_by || "",
        updated_at: m.updated_at || null,
      }));
      setToastData({
        color: "#00ff1e",
        message: next.enabled
          ? "Maintenance mode is ON — the app now shows the maintenance screen"
          : "Maintenance mode is OFF",
      });
    } catch (err) {
      setToastData({
        color: "red",
        message: err?.response?.data?.message || "Failed to save settings",
      });
      // Put the switch back where it was, so the UI never claims a state the
      // server did not accept.
      if ("enabled" in override) {
        setMaintenance((prev) => ({ ...prev, enabled: !override.enabled }));
      }
    } finally {
      setSaving(false);
    }
  };

  const togglePlatform = (key) => {
    setMaintenance((prev) => {
      const has = prev.platforms.includes(key);
      return {
        ...prev,
        platforms: has
          ? prev.platforms.filter((p) => p !== key)
          : [...prev.platforms, key],
      };
    });
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
  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${dark ? "#3a3a4d" : "#d9d9e3"}`,
    background: dark ? "#2a2a3d" : "#fff",
    color: dark ? "#fff" : "#1e1e2d",
    marginBottom: 16,
  };

  return (
    <div style={{ padding: 24 }}>
      <h3 style={{ marginBottom: 20, color: dark ? "#fff" : "#1e1e2d" }}>
        Settings
      </h3>

      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div>
            <h5 style={{ margin: 0 }}>Maintenance mode</h5>
            <small style={{ opacity: 0.7 }}>
              When ON, the app shows the maintenance screen instead of its
              normal content. The dashboard is never blocked.
            </small>
          </div>

          <label className="switch" style={{ marginLeft: 16 }}>
            <input
              type="checkbox"
              checked={maintenance.enabled}
              disabled={saving}
              onChange={(e) => {
                const enabled = e.target.checked;
                setMaintenance((prev) => ({ ...prev, enabled }));
                save({ enabled });
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: 54,
                height: 30,
                borderRadius: 15,
                background: maintenance.enabled ? "#e53935" : "#9e9e9e",
                position: "relative",
                cursor: saving ? "wait" : "pointer",
                verticalAlign: "middle",
                marginLeft: 8,
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  left: maintenance.enabled ? 27 : 3,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                }}
              />
            </span>
          </label>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            marginBottom: 20,
            background: maintenance.enabled ? "#ffebee" : "#e8f5e9",
            color: maintenance.enabled ? "#b71c1c" : "#1b5e20",
            fontWeight: 600,
          }}
        >
          {maintenance.enabled
            ? "App is currently UNDER MAINTENANCE for users"
            : "App is live for users"}
        </div>

        <label style={{ fontWeight: 600 }}>Title</label>
        <input
          style={input}
          value={maintenance.title}
          placeholder="Under maintenance"
          onChange={(e) =>
            setMaintenance((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <label style={{ fontWeight: 600 }}>Message shown to users</label>
        <textarea
          style={{ ...input, minHeight: 90 }}
          value={maintenance.message}
          placeholder="We are performing scheduled maintenance. Please check back shortly."
          onChange={(e) =>
            setMaintenance((prev) => ({ ...prev, message: e.target.value }))
          }
        />

        <label style={{ fontWeight: 600 }}>Platforms affected</label>
        <div style={{ marginBottom: 16, marginTop: 6 }}>
          {PLATFORMS.map((p) => (
            <label key={p.key} style={{ marginRight: 20 }}>
              <input
                type="checkbox"
                checked={maintenance.platforms.includes(p.key)}
                onChange={() => togglePlatform(p.key)}
                style={{ marginRight: 6 }}
              />
              {p.label}
            </label>
          ))}
        </div>

        <label style={{ fontWeight: 600 }}>
          Back online at <small style={{ opacity: 0.7 }}>(optional)</small>
        </label>
        <input
          type="datetime-local"
          style={input}
          value={maintenance.until}
          onChange={(e) =>
            setMaintenance((prev) => ({ ...prev, until: e.target.value }))
          }
        />

        <label style={{ fontWeight: 600 }}>
          Minimum supported version{" "}
          <small style={{ opacity: 0.7 }}>
            (optional — builds at or above this keep working)
          </small>
        </label>
        <input
          style={input}
          value={maintenance.min_supported_version}
          placeholder="e.g. 1.3.3"
          onChange={(e) =>
            setMaintenance((prev) => ({
              ...prev,
              min_supported_version: e.target.value,
            }))
          }
        />

        <button
          disabled={saving}
          onClick={() => save()}
          style={{
            padding: "10px 22px",
            borderRadius: 8,
            border: "none",
            background: "#0d6efd",
            color: "#fff",
            fontWeight: 600,
            cursor: saving ? "wait" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {maintenance.updated_at ? (
          <div style={{ marginTop: 14, opacity: 0.7, fontSize: 13 }}>
            Last changed {new Date(maintenance.updated_at).toLocaleString()}
            {maintenance.updated_by ? ` by ${maintenance.updated_by}` : ""}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Settings;
