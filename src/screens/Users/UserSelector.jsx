function UserTypeSelector({
  onChangeSelector,
  data,
  title = "",
  value = "Select",
}) {
  return (
    <div className="col-12 col-md-3" style={{ marginRight: 10, width: "40%" }}>
      {title ? <label className="form-label">{title}</label> : null}
      <select
        onChange={onChangeSelector}
        className="form-select "
        defaultValue={value}
        value={value}
      >
        <option disabled>Select</option>
        {data?.length > 0 &&
          data?.map((item, i) => {
            return (
              <option key={item?._id} value={item?._id}>
                {item?.type}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default UserTypeSelector;
