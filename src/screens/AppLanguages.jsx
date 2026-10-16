import React, { useEffect, useState } from "react";
import axios from "axios";
import { apis } from "../utils/URL";
import useToastStore from "../store/toastStore";
import { LANGUAGES } from "../utils/languages";

// Which languages app users can pick (Profile → Language in the app), and the
// one the app starts in for someone who has not picked yet. A user's own
// choice is saved on their account and follows them to every login. English
// is always available: it is what any missing translation falls back to.
function AppLanguages({ dark, cardStyle }) {
  const { setToastData } = useToastStore();
  const [enabled, setEnabled] = useState(["en", "hi"]);
  const [defaultLang, setDefaultLang] = useState("en");
  const [meta, setMeta] = useState({});
  const [saving, setSaving] = useState(false);

  const apply = (l = {}) => {
    setEnabled(Array.isArray(l.enabled) && l.enabled.length ? l.enabled : ["en", "hi"]);
    setDefaultLang(l.default || "en");
    setMeta({ updated_by: l.updated_by, updated_at: l.updated_at });
  };

  useEffect(() => {
    axios
      .get(apis.getSettings)
      .then((res) => apply(res?.data?.data?.languages))
      .catch((err) =>
        setToastData({
          color: "red",
          message: err?.response?.data?.message || "Failed to load languages",
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (code) => {
    if (code === "en") return;
    setEnabled((prev) => {
      const next = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code];
      if (!next.includes(defaultLang)) setDefaultLang("en");
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await axios.post(apis.updateSettings, {
        languages: { enabled, default: defaultLang },
      });
      apply(res?.data?.data?.languages);
      setToastData({ color: "#00ff1e", message: "App languages saved" });
    } catch (err) {
      setToastData({
        color: "red",
        message: err?.response?.data?.message || "Failed to save languages",
      });
    } finally {
      setSaving(false);
    }
  };

  const muted = { opacity: 0.7 };
  const row = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderRadius: 10,
    marginBottom: 8,
    background: dark ? "#2a2a3d" : "#f6f7fb",
  };

  return (
    <div style={cardStyle}>
      <h5 style={{ margin: 0 }}>App languages</h5>
      <small style={muted}>
        Languages users can choose in the app (Profile → Language). Each user's
        choice is saved on their account and used on every phone they sign in
        on. Offer, banner and notification text is shown as you type it here.
      </small>

      <div style={{ marginTop: 16 }}>
        {LANGUAGES.map((l) => {
          const on = enabled.includes(l.code);
          const locked = l.code === "en";
          return (
            <div key={l.code} style={row}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {l.native}
                  {l.native !== l.name ? (
                    <span style={{ ...muted, fontWeight: 400 }}> · {l.name}</span>
                  ) : null}
                </div>
                {locked ? (
                  <small style={muted}>Always on</small>
                ) : null}
              </div>
              <div className="form-check form-switch m-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`lang-${l.code}`}
                  checked={on}
                  disabled={locked || saving}
                  onChange={() => toggle(l.code)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <label style={{ fontWeight: 600, marginTop: 8 }}>
        Default for users who have not picked one
      </label>
      <select
        className="form-select"
        style={{ maxWidth: 320, marginTop: 6, marginBottom: 16 }}
        value={defaultLang}
        onChange={(e) => setDefaultLang(e.target.value)}
      >
        {LANGUAGES.filter((l) => enabled.includes(l.code)).map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>

      <div>
        <button
          disabled={saving}
          onClick={save}
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
          {saving ? "Saving..." : "Save languages"}
        </button>
      </div>

      {meta.updated_at ? (
        <div style={{ marginTop: 14, opacity: 0.7, fontSize: 13 }}>
          Last changed {new Date(meta.updated_at).toLocaleString()}
          {meta.updated_by ? ` by ${meta.updated_by}` : ""}
        </div>
      ) : null}
    </div>
  );
}

export default AppLanguages;
