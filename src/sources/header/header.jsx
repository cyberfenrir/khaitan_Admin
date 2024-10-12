import PropTypes from 'prop-types';
import sleep from '../../assets/icons/sleep.svg';
import settings from '../../assets/icons/settigs.svg';
import time from '../../assets/icons/time.svg';
import profile from '../../assets/icons/profile.png';

const Header = () => {
  const icons = [
    { src: sleep, alt: "Icon 1" },
    { src: settings, alt: "Icon 2" },
    { src: time, alt: "Icon 3" },
    { src: profile, alt: "User profile" },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-bold leading-none uppercase text-slate-500">
        <span className="p-2 rounded-[36px]">Welcome!</span>
      </h1>
      <nav className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          {icons.map((icon, index) => (
            <IconButton key={index} src={icon.src} alt={icon.alt} />
          ))}
          <div className="relative flex items-center">
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-red-400 rounded-full text-white text-xs">
              3
            </div>
          </div>
        </div>
        <SearchBar />
      </nav>
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

const IconButton = ({ src, alt }) => {
  return (
    <button className="flex justify-center items-center w-10 min-h-[40px]">
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
