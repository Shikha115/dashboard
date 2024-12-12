import React from "react";
import JoditEditor from "jodit-react";
import styled from "styled-components";

const StyledEditorContainer = styled.div`
  ::selection {
    background-color: #3399ff; /* Highlight background color */
    color: #ffffff; /* Text color for highlighted text */
  }

  /* Editor container styles */
  .jodit-container {
    min-height: 200px; /* Ensure visible editor area */
    font-size: 16px; /* Adjust text size */
    color: #000; /* Default text color */
    background-color: #fff; /* Background color */
  }

  /* Optional: Style the toolbar */
  .jodit-toolbar {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
  }
`;

function TextEditor({ item, onChange }) {
  const config = {
    readonly: false, // Allow editing
    placeholder: "Start typing here...",
    toolbar: true, // Enable toolbar
    textColor: true, // Enable text color
    backgroundColor: true, // Enable background color
    toolbarButtonSize: "medium",
    font: true, // Enable font options
  };

  return (
    <StyledEditorContainer>
      <JoditEditor
        value={item}
        config={config}
        onChange={(newContent) => {
          // setEditorValue(newContent);
          onChange(newContent);
        }}
      />
    </StyledEditorContainer>
  );
}

export default TextEditor;
