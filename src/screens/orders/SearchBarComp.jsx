function SearchBarComp(props) {
  let searchTimer;

  return (
    <>
        <div>
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
      {props.children}
    </>
  );
}

export default SearchBarComp;
