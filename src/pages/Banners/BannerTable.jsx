import PropTypes from 'prop-types';
import BannersTableHeader from './BannerTableHeader';
import BannersTableRow from './BannerTableRow';

const BannersTable = ({ bannersList, onEditBanner, onDeleteBanner }) => {
  
  const isValidArray = Array.isArray(bannersList);
  
  if (!isValidArray || bannersList.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg border border-slate-200 p-4 text-center">
        <p className="text-slate-500">No banners available.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200">
      <div className="relative">
        <div className="overflow-auto">
          <div className="min-w-[1080px]">
            <div role="table" className="grid grid-cols-5 flex justify-between">
              <BannersTableHeader />
              <div role="rowgroup" className="contents">
                {bannersList.map((banner) => (
                  <BannersTableRow
                    key={banner.id}
                    banner={banner}
                    onEditBanner={onEditBanner}
                    onDeleteBanner={onDeleteBanner}
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

BannersTable.propTypes = {
  bannersList: PropTypes.array,
  onEditBanner: PropTypes.func.isRequired,
  onDeleteBanner: PropTypes.func.isRequired,
};

export default BannersTable;