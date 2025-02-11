const ColorsTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Color ID
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Color Name
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Hex Code
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500 flex justify-center">
        Actions
      </div>
    </div>
  );
};

export default ColorsTableHeader;