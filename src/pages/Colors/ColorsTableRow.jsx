import PropTypes from 'prop-types';
import Action from './Utils/actions';
import viewIcon from './assets/view.svg';
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';

const actionIcons = [
  { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
  { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
  { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
];

const ColorsTableRow = ({ color }) => {
  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View color ${color.id}`);
        break;
      case 'edit':
        console.log(`Edit color ${color.id}`);
        break;
      case 'delete':
        console.log(`Delete color ${color.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div role="row" className="contents group">
      <div className="flex justify-center py-4 px-5 border-b border-slate-200 group-hover:bg-slate-50">
        <input
          type="checkbox"
          className="w-4 h-4 bg-white rounded border border-black border-opacity-20"
          aria-label={`Select ${color.name}`}
        />
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{color.name}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{color.hexCode}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{color.place}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 space-x-2">
        {actionIcons.map((icon) => (
          <Action
            key={icon.action}
            src={icon.src}
            bgColor={icon.bgColor}
            action={icon.action}
            onClick={() => handleAction(icon.action)}
          />
        ))}
      </div>
    </div>
  );
};

ColorsTableRow.propTypes = {
  color: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hexCode: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  }).isRequired,
};

export default ColorsTableRow;