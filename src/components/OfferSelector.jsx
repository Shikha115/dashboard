import React, { useState } from "react";

// Your static_pages data
export const static_pages = [
  {
    _id: "111",
    mobile_data: { title: "none", product_image: "" },
    category_info: { name: "none" },
  },
  {
    _id: "222",
    mobile_data: { title: "Profile", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "333",
    mobile_data: { title: "Home", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "444",
    mobile_data: { title: "Leads", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "555",
    mobile_data: { title: "Earnings", product_image: "" },
    category_info: { name: "App Screen" },
  },
];

const PageSelector = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const handleSelectChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <div>
      <label htmlFor="page-select">Select a Page:</label>
      <select
        id="page-select"
        value={selectedPage}
        onChange={handleSelectChange}
      >
        <option value="">--Please choose an option--</option>
        {static_pages.map((page) => (
          <option key={page._id} value={page._id}>
            {page.mobile_data.title} - {page.category_info.name}
          </option>
        ))}
      </select>

      {selectedPage && (
        <div>
          <h2>Selected Page:</h2>
          <p>
            Title:{" "}
            {
              static_pages.find((page) => page._id === selectedPage).mobile_data
                .title
            }
          </p>
          <p>
            Category:{" "}
            {
              static_pages.find((page) => page._id === selectedPage)
                .category_info.name
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PageSelector;
