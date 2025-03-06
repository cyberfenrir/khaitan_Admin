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

const BannersTableRow = ({ banner, onEditBanner, onDeleteBanner }) => {
  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View banner ${banner.id}`);
        break;
      case 'edit':
        onEditBanner(banner.id, banner);
        break;
      case 'delete':
        onDeleteBanner(banner.id);
        break;
      default:
        break;
    }
  };

  return (
    <div role="row" className="contents group flex justify-between">
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <span className="text-sm text-slate-600">{banner.id}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <span className="text-sm text-slate-600">{banner.utility}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <span className="text-sm text-slate-600">{banner.description}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50 flex justify-center">
        <img src={banner.url} alt={banner.name} className="w-16 h-16 object-cover rounded" />
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

BannersTableRow.propTypes = {
  banner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    utility: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onEditBanner: PropTypes.func.isRequired,
  onDeleteBanner: PropTypes.func.isRequired,
};

export default BannersTableRow;