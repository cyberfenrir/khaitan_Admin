import { useState } from 'react';
import { Upload } from 'lucide-react';
import AWS from 'aws-sdk';

const ImageDropZone = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState({ filePath: '', fileType: '' });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.substr(0, 5) === "image") {
      setImage(URL.createObjectURL(file));
      setFileInfo({ filePath: file.name, fileType: file.type });
      uploadToS3(file);
    } else {
      setImage(null);
      setFileInfo({ filePath: '', fileType: '' });
    }
  };

  const uploadToS3 = (file) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully:', data);
        if (onUpload) {
          onUpload(data.Location, file.type);
        }
      }
    });
  };

  return (
    <div 
      className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
        accept="image/*"
      />
      {image ? (
        <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain" />
      ) : (
        <>
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <div>
            <p className="text-gray-500 font-bold">
                Drop your images here or <span className="text-orange-500 font-bold">click to browse</span>
            </p>
            <p className="text-gray-400 text-sm">
                Supported formats: JPG, PNG, GIF
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageDropZone;