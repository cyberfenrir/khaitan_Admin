import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBannerById, editBanner, uploadBannerMedia } from '../../Utils/bannerService';
import MessageBox from '../../Utils/message';

const EditBanner = () => {
  const { bannerId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [newMediaFiles, setNewMediaFiles] = useState([]);
  const [originalData, setOriginalData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      console.log('Fetching banner details for bannerId:', bannerId);
      const result = await getBannerById(bannerId);
      console.log('Fetched banner data:', result);
      if (result) {
        setName(result.name);
        setDescription(result.description);
        setMediaFiles(result.media || []);
        setOriginalData(result);
      } else {
        setErrorMessage('Failed to fetch banner details');
      }
    };

    fetchBanner();
  }, [bannerId]);

  const handleRemoveMedia = (index) => {
    const updatedMediaFiles = [...mediaFiles];
    updatedMediaFiles.splice(index, 1);
    setMediaFiles(updatedMediaFiles);
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || (mediaFiles.length === 0 && newMediaFiles.length === 0)) {
      setErrorMessage('Please fill all fields');
      return;
    }

    if (
      name === originalData.name &&
      description === originalData.description &&
      mediaFiles === originalData.media &&
      newMediaFiles.length === 0
    ) {
      setErrorMessage('No changes made');
      return;
    }

    try {
      const updatedBanner = { name, description, media: mediaFiles };
      await editBanner(bannerId, updatedBanner, newMediaFiles);
      setSuccessMessage('Banner updated successfully');
      setTimeout(() => navigate('/banners/banner-list'), 2000);
    } catch (error) {
      setErrorMessage('Failed to update banner');
      console.error('Failed to update banner:', error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4 text-slate-600">Edit Banner</h1>
        {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
        {successMessage && <MessageBox message={successMessage} type="success" onClose={() => setSuccessMessage('')} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Banner Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="media" className="block text-sm font-medium text-gray-700 mb-1">
              Media Files
            </label>
            <div className="flex flex-wrap gap-2">
              {mediaFiles && mediaFiles.length > 0 && mediaFiles.map((media, index) => (
                <div key={index} className="relative flex items-center mb-2">
                  <img src={typeof media === 'string' ? media : URL.createObjectURL(media)} alt="Current Media" className="w-32 h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(index)}
                    className="ml-2 bg-red-500 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              id="media"
              multiple
              onChange={handleMediaChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Update Banner
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditBanner;
