import React from "react";

export const FileUploader = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="form-group">
      <input type="file" onChange={handleFileInput} className="form-control" />
    </div>
  );
};
