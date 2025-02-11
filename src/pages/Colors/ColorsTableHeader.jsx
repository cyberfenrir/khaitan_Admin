const ColorsTableHeader = () => {
    return (
      <div role="rowheader" className="contents">
        <div className="flex justify-center py-3.5 px-5 bg-gray-50 border-b border-slate-200">
          <input
            type="checkbox"
            className="w-4 bg-white rounded border border-black border-opacity-20"
            aria-label="Select all colors"
          />
        </div>
        <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
          Color Name
        </div>
        <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
          Hex Code
        </div>
        <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
          Place
        </div>
        <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
          Actions
        </div>
      </div>
    );
  };
  
  export default ColorsTableHeader;