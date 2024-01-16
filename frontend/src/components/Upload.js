import React, { useState } from 'react';
import './Upload.css';

const FileInfo = ({ uploadedInfo }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info_key">{key}</span>
        <span className="info_value">{value}</span>
      </li>
    ))}
  </ul>
);

const UploadBox = ({onImageUpload}) => {
  const [uploadedInfo, setUploadedInfo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isActive, setActive] = useState(false);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type });

    
    if (type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onImageUpload(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      setFileInfo(file);
    }
  };

  const handleUpload = ({ target }) => {
    const file = target.files[0];
  
    if (!file) {
      setUploadedInfo(null);
      setImagePreview(null);
      onImageUpload(null);
      return;
    }
  
    setFileInfo(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <label
      className={`preview${isActive ? ' active' : ''}`}
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" className="file" onChange={handleUpload} />

      {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}

      {imagePreview && (
        <div className="image_preview">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      {!uploadedInfo && !imagePreview && (
        <>
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드랍하세요.</p>
          <p className="preview_desc">파일당 최대 3MB</p>
        </>
      )}
    </label>
  );
};

export default UploadBox;
