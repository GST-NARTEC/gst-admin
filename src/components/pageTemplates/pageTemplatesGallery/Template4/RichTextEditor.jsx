import { memo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const defaultModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
    ],
  },
};

const RichTextEditor = memo(
  ({
    value,
    onChange,
    placeholder,
    isRTL = false,
    height = "120px",
    label,
  }) => {
    return (
      <div className="bg-white/95 rounded-xl p-2 shadow-lg h-[220px]">
        {label && <h3 className="text-lg font-semibold mb-2">{label}</h3>}
        <div style={{ height }}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            dir={isRTL ? "rtl" : "ltr"}
            modules={defaultModules}
            className={`h-full ${isRTL ? "![&_.ql-editor]:text-right" : ""}`}
            preserveWhitespace
          />
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
