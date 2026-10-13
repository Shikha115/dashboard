// Edits the "card" block of an offer: what the offer card looks like in the
// app's Pulse design (the label in its top-left corner, the joining fee /
// annual fee / approval rate strip, and the short highlights). The preview on
// the right mirrors the app card, so whoever edits an offer sees what users
// will see. The backend whitelists and trims these fields (utils/offerCard.js).

const TONES = [
  { key: "dark", label: "Dark navy", bg: "#0E1B2C" },
  { key: "blue", label: "Blue", bg: "#114FA8" },
  { key: "green", label: "Green", bg: "#157A3B" },
  { key: "orange", label: "Orange", bg: "#C2410C" },
];

const APPROVAL = [
  { key: "", label: "Don't show" },
  { key: "excellent", label: "Excellent" },
  { key: "good", label: "Good" },
  { key: "average", label: "Average" },
];

const APPROVAL_COLOR = {
  excellent: "#157A3B",
  good: "#114FA8",
  average: "#B45309",
};

const EMPTY = {
  label: "",
  label_tone: "dark",
  subtitle: "",
  joining_fee: "",
  annual_fee: "",
  approval_rate: "",
  highlights: ["", ""],
};

function AppCardEditor({ card, onChange, title, earning, image }) {
  const value = { ...EMPTY, ...(card || {}) };
  const highlights = [0, 1, 2].map((i) => value.highlights?.[i] || "");

  const set = (patch) => onChange({ ...value, ...patch });
  const setHighlight = (i, text) => {
    const next = [...highlights];
    next[i] = text;
    set({ highlights: next });
  };

  const tone = TONES.find((t) => t.key === value.label_tone) || TONES[0];
  const showStrip = value.joining_fee || value.annual_fee || value.approval_rate;

  return (
    <div className="col-12 mb-3">
      <div
        className="p-3"
        style={{ border: "1px solid #dfe3ea", borderRadius: 12 }}
      >
        <h6 className="mb-1">App card</h6>
        <p className="text-muted mb-3" style={{ fontSize: 13 }}>
          Controls how this offer's card looks in the app. Leave a field empty
          to hide it.
        </p>
        <div className="row">
          <div className="col-12 col-lg-7">
            <div className="row">
              <div className="col-12 col-md-7 mb-2">
                <label className="form-label">Label (top-left)</label>
                <input
                  className="form-control"
                  maxLength={32}
                  value={value.label}
                  placeholder="e.g. SAME-DAY PAYOUT"
                  onChange={(e) => set({ label: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-5 mb-2">
                <label className="form-label">Label colour</label>
                <select
                  className="form-select"
                  value={value.label_tone}
                  onChange={(e) => set({ label_tone: e.target.value })}
                >
                  {TONES.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Short description</label>
                <input
                  className="form-control"
                  maxLength={120}
                  value={value.subtitle}
                  placeholder="e.g. Lifetime free. Rewards on every purchase."
                  onChange={(e) => set({ subtitle: e.target.value })}
                />
              </div>
              <div className="col-6 col-md-4 mb-2">
                <label className="form-label">Joining fee</label>
                <input
                  className="form-control"
                  maxLength={24}
                  value={value.joining_fee}
                  placeholder="₹0"
                  onChange={(e) => set({ joining_fee: e.target.value })}
                />
              </div>
              <div className="col-6 col-md-4 mb-2">
                <label className="form-label">Annual fee</label>
                <input
                  className="form-control"
                  maxLength={24}
                  value={value.annual_fee}
                  placeholder="₹500 + GST"
                  onChange={(e) => set({ annual_fee: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-4 mb-2">
                <label className="form-label">Approval rate</label>
                <select
                  className="form-select"
                  value={value.approval_rate}
                  onChange={(e) => set({ approval_rate: e.target.value })}
                >
                  {APPROVAL.map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              {[0, 1, 2].map((i) => (
                <div className="col-12 mb-2" key={i}>
                  <label className="form-label">
                    Highlight {i + 1}
                    {i === 2 ? " (Offers tab only)" : ""}
                  </label>
                  <input
                    className="form-control"
                    maxLength={80}
                    value={highlights[i]}
                    placeholder={
                      [
                        "e.g. 40% off on Zomato",
                        "e.g. 10% off on BookMyShow, Blinkit & Myntra",
                        "e.g. No joining or annual fee",
                      ][i]
                    }
                    onChange={(e) => setHighlight(i, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <label className="form-label">Preview</label>
            <div
              style={{
                background: "#F2F6F9",
                borderRadius: 16,
                padding: "22px 12px 12px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: 18,
                  padding: "14px 12px 12px",
                  boxShadow: "0 4px 18px rgba(14,27,44,0.07)",
                  color: "#0E1B2C",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 10,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "3px solid #F2F6F9",
                    background: "#157A3B",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.1,
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 600 }}>UP TO</span>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>
                    ₹{earning || "—"}
                  </span>
                </div>
                {value.label ? (
                  <span
                    style={{
                      display: "inline-block",
                      background: tone.bg,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      padding: "3px 8px",
                      borderRadius: 6,
                      marginBottom: 8,
                    }}
                  >
                    ⚡ {value.label.toUpperCase()}
                  </span>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingRight: 64,
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        objectFit: "contain",
                        border: "1px solid #DCE4EC",
                      }}
                    />
                  ) : null}
                  <strong style={{ fontSize: 13, lineHeight: 1.3 }}>
                    {title || "Offer title"}
                  </strong>
                </div>
                {value.subtitle ? (
                  <p style={{ fontSize: 11, color: "#56657A", margin: "8px 0 0" }}>
                    {value.subtitle}
                  </p>
                ) : null}
                <ul style={{ margin: "8px 0 0", paddingLeft: 16, fontSize: 11 }}>
                  {highlights
                    .slice(0, 2)
                    .filter(Boolean)
                    .map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                </ul>
                {showStrip ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      background: "#F2F6F9",
                      borderRadius: 10,
                      padding: "8px 2px",
                      marginTop: 8,
                      textAlign: "center",
                      fontSize: 10,
                    }}
                  >
                    <div>
                      <div style={{ color: "#56657A" }}>Joining fee</div>
                      <b>{value.joining_fee || "—"}</b>
                    </div>
                    <div>
                      <div style={{ color: "#56657A" }}>Annual fee</div>
                      <b>{value.annual_fee || "—"}</b>
                    </div>
                    <div>
                      <div style={{ color: "#56657A" }}>Approval rate</div>
                      <b
                        style={{
                          color: APPROVAL_COLOR[value.approval_rate] || "#56657A",
                          textTransform: "capitalize",
                        }}
                      >
                        {value.approval_rate || "—"}
                      </b>
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    marginTop: 8,
                    background: "#157A3B",
                    color: "#fff",
                    borderRadius: 10,
                    textAlign: "center",
                    padding: "7px 0",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Share to customer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppCardEditor;
