import React, { useState } from 'react';
import './Upload.css';
import { ProgressbarImage } from './ProgressbarImage';

const FileInfo = ({ uploadedInfo }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <h1 className="info-text">{key}</h1>
        <h1 className="info-subtext">{value}</h1>
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
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'MB';
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

    <div className = "contents">

        <div className = "progress_bar">
            <ProgressbarImage state = {2}/>
        </div>

      <h1 className = "image_text">
          이미지를 업로드하세요.
      </h1>

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
          {/* <img src={imagePreview} alt="Preview" /> */}
          <h1 className = "info-text">사진이 잘 들어왔어요!</h1>
          <h1 className="info-subtext">다른 사진을 넣고 싶다면 클릭하기</h1>
        </div>
      )}

      {!uploadedInfo && !imagePreview && (
        <>
          <h1 className="info-text">클릭 혹은 파일을 이곳에 드랍하세요.</h1>
          <h1 className="info-subtext">(파일당 최대 3MB)</h1>
        </>
      )}
    </label>
    </div>
  );
};

export default UploadBox;
