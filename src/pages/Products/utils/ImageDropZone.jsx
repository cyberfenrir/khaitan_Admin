import { useState } from 'react';
import { Upload } from 'lucide-react';

const ImageDropZone = () => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.substr(0, 5) === "image") {
      setImage(URL.createObjectURL(file));
    } else {
      setImage(null);
    }
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