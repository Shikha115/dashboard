import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

// Styled Container for CKEditor
const StyledEditorContainer = styled.div`
  ::selection {
    background-color: #3399ff; /* Highlight background color */
    color: #ffffff; /* Text color for highlighted text */
  }

  /* Editor container styles */
  .ck-editor__editable_inline {
    min-height: 200px; /* Ensure visible editor area */
    font-size: 16px; /* Adjust text size */
    color: #000; /* Default text color */
    background-color: #fff; /* Background color */
  }

  /* Optional: Style the toolbar */
  .ck-toolbar {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
  }
`;

function TextEditor({ item, onChange }) {
  return (
    <StyledEditorContainer>
      <CKEditor
        editor={ClassicEditor}
        data={item}
        onChange={onChange}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "fontFamily", // Font Family selector
            "fontSize", // Font Size selector
            "|",
            "alignment", // Text Alignment buttons (left, center, right)
            "numberedList",
            "bulletedList",
            "blockQuote",
            "|",
            "textColor", // Text color button
            "highlight", // Background color button
            "|",
            "link",
            "imageUpload",
            "|",
            "undo",
            "redo",
          ],
          placeholder: "Start typing here...",
          fontFamily: {
            options: [
              "default",
              "Arial",
              "Courier New",
              "Georgia",
              "Lucida Sans Unicode",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
          },
          fontSize: {
            options: [10, 12, 14, 16, 18, 20, 24, 36],
          },
          alignment: {
            options: ["left", "center", "right", "justify"],
          },
        }}
      />
    </StyledEditorContainer>
  );
}

export default TextEditor;
