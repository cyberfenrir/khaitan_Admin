import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BannersTable from './BannerTable';
import { deleteBanner, getAllBanners } from '../../Utils/bannerService';
import MessageBox from '../../Utils/message';

const BannersPage = () => {
  const [bannersData, setBannersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      const result = await getAllBanners();
      if (result.success) {
        setBannersData(result.data);
      } else {
        setErrorMessage(result.error);
        console.error(result.error);
      }
    };

    fetchBanners();
  }, []);

  const handleEditBanner = (bannerId) => {
    navigate(`/banners/edit/${bannerId}`);
  };

  const handleDeleteBanner = async (bannerId) => {
    const result = await deleteBanner(bannerId);
    if (result.success) {
      setBannersData(bannersData.filter(banner => banner.id !== bannerId));
      setSuccessMessage('Banner deleted successfully');
    } else {
      setErrorMessage(result.error);
      console.error(result.error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center p-5 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-700">All Banners List</h1>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            onClick={() => navigate('/banners/create')}
          >
            Add Banner
          </button>
        </header>
        {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
        {successMessage && <MessageBox message={successMessage} type="success" onClose={() => setSuccessMessage('')} />}
        <BannersTable
          bannersList={bannersData}
          onEditBanner={handleEditBanner}
          onDeleteBanner={handleDeleteBanner}
        />
      </div>
    </section>
  );
};

export default BannersPage;