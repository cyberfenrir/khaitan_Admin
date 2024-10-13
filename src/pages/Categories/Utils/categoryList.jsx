import PropTypes from 'prop-types';
import CategoryCard from './Card';

const categories = [
  { title: 'Fans', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c9d2ca881fff3e9e09411e5d78242e60a58924fc4bf25b70f7b40a4b18acdbe7?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30', bgColor: 'bg-zinc-200' },
  { title: 'Geysers', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6c398e37bc927a09d23a279f0ea00c872fb6539dd21353894cd12087d08b08c?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30', bgColor: 'bg-orange-100' },
  { title: 'Lights', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c3fb3d77a71b090f6a28f142f8b26a703e153b9362613cebfbb4c1deee61f974?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30', bgColor: 'bg-orange-100' },
  { title: 'Pump', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8d3d817d2ac0395c903f09d514bc38d0893399b13afff22c0b2b6f4c538b09fe?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30', bgColor: 'bg-sky-100' }
];

const CategoryGrid = () => {
  return (
    <section className="flex flex-wrap">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          imageSrc={category.imageSrc}
          bgColor={category.bgColor}
        />
      ))}
    </section>
  );
};

CategoryGrid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      bgColor: PropTypes.string
    })
  )
};

CategoryGrid.defaultProps = {
  categories: []
};

export default CategoryGrid;
