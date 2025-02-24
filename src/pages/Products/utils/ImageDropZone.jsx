import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, addMedia, getAllColors } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';

const ImageDropZone = ({ onImageUpload, nextColor }) => {
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [rows, setRows] = useState(1);
  const [disabledSaveButtons, setDisabledSaveButtons] = useState({});
  const navigate = useNavigate();

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

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, index);
  };

  const handleSave = async (index) => {
    const ProductData = JSON.parse(localStorage.getItem('productData'));
    const productId = ProductData?.productId;

    if (!productId) {
      console.error('Product ID not found');
      return;
    }

    const imageData = images[index];
    if (!imageData) {
      console.error('No image selected');
      return;
    }

    try {
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: true }));
      const downloadURL = await uploadImageToStorage(imageData.file);
      const mediaData = {
        productId,
        colorId: selectedColors[index],
        imageUrl: downloadURL,
      };
      const response = await addMedia(mediaData);
      console.log('Media uploaded:', response);
      nextColor(selectedColors);
      setMessage('Image uploaded successfully.');
      setMessageType('success');
    } catch (error) {
      console.error('Failed to upload media:', error);
      setMessage('Failed to upload media.');
      setMessageType('error');
      setDisabledSaveButtons((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleFile = (file, index) => {
    if (file && file.type.substr(0, 5) === "image") {
      const filePath = URL.createObjectURL(file);
      const imageType = file.type;
      setImages((prevImages) => ({ ...prevImages, [index]: { filePath, imageType, file } }));
      if (onImageUpload) {
        onImageUpload({ filePath, imageType });
      }
    } else {
      setImages((prevImages) => ({ ...prevImages, [index]: null }));
    }
  };

  const handleColorChange = (e, index) => {
    const color = e.target.value;
    setSelectedColors((prevColors) => ({ ...prevColors, [index]: color }));
  };

  const handleCloseMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const handleAddNewRow = () => {
    setRows(rows + 1);
  };
  
  const handleDeleteRow = () => {
    setRows(rows - 1);
  }

  return (
    <div className='p-4 flex flex-col space-y-8'>
      {[...Array(rows).keys()].map((n1) => (
        <div className='grid grid-cols-3 gap-4' key={n1}>

          {[...Array(3).keys()].map((n) => (
            
            <div className='flex flex-col' key={n}>

              <div 
                className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                onDrop={(e) => handleDrop(e, `${n1}-${n}`)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById(`fileInput-${n1}-${n}`).click()}
              >
                <input
                  id={`fileInput-${n1}-${n}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0], `${n1}-${n}`)}
                  accept="image/*"
                />
                {images[`${n1}-${n}`] ? (
                  <img src={images[`${n1}-${n}`].filePath} alt="Uploaded" className="max-w-full max-h-full object-contain" />
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
                <label htmlFor={`color-${n1}-${n}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id={`color-${n1}-${n}`}
                    value={selectedColors[`${n1}-${n}`] || ''}
                    onChange={(e) => handleColorChange(e, `${n1}-${n}`)}
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
                    style={{ backgroundColor: selectedColors[`${n1}-${n}`] || '#ffffff' }}
                  ></div>
                  
                  <div className="flex justify-end w-[55%] px-3">
                    <button
                      className={`bg-orange-500 text-white py-2 px-4 rounded-lg justify-center ${disabledSaveButtons[`${n1}-${n}`] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleSave(`${n1}-${n}`)}
                      disabled={disabledSaveButtons[`${n1}-${n}`]}
                    >
                      Save
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
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
};

export default ImageDropZone;