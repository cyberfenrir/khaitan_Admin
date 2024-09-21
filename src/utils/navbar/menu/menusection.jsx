import PropTypes from 'prop-types';
import './menusection.module.css';
import MenuItem from './menuitem';

function MenuSection({ title, items }) {
  return (
    <section className="menuSection">
      <h2 className="sectionTitle">{title}</h2>
      <ul className="menuList">
        {items.map((item, index) => (
          <MenuItem key={item.id || index} {...item} />
        ))}
      </ul>
    </section>
  );
}

MenuSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuSection;
