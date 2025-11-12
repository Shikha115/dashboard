function ListSelector({ onChangeSelector, data, title = "" }) {
  return (
    <>
      {title ? <label className="form-label">{title}</label> : null}
      <select
        onChange={onChangeSelector}
        className="form-select "
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
    </>
  );
}

export default ListSelector;
