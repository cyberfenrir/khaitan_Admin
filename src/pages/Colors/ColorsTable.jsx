import PropTypes from 'prop-types';
import ColorsTableHeader from './ColorsTableHeader';
import ColorsTableRow from './ColorsTableRow';

const ColorsTable = ({ colorsList, onEditColor, onDeleteColor }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200">
      <div className="relative">
        <div className="overflow-auto">
          <div className="min-w-[1080px]">
            <div role="table" className="grid grid-cols-4 flex justify-between">
              <ColorsTableHeader />
              <div role="rowgroup" className="contents">
                {colorsList.map((color) => (
                  <ColorsTableRow
                    key={color.id}
                    color={color}
                    onEditColor={onEditColor}
                    onDeleteColor={onDeleteColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ColorsTable.propTypes = {
  colorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      colorName: PropTypes.string.isRequired,
      colorHex: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditColor: PropTypes.func.isRequired,
  onDeleteColor: PropTypes.func.isRequired,
};

export default ColorsTable;