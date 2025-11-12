import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const CustomDropdown = ({
  label,
  options = ["pending", "approved", "rejected"],
  selectedOption,
  onSelect,
  data = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option, data);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      {/* <label>{label}</label> */}
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          borderRadius: "4px",
          //   backgroundColor: "#f8f9fa",
        }}
      >
        {selectedOption || "pending"}
      </div>
      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "8px",
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "scroll",
            backgroundColor: "grey",
            borderRadius: "4px",
            position: "absolute",
            zIndex: 1000,
            width: "100%",
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
