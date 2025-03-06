import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, addMedia, getAllColors, deleteMedia, getMediaByProductId } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';
// import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
// import firebase from '../../../Utils/firebase'; // Adjust import path as necessary

const ImageDropZone = ({ onImageUpload, nextColor, productId, mode = "create" }) => {
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [rows, setRows] = useState(1);
  const [disabledSaveButtons, setDisabledSaveButtons] = useState({});
  const [existingMedia, setExistingMedia] = useState([]);
  const [deletedMedia, setDeletedMedia] = useState([]);
  const navigate = useNavigate();

  // Fetch colors on component mount
  useEffect(() => {
    const getColors = async () => {
      try {
        const colorsData = await getAllColors();
        if (Array.isArray(colorsData?.data)) {
          console.log('Colors:', colorsData?.data);
          setColors(colorsData?.data);
        } else {
          console.error('Colors data is not an array:', colorsData);
        }
      } catch (error) {
        console.error('Failed to fetch colors:', error);
      }
    };

    getColors();
  }, []);

  // Fetch existing media if in edit mode
  useEffect(() => {
    if (mode === "edit" && productId) {
      fetchExistingMedia(productId);
    }
  }, [mode, productId]);

  // Get all media for a specific product
  

  // Update existing media document
  const updateMedia = async (mediaId, mediaData) => {
    const mediaRef = collection(firebase, 'media');
    const mediaQuery = query(mediaRef, where("id", "==", mediaId));
    
    try {
      const querySnapshot = await getDocs(mediaQuery);
      
      if (querySnapshot.empty) {
        return { success: false, error: "Media not found" };
      }
      
      const mediaDocRef = querySnapshot.docs[0].ref;
      await updateDoc(mediaDocRef, mediaData);
      
      return { success: true };
    } catch (e) {
      console.error("Error updating media document: ", e);
      return { error: "Error updating media document." };
    }
  };

  const fetchExistingMedia = async (productId) => {
    try {
      const mediaData = await getMediaByProductId(productId);
      if (Array.isArray(mediaData?.data) && mediaData.data.length > 0) {
        console.log('Existing Media:', mediaData?.data);
        setExistingMedia(mediaData?.data);
        
        // Calculate number of rows needed
        const totalItems = mediaData?.data.length;
        const requiredRows = Math.ceil(totalItems / 3);
        setRows(requiredRows > 0 ? requiredRows : 1);
        
        // Map existing media to the grid
        const imageMap = {};
        const colorMap = {};
        
        mediaData?.data.forEach((media, index) => {
          const rowIndex = Math.floor(index / 3);
          const colIndex = index % 3;
          const cellKey = `${rowIndex}-${colIndex}`;
          
          imageMap[cellKey] = { 
            filePath: media.imageUrl, 
            imageType: 'image/*',
            mediaId: media.id,
            isExisting: true
          };
          
          colorMap[cellKey] = media.colorId;
        });
        
        setImages(imageMap);
        setSelectedColors(colorMap);
      } else {
        console.log('No existing media found for product ID:', productId);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
      setMessage('Failed to load existing media.');
      setMessageType('error');
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, index);
  };

  const handleSave = async (index) => {
    const actualProductId = productId || JSON.parse(localStorage.getItem('productData'))?.productId;

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

    try {
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: true }));
      
      // If it's an existing image that hasn't changed, just update the color if needed
      if (imageData.isExisting && !imageData.file) {
        const mediaData = {
          productId: Number(actualProductId),
          colorId: selectedColors[index],
          imageUrl: imageData.filePath,
        };
        
        if (imageData.mediaId) {
          // Update existing media
          const response = await updateMedia(imageData.mediaId, mediaData);
          if (response.success) {
            console.log('Media updated successfully');
            setMessage('Image updated successfully.');
            setMessageType('success');
          } else {
            throw new Error(response.error || 'Failed to update media');
          }
        }
      } else {
        // Upload new image
        const downloadURL = await uploadImageToStorage(imageData.file);
        const mediaData = {
          productId: Number(actualProductId),
          colorId: selectedColors[index],
          imageUrl: downloadURL,
        };
        
        if (imageData.mediaId) {
          // Update existing media with new image
          const response = await updateMedia(imageData.mediaId, mediaData);
          if (response.success) {
            console.log('Media updated with new image');
            setMessage('Image updated successfully.');
            setMessageType('success');
          } else {
            throw new Error(response.error || 'Failed to update media');
          }
        } else {
          // Add new media
          const response = await addMedia(mediaData);
          console.log('New media added:', response);
          setMessage('Image uploaded successfully.');
          setMessageType('success');
        }
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
    if (file && file.type.substr(0, 5) === "image") {
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
      
      if (onImageUpload) {
        onImageUpload({ filePath, imageType });
      }
    } else if (file) {
      setMessage('Please select an image file.');
      setMessageType('error');
    } else {
      setImages((prevImages) => ({ ...prevImages, [index]: null }));
    }
  };

  const handleColorChange = (e, index) => {
    const colorId = e.target.value;
    setSelectedColors((prevColors) => ({ ...prevColors, [index]: colorId }));
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
        // Using Firebase directly to delete the document
        const mediaRef = collection(firebase, 'media');
        const mediaQuery = query(mediaRef, where("id", "==", imageData.mediaId));
        const mediaSnapshot = await getDocs(mediaQuery);
        
        if (!mediaSnapshot.empty) {
          const mediaDocRef = mediaSnapshot.docs[0].ref;
          await deleteDoc(mediaDocRef);
          console.log('Media deleted:', imageData.mediaId);
        }
        
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
        
        setMessage('Image deleted successfully.');
        setMessageType('success');
      } catch (error) {
        console.error('Failed to delete media:', error);
        setMessage('Failed to delete media.');
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
                    accept="image/*"
                  />
                  {images[cellKey] ? (
                    <>
                      <img src={images[cellKey].filePath} alt="Uploaded" className="max-w-full max-h-full object-contain" />
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
                          Drop your images here or <span className="text-orange-500 font-bold">click to browse</span>
                        </p>
                        <p className="text-gray-400 text-sm">
                          Supported formats: JPG, PNG, GIF
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4">
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
                        <option key={color.id} value={color.hexCode}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="w-12 h-8 border rounded"
                      style={{ backgroundColor: selectedColors[cellKey] || '#ffffff' }}
                    ></div>
                    
                    <div className="flex justify-end w-[55%] px-3">
                      <button
                        className={`bg-orange-500 text-white py-2 px-4 rounded-lg justify-center ${!images[cellKey] || !selectedColors[cellKey] || disabledSaveButtons[cellKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleSave(cellKey)}
                        disabled={!images[cellKey] || !selectedColors[cellKey] || disabledSaveButtons[cellKey]}
                      >
                        {images[cellKey]?.isExisting ? 'Update' : 'Save'}
                      </button>
                    </div>
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
