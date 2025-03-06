import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBanner, uploadBannerMedia } from '../../Utils/bannerService';
import MessageBox from '../../Utils/message';

const CreateBanner = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
    setPreviewFiles(files.map(file => URL.createObjectURL(file)));
  };

  const handleRemoveMedia = (index) => {
    const updatedMediaFiles = [...mediaFiles];
    const updatedPreviewFiles = [...previewFiles];
    updatedMediaFiles.splice(index, 1);
    updatedPreviewFiles.splice(index, 1);
    setMediaFiles(updatedMediaFiles);
    setPreviewFiles(updatedPreviewFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || mediaFiles.length === 0) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      const mediaURLs = await uploadBannerMedia(mediaFiles);
      const newBanner = { name, description, media: mediaURLs };
      await addBanner(newBanner);
      setSuccessMessage('Banner created successfully');
      setTimeout(() => navigate('/banners/banner-list'), 2000);
    } catch (error) {
      setErrorMessage('Failed to create banner');
      console.error('Failed to create banner:', error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4 text-slate-600">Add New Banner</h1>
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
            <input
              type="file"
              id="media"
              multiple
              onChange={handleMediaChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {previewFiles.map((file, index) => (
                <div key={index} className="relative flex items-center mb-2">
                  <img src={file} alt="Preview" className="w-32 h-32 object-cover rounded" />
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
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Add Banner
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBanner;