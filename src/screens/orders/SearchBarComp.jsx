function SearchBarComp(props) {
  let searchTimer;

  return (
    <div className="col-12">
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
      </div>
      {props.children}
    </div>
  );
}

export default SearchBarComp;
