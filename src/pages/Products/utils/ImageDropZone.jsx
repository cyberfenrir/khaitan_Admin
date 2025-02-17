import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, addMedia, getAllColors } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';

const ImageDropZone = ({ onImageUpload, nextColor }) => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState({ filePath: '', imageType: '' });
  const [colors, setColors] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSave = async () => {
    const ProductData = JSON.parse(localStorage.getItem('productData'));
    const productId = ProductData?.productId;

    if (!productId) {
      console.error('Product ID not found');
      return;
    }

    if (!imageData.filePath) {
      console.error('No image selected');
      return;
    }

    try {
      const downloadURL = await uploadImageToStorage(imageData.file);
      const mediaData = {
        productId,
        colorId: selectedColor,
        imageUrl: downloadURL,
      };
      const response = await addMedia(mediaData);
      console.log('Media uploaded:', response);
      nextColor(selectedColor);
      setMessage('Product created successfully.');
      setMessageType('success');
      navigate('/products/product-list', { replace: true });
    } catch (error) {
      console.error('Failed to upload media:', error);
      setMessage('Failed to upload media.');
      setMessageType('error');
    }
  };

  const handleFile = (file) => {
    if (file && file.type.substr(0, 5) === "image") {
      const filePath = URL.createObjectURL(file);
      const imageType = file.type;
      setImage(filePath);
      setImageData({ filePath, imageType, file });
      if (onImageUpload) {
        onImageUpload({ filePath, imageType });
      }
    } else {
      setImage(null);
      setImageData({ filePath: '', imageType: '' });
    }
  };

  const handleCloseMessage = () => {
    setMessage('');
    setMessageType('');
  };

  return (
    <div>
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

      <div className="mt-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="flex items-center gap-3">
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
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
            style={{ backgroundColor: selectedColor }}
          ></div>
          
          <div className="flex justify-end w-[55%] px-3 pt-6">
            <button className="bg-orange-500 text-white py-2 px-4 rounded-lg justify-center w-1/4" onClick={handleSave}>
              Save
            </button>
         </div>

        </div>
      </div>

      {message && (
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