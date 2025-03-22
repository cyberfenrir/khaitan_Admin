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

const ColorsTableRow = ({ color, onEditColor, onDeleteColor }) => {
  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View color ${color.id}`);
        break;
      case 'edit':
        onEditColor(color.id, color);
        break;
      case 'delete':
        onDeleteColor(color.id);
        break;
      default:
        break;
    }
  };

  return (
    <div role="row" className="contents group flex justify-between">
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <span className="text-sm text-slate-600">{color.id}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <span className="text-sm text-slate-600">{color.colorName}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <div className='flex space-x-2 justify-between items-center'>
          <span className='w-4 h-4 rounded-full ring ring-offset-1 ring-gray-200' style={{backgroundColor: `${color.colorHex}`}}></span>
          <span className="text-sm text-slate-600">{color.colorHex}</span>
        </div>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 space-x-2 flex justify-center">
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
    colorName: PropTypes.string.isRequired,
    colorHex: PropTypes.string.isRequired,
  }).isRequired,
  onEditColor: PropTypes.func.isRequired,
  onDeleteColor: PropTypes.func.isRequired,
};

export default ColorsTableRow;