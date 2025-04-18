import { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../../Utils/message';
import { createMedia, deleteMedia, getAllMedias } from '../../services/mediaService';

const ImageDropZone = ({ utilityName, onSave }) => {
  const [images, setImages] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [rows, setRows] = useState(1);
  const [disabledSaveButtons, setDisabledSaveButtons] = useState({});
  const navigate = useNavigate();
  const [deletedMedia, setDeletedMedia] = useState([]);

  const mediaTypes = [
    { value: 'image/jpeg', label: 'JPG' },
    { value: 'image/png', label: 'PNG' },
    { value: 'video/mp4', label: 'MP4' }
  ];

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, index);
  };

  const handleSave = async (index) => {
    const productId = images[index]?.productId || null;
    const imageData = images[index];

    try {
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: true }));
      
      const mediaOptions = {
        utilityName: utilityName || "",
        productId: productId || null,
        colorId: null
      };
      
      const mediaResponse = await createMedia(
        mediaOptions.productId, 
        mediaOptions.colorId, 
        imageData.file, 
        mediaOptions.utilityName,
        imageData.mediaType || imageData.imageType // Send the selected media type to createMedia
      );
      
      const utilityData = {
        productId: productId ? Number(productId) : null,
        url: mediaResponse.url || mediaResponse.path,
        utility: utilityName || null,
        mediaId: mediaResponse.id || mediaResponse._id,
        mediaType: imageData.mediaType || imageData.imageType
      };

      setMessage('Media saved successfully.');
      setMessageType('success');
      onSave(utilityData);
    } catch (error) {
      console.error('Failed to save media:', error);
      setMessage('Failed to save media: ' + error.message);
      setMessageType('error');
    } finally {
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleFile = (file, index) => {
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      
      if (isImage || isVideo) {
        const filePath = URL.createObjectURL(file);
        const imageType = file.type;
        const mediaId = images[index]?.mediaId;
        const productId = images[index]?.productId;
        const mediaType = images[index]?.mediaType || imageType;
        
        setImages((prevImages) => ({ 
          ...prevImages, 
          [index]: { 
            filePath, 
            imageType, 
            mediaType,
            file,
            ...(mediaId && { mediaId }),
            ...(productId && { productId }),
            isExisting: false
          } 
        }));
      } else {
        setMessage('Please select a valid image or video file.');
        setMessageType('error');
      }
    } else {
      setImages((prevImages) => ({ ...prevImages, [index]: null }));
    }
  };

  const handleProductIdChange = (e, index) => {
    const productId = e.target.value || '';  // Allow empty string for optional productId
    setImages((prevImages) => ({
      ...prevImages,
      [index]: {
        ...prevImages[index],
        productId,
      },
    }));
  };

  const handleMediaTypeChange = (e, index) => {
    const mediaType = e.target.value;
    setImages((prevImages) => ({
      ...prevImages,
      [index]: {
        ...prevImages[index],
        mediaType,
      },
    }));
  };

  const handleCloseMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const handleAddNewRow = () => {
    setRows(rows + 1);
  };
  
  const handleDeleteRow = () => {
    if (rows > 1) {
      const startIndex = (rows - 1) * 3;
      for (let i = 0; i < 3; i++) {
        const cellKey = `${rows - 1}-${i}`;
        if (images[cellKey]?.mediaId) {
          setDeletedMedia((prev) => [...prev, images[cellKey].mediaId]);
        }
      }
      setRows(rows - 1);
    }
  };

  const handleDeleteImage = async (index) => {
    const imageData = images[index];
    
    if (imageData?.mediaId) {
      try {
        // Use deleteMedia from service
        await deleteMedia(imageData.mediaId);
        console.log('Media deleted:', imageData.mediaId);
        
        setImages((prev) => {
          const newImages = { ...prev };
          delete newImages[index];
          return newImages;
        });
      } catch (error) {
        console.error('Failed to delete media:', error);
        setMessage('Failed to delete media.');
        setMessageType('error');
      }
    } else {
      setImages((prev) => {
        const newImages = { ...prev };
        delete newImages[index];
        return newImages;
      });
    }
  };

  return (
    <div className='p-4 flex flex-col space-y-8'>
      {[...Array(rows).keys()].map((n1) => (
        <div className='grid grid-cols-3 gap-4' key={n1}>
          {[...Array(3).keys()].map((n) => {
            const cellKey = `${n1}-${n}`;
            return (
              <div className='flex flex-col' key={cellKey}>
                <div 
                  className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                  onDrop={(e) => handleDrop(e, cellKey)}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById(`fileInput-${cellKey}`).click()}
                >
                  <input
                    id={`fileInput-${cellKey}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0], cellKey)}
                    accept="image/*,video/mp4"
                  />
                  {images[cellKey] ? (
                    <>
                      {images[cellKey].imageType.startsWith('image/') ? (
                        <img src={images[cellKey].filePath} alt="Uploaded" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <video src={images[cellKey].filePath} className="max-w-full max-h-full object-contain" controls />
                      )}
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(cellKey);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <div>
                        <p className="text-gray-500 font-bold">
                          Drop your media here or <span className="text-orange-500 font-bold">click to browse</span>
                        </p>
                        <p className="text-gray-400 text-sm">
                          Supported formats: JPG, PNG, MP4
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`productId-${cellKey}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Product ID (optional)
                    </label>
                    <input
                      id={`productId-${cellKey}`}
                      type="text"
                      value={images[cellKey]?.productId || ''}
                      onChange={(e) => handleProductIdChange(e, cellKey)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter Product ID"
                    />
                  </div>
                  <div>
                    <label htmlFor={`mediaType-${cellKey}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Media Type
                    </label>
                    <select
                      id={`mediaType-${cellKey}`}
                      value={images[cellKey]?.mediaType || ''}
                      onChange={(e) => handleMediaTypeChange(e, cellKey)}
                      className="w-full p-2 border border-gray-300 rounded"
                      disabled={!images[cellKey]}
                    >
                      <option value="" disabled>Select type</option>
                      {mediaTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    className={`bg-orange-500 text-white py-2 px-4 rounded-lg justify-center ${!images[cellKey] || disabledSaveButtons[cellKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleSave(cellKey)}
                    disabled={!images[cellKey] || disabledSaveButtons[cellKey]}
                  >
                    {images[cellKey]?.isExisting ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className='flex justify-between w-full'>
        <button className='bg-orange-700 text-white py-2 px-4 rounded-lg justify-center' onClick={handleAddNewRow}>+ Add Row</button>
        <button
          className={`bg-orange-700 text-white py-2 px-4 rounded-lg justify-center ${rows === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleDeleteRow}
          disabled={rows === 1}
        >
          - Delete Row
        </button>
      </div>
      
      {message && messageType && (
        <div className="mt-4">
          <MessageBox message={message} type={messageType} onClose={handleCloseMessage} />
        </div>
      )}
    </div>
  );
};

ImageDropZone.propTypes = {
  utilityName: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default ImageDropZone;