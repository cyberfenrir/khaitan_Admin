import PropTypes from 'prop-types';

const CategoryCard = ({ imageSrc, title, bgColor }) => {
  return (
    <div className="flex flex-col flex-1 px-3 basis-0">
      <div className="flex flex-col justify-center w-full bg-white rounded-xl shadow-sm">
        <div className="flex flex-col flex-1 p-6 max-md:px-5">
          <div className={`flex justify-center items-center w-full rounded-xl ${bgColor} p-6`}>
            <img loading="lazy" src={imageSrc} alt={`${title} icon`} className="object-contain w-24" />
          </div>
          <h2 className="mt-6 text-lg font-semibold text-center text-slate-700">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};

CategoryCard.defaultProps = {
  bgColor: 'bg-gray-200',
};

export default CategoryCard;
