import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../../../Utils/message';
import { createMedia, deleteMedia } from '../../../services/mediaService';
import { getAllColors } from '../../../services/colorService';

const ImageDropZone = ({ onImageUpload, nextColor, productId, mode = "create" }) => {
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedMediaTypes, setSelectedMediaTypes] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [rows, setRows] = useState(1);
  const [disabledSaveButtons, setDisabledSaveButtons] = useState({});
  const [existingMedia, setExistingMedia] = useState([]);
  const [deletedMedia, setDeletedMedia] = useState([]);
  const navigate = useNavigate();

  // Available media types
  const mediaTypes = [
    { value: 'image/jpeg', label: 'JPG' },
    { value: 'image/png', label: 'PNG' },
    { value: 'video/mp4', label: 'MP4' }
  ];

  // Fetch colors on component mount
  useEffect(() => {
    const getColors = async () => {
      try {
        const colorsData = await getAllColors();
        if (colorsData.success) {
          setColors(colorsData.data);
        } else {
          console.error('Colors data is not an array:', colorsData);
        }
      } catch (error) {
        console.error('Failed to fetch colors:', error);
      }
    };

    getColors();
  }, []);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, index);
  };

  const handleSave = async (index) => {
    const actualProductId = productId || JSON.parse(localStorage.getItem('productData'))?.id;

    if (!actualProductId) {
      console.error('Product ID not found');
      setMessage('Product ID not found.');
      setMessageType('error');
      return;
    }

    const imageData = images[index];
    if (!imageData) {
      console.error('No image selected');
      setMessage('No image selected.');
      setMessageType('error');
      return;
    }

    if (!selectedColors[index]) {
      setMessage('Please select a color.');
      setMessageType('error');
      return;
    }

    // Get the selected media type or use the detected image type
    const mediaType = selectedMediaTypes[index] || imageData.imageType;
    if (!mediaType) {
      setMessage('Please select a media type.');
      setMessageType('error');
      return;
    }

    try {
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: true }));
      
      // Find the actual color ID from the color object, since selectedColors currently stores hexCode
      const selectedColor = colors.find(color => color.colorHex === selectedColors[index]);
      const colorId = selectedColor ? selectedColor.id : null;
      
      if (!colorId) {
        throw new Error('Color ID not found');
      }
      
      console.log("productId: ", actualProductId);
      console.log("colorId: ", colorId);
      console.log("ImageData: ", imageData.file);
      console.log("MediaType: ", mediaType);
      
      // Use createMedia service to upload the image
      const response = await createMedia(actualProductId, colorId, imageData.file, null, mediaType);
      if (response) {
        console.log('New media added successfully');
        setMessage('Media uploaded successfully.');
        setMessageType('success');
      } else {
        throw new Error('Failed to create media');
      }
      
      nextColor(selectedColors);
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
        // Preserve the mediaId if it's an existing image being replaced
        const mediaId = images[index]?.mediaId;
        
        setImages((prevImages) => ({ 
          ...prevImages, 
          [index]: { 
            filePath, 
            imageType, 
            file,
            ...(mediaId && { mediaId }),
            isExisting: false
          } 
        }));
        
        // Auto-select the media type based on file type
        setSelectedMediaTypes((prevTypes) => ({
          ...prevTypes,
          [index]: imageType
        }));
        
        if (onImageUpload) {
          onImageUpload({ filePath, imageType });
        }
      } else {
        setMessage('Please select a valid image or video file.');
        setMessageType('error');
      }
    } else {
      setImages((prevImages) => ({ ...prevImages, [index]: null }));
    }
  };

  const handleColorChange = (e, index) => {
    const colorId = e.target.value;
    setSelectedColors((prevColors) => ({ ...prevColors, [index]: colorId }));
  };

  const handleMediaTypeChange = (e, index) => {
    const mediaType = e.target.value;
    setSelectedMediaTypes((prevTypes) => ({ ...prevTypes, [index]: mediaType }));
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
      // Check for and mark media in the last row for deletion
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
        // Delete media using the service method
        const result = await deleteMedia(imageData.mediaId);
        
        if (result) {
          // Remove from state
          setImages((prev) => {
            const newImages = { ...prev };
            delete newImages[index];
            return newImages;
          });
          
          setSelectedColors((prev) => {
            const newColors = { ...prev };
            delete newColors[index];
            return newColors;
          });
          
          setSelectedMediaTypes((prev) => {
            const newTypes = { ...prev };
            delete newTypes[index];
            return newTypes;
          });
          
          setMessage('Media deleted successfully.');
          setMessageType('success');
        } else {
          throw new Error('Failed to delete media');
        }
      } catch (error) {
        console.error('Failed to delete media:', error);
        setMessage('Failed to delete media: ' + error.message);
        setMessageType('error');
      }
    } else {
      // Just remove from state if it's not saved yet
      setImages((prev) => {
        const newImages = { ...prev };
        delete newImages[index];
        return newImages;
      });
      
      setSelectedColors((prev) => {
        const newColors = { ...prev };
        delete newColors[index];
        return newColors;
      });
      
      setSelectedMediaTypes((prev) => {
        const newTypes = { ...prev };
        delete newTypes[index];
        return newTypes;
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
                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor={`color-${cellKey}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <div className="flex items-center gap-3">
                      <select
                        id={`color-${cellKey}`}
                        value={selectedColors[cellKey] || ''}
                        onChange={(e) => handleColorChange(e, cellKey)}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="" disabled>Select a color</option>
                        {colors.map((color) => (
                          <option key={color.id} value={color.colorHex}>
                            {color.colorName}
                          </option>
                        ))}
                      </select>
                      <div
                        className="w-12 h-8 border rounded"
                        style={{ backgroundColor: selectedColors[cellKey] || '#ffffff' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor={`mediaType-${cellKey}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Media Type
                    </label>
                    <select
                      id={`mediaType-${cellKey}`}
                      value={selectedMediaTypes[cellKey] || ''}
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
                  
                  <div className="flex justify-end mt-2">
                    <button
                      className={`bg-orange-500 text-white py-2 px-4 rounded-lg justify-center ${!images[cellKey] || !selectedColors[cellKey] || !selectedMediaTypes[cellKey] || disabledSaveButtons[cellKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleSave(cellKey)}
                      disabled={!images[cellKey] || !selectedColors[cellKey] || !selectedMediaTypes[cellKey] || disabledSaveButtons[cellKey]}
                    >
                      {images[cellKey]?.isExisting ? 'Update' : 'Save'}
                    </button>
                  </div>
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

      <div className='flex justify-center w-full mt-4'>
        <button className='bg-orange-500 text-white py-2 px-4 rounded-lg' onClick={() => navigate('/products/product-list')}>
          Go to Product List
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
  onImageUpload: PropTypes.func,
  nextColor: PropTypes.func.isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode: PropTypes.oneOf(['create', 'edit']),
};

export default ImageDropZone;