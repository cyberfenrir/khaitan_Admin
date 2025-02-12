import PropTypes from 'prop-types';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import sleep from '../../assets/icons/sleep.svg';
import settings from '../../assets/icons/settigs.svg';
import time from '../../assets/icons/time.svg';
import profile from '../../assets/icons/profile.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Header = () => {
  const icons = [
    { src: sleep, alt: "Icon 1" },
    { src: settings, alt: "Icon 2" },
    { src: time, alt: "Icon 3" },
  ];

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { isAuthenticated } = useAuth();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      navigate('/login');
      await signOut(auth);
      localStorage.clear(); // Optional: Clear any saved data
      closeModal();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Function to open the confirmation modal
  const handleProfileClick = () => {
    if (!isAuthenticated) {
      alert('please login first');
      return <Navigate to="/login" />;
    }
    setShowLogoutModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-bold leading-none uppercase text-slate-500">
        <span className="p-2 rounded-[36px]">Welcome!</span>
      </h1>
      <nav className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          {icons.map((icon, index) => (
            <div key={index} className="relative">
              <IconButton src={icon.src} alt={icon.alt} />
            </div>
          ))}
          <div className="relative">
            <IconButton src={profile} alt="Profile" onClick={handleProfileClick} />
            <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-400 rounded-full text-white text-xs">
              3
            </div>
          </div>
        </div>
        <SearchBar />
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center pl-3">
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="px-6 py-2 rounded-lg bg-stone-200 text-slate-500 w-[240px]"
        aria-label="Search"
      />
      <div className="flex absolute inset-y-2 left-2">
        <img
          loading="lazy"
          src="./src/assets/icons/search.svg"
          alt=""
          className="object-contain w-5"
        />
      </div>
    </div>
  );
};

const IconButton = ({ src, alt, onClick }) => {
  return (
    <button className="flex justify-center items-center w-10 min-h-[40px]" onClick={onClick}>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="object-contain w-6 aspect-square"
      />
    </button>
  );
};

// PropTypes definitions
IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Header.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

export default Header;
