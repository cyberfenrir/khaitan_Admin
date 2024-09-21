import PropTypes from 'prop-types';
import './menuitem.module.css';

function MenuItem({ icon, label, active = false, hasSubmenu = false }) {
  return (
    <li className={`menuItem ${active ? 'active' : ''}`}>
      <a href="#" className="menuLink">
        <span className="iconWrapper">
          <img src={icon} alt={label} className="icon" />
        </span>
        <span className="label">{label}</span>
        {hasSubmenu && (
          <span className="submenuIndicator">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/04b70dedfdb417888214a31557a54e6533880157c567970a82f64da8cfe97045?apiKey=5dee21b4f50742c9b5c16494a624cb30&" 
              alt="Submenu indicator" 
              className="submenuIcon" 
            />
          </span>
        )}
      </a>
    </li>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  hasSubmenu: PropTypes.bool,
};

export default MenuItem;
