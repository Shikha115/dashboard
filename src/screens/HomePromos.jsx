import React, { useEffect, useState } from "react";
import axios from "axios";
import { apis } from "../utils/URL";
import useToastStore from "../store/toastStore";

// Promo cards on the app's home screen, under the earnings card.
//  - "highlight": soft amber card with a lightning icon ("Same-day payout")
//  - "share":     bold blue card with a share button ("Share AXIS NEO today")
// Each card opens the chosen offer. The backend keeps at most 4 and trims text.
const MAX_PROMOS = 4;

const KINDS = [
  { key: "highlight", label: "Highlight (amber)" },
  { key: "share", label: "Share (blue)" },
];

const blankPromo = () => ({
  enabled: true,
  kind: "highlight",
  title: "",
  subtitle: "",
  offer_id: "",
});

function HomePromos({ dark, cardStyle, inputStyle }) {
  const { setToastData } = useToastStore();
  const [promos, setPromos] = useState([]);
  const [offers, setOffers] = useState([]);
  const [meta, setMeta] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [settingsRes, offersRes] = await Promise.all([
          axios.get(apis.getSettings),
          axios.get(apis.getallOffers),
        ]);
        const home = settingsRes?.data?.data?.home || {};
        setPromos(Array.isArray(home.promos) ? home.promos : []);
        setMeta({ updated_by: home.updated_by, updated_at: home.updated_at });
        setOffers(
          (offersRes?.data?.data || [])
            .filter((o) => o?.status)
            .map((o) => ({
              id: o._id,
              title: o?.mobile_data?.title || "Untitled offer",
              earning: o?.mobile_data?.earning,
            }))
        );
      } catch (err) {
        setToastData({
          color: "red",
          message: err?.response?.data?.message || "Failed to load home promos",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (index, patch) =>
    setPromos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );

  const move = (index, dir) =>
    setPromos((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const save = async () => {
    setSaving(true);
    try {
      const res = await axios.post(apis.updateSettings, { home: { promos } });
      const home = res?.data?.data?.home || {};
      setPromos(home.promos || []);
      setMeta({ updated_by: home.updated_by, updated_at: home.updated_at });
      setToastData({ color: "#00ff1e", message: "Home promos saved" });
    } catch (err) {
      setToastData({
        color: "red",
        message: err?.response?.data?.message || "Failed to save home promos",
      });
    } finally {
      setSaving(false);
    }
  };

  const muted = { opacity: 0.7 };

  return (
    <div style={cardStyle}>
      <h5 style={{ margin: 0 }}>Home screen promos</h5>
      <small style={{ ...muted, display: "block", marginBottom: 16 }}>
        Cards shown on the app's home screen under the earnings card, in this
        order. Up to {MAX_PROMOS}.
      </small>

      {promos.length === 0 ? (
        <div style={{ ...muted, marginBottom: 16 }}>No promos yet.</div>
      ) : null}

      {promos.map((p, i) => (
        <div
          key={i}
          style={{
            border: `1px solid ${dark ? "#3a3a4d" : "#d9d9e3"}`,
            borderRadius: 10,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <label style={{ fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={p.enabled !== false}
                onChange={(e) => update(i, { enabled: e.target.checked })}
                style={{ marginRight: 6 }}
              />
              Promo {i + 1} {p.enabled === false ? "(hidden)" : ""}
            </label>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="btn btn-sm btn-light"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                className="btn btn-sm btn-light"
                disabled={i === promos.length - 1}
                onClick={() => move(i, 1)}
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                className="btn btn-sm btn-soft-danger"
                onClick={() =>
                  setPromos((prev) => prev.filter((_, idx) => idx !== i))
                }
              >
                Remove
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <label style={{ fontWeight: 600 }}>Style</label>
              <select
                style={inputStyle}
                value={p.kind}
                onChange={(e) => update(i, { kind: e.target.value })}
              >
                {KINDS.map((k) => (
                  <option key={k.key} value={k.key}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-8">
              <label style={{ fontWeight: 600 }}>Opens offer</label>
              <select
                style={inputStyle}
                value={p.offer_id}
                onChange={(e) => update(i, { offer_id: e.target.value })}
              >
                <option value="">Select an offer</option>
                {offers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.title}
                    {o.earning ? ` · ₹${o.earning}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label style={{ fontWeight: 600 }}>Title</label>
              <input
                style={inputStyle}
                maxLength={40}
                value={p.title}
                placeholder={
                  p.kind === "share" ? "Share AXIS NEO today" : "Same-day payout"
                }
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <label style={{ fontWeight: 600 }}>Subtitle</label>
              <input
                style={inputStyle}
                maxLength={80}
                value={p.subtitle}
                placeholder={
                  p.kind === "share"
                    ? "₹2,200 per approved card"
                    : "Bajaj Finserv Insta EMI Card · earn ₹800"
                }
                onChange={(e) => update(i, { subtitle: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          className="btn btn-light"
          disabled={promos.length >= MAX_PROMOS}
          onClick={() => setPromos((prev) => [...prev, blankPromo()])}
        >
          + Add promo
        </button>
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
          {saving ? "Saving..." : "Save promos"}
        </button>
      </div>

      {meta.updated_at ? (
        <div style={{ marginTop: 14, ...muted, fontSize: 13 }}>
          Last changed {new Date(meta.updated_at).toLocaleString()}
          {meta.updated_by ? ` by ${meta.updated_by}` : ""}
        </div>
      ) : null}
    </div>
  );
}

export default HomePromos;
