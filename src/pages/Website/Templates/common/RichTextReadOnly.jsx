import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextReadOnly({
  value,
  className = "",
  isArabic = false,
  textColor = "text-gray-700",
  fontSize = "text-base",
  isWhiteText = false,
}) {
  const baseClasses = `font-dubai prose max-w-none [&_.ql-editor]:p-0 [&_.ql-container]:border-0 [&_.ql-editor_h1]:text-4xl [&_.ql-editor_h2]:text-3xl [&_.ql-editor_h3]:text-2xl [&_.ql-editor_p]:text-base [&_.ql-editor]:${fontSize}`;

  const directionClasses = isArabic
    ? "leading-[1.6] tracking-normal [&_.ql-editor]:text-right"
    : "[&_.ql-editor]:text-left";

  const colorClasses = isWhiteText
    ? "[&_.ql-editor]:text-white [&_.ql-editor_h1]:text-white [&_.ql-editor_h2]:text-white [&_.ql-editor_h3]:text-white [&_.ql-editor_p]:text-white"
    : "";

  const combinedClasses = `${baseClasses} ${directionClasses} ${colorClasses} ${textColor} ${className}`;

  return (
    <ReactQuill
      value={value || ""}
      readOnly={true}
      theme="bubble"
      className={combinedClasses}
    />
  );
}

export default RichTextReadOnly;
