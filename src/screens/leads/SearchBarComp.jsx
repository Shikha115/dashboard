import useAuthStore from "../../store/authStore";

function SearchBarComp(props) {
  let searchTimer;
  const {
    profile: { access },
  } = useAuthStore();

  return (
    <div className="col-12 ">
      <div className="d-flex align-items-center gap-2">
        <div className="col-12 col-md-3 mb-3">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={props.handleFileUpload}
            style={{
              display: "none",
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => {
              clearTimeout(searchTimer);
              searchTimer = setTimeout(() => {
                props.searchFilter(e);
              }, 400);
            }}
          />
        </div>
        {!access?.lead.edit ? null : (
          <div className="col-12 col-md-6 mb-3">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                // fileInputRef.current.click();
                e.preventDefault();
                props.setLeadModal(true);
              }}
            >
              Upload Leads
            </button>{" "}
            <button
              className="btn btn-primary"
              onClick={(e) => {
                props.exportExcel(e);
              }}
            >
              Export Leads
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBarComp;
