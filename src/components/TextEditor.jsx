import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css"; // Import your custom CSS file

function TextEditor({ item, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  return (
    <div className="text-editor-container">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={item}
        onChange={onChange}
        className="text-editor"
      />
    </div>
  );
}

export default TextEditor;
