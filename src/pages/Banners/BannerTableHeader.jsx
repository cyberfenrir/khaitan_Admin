const BannersTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Banner ID
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Banner Name
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Description
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Media
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Actions
      </div>
    </div>
  );
};

export default BannersTableHeader;