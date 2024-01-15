import React, {useState, useEffect} from 'react';
import Imageread from '../toolcomponents/Imageread';
import './Upload.css';


const FileInfo = ({uploadedInfo}) => (
    <ul className = "preview_info">
        {Object.entries(uploadedInfo).map(([key, value]) => (
            <li key = {key}>
                <span className = "info_key">{key}</span>
                <span className = "info_value">{value}</span>
            </li>
        ))}
    </ul>
);

const UploadBox = () => {


    const [uploadedInfo, setUploadedInfo] = useState(null);
    const setFileInfo = (file) => {
        const {name, size: byteSize, type} = file;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({name, size, type});
    }

    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        setFileInfo(file);
        
        var imageUrl = Imageread(file);
        setActive(false);
    }

    const handleUpload = ({target}) => {
        const file = target.files[0];
        setFileInfo(file);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <label className = {`preview${isActive ? 'active' : ''}`}
            onDragEnter = {handleDragStart}
            onDragLeave = {handleDragEnd}
            onDragOver = {handleDragOver}
            onDrop = {handleDrop}
        >
            <input type = "file" className = "file" onChange = {handleUpload}/>
            
            {uploadedInfo && <FileInfo {...uploadedInfo} />}

            {!uploadedInfo && (
                <>
                    <p className = "preview_msg">클릭 혹은 파일을 이곳에 드랍하세요.</p>
                    <p className = "preview_desc">파일당 최대 3MB</p>  
                </>
            )}
        </label>
    );
};

export default UploadBox

