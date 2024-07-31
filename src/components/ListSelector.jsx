function ListSelector({ onChangeSelector, data, title = "" }) {
  return (
    <div className="col-12 col-md-3 mb-3">
      <label className="form-label">{title}</label>
      <select
        onChange={onChangeSelector}
        className="form-select"
        defaultValue="Select"
      >
        <option hidden disabled>
          Select
        </option>
        {data?.length > 0 &&
          data?.map((item, i) => {
            return (
              <option key={item?._id} value={item?._id}>
                {item?.mobile_data?.title}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default ListSelector;
