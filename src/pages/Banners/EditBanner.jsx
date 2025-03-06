import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBannerById, editBanner, uploadBannerMedia } from '../../Utils/bannerService';
import MessageBox from '../../Utils/message';

const EditBanner = () => {
  const { bannerId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [originalData, setOriginalData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isMediaRemoved, setIsMediaRemoved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      console.log('Fetching banner details for bannerId:', bannerId);
      const result = await getBannerById(bannerId);
      console.log('Fetched banner data:', result);
      if (result) {
        setName(result.name);
        setDescription(result.description);
        setMedia(result.media);
        setOriginalData(result);
      } else {
        setErrorMessage('Failed to fetch banner details');
      }
    };

    fetchBanner();
  }, [bannerId]);

  const handleRemoveMedia = () => {
    setMedia(null);
    setIsMediaRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || (!media && !isMediaRemoved)) {
      setErrorMessage('Please fill all fields');
      return;
    }

    if (
      name === originalData.name &&
      description === originalData.description &&
      media === originalData.media &&
      !isMediaRemoved
    ) {
      setErrorMessage('No changes made');
      return;
    }

    try {
      let mediaURL = media;
      if (isMediaRemoved || (media && typeof media !== 'string')) {
        mediaURL = media ? await uploadBannerMedia(media) : '';
        setMedia(mediaURL); // Update the media state with the new URL
      }
      const updatedBanner = { name, description, media: mediaURL };
      await editBanner(bannerId, updatedBanner);
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
              Media File
            </label>
            {media && typeof media === 'string' && !isMediaRemoved ? (
              <div className="relative flex items-center">
                <img src={media} alt="Current Media" className="w-32 h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={handleRemoveMedia}
                  className="ml-2 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="media"
                onChange={(e) => setMedia(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            )}
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
