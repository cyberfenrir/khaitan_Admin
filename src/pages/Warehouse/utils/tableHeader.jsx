export default function TableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-3.5 py-3.5 text-left w-[40px]">
          <input type="checkbox" className="w-4 h-4 bg-white rounded border border-solid border-black border-opacity-20" />
        </th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-left whitespace-nowrap w-[120px]">Warehouse ID</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-left whitespace-nowrap w-[150px]">Warehouse Name</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-left whitespace-nowrap w-[120px]">Location</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-left whitespace-nowrap w-[120px]">Manager</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-left whitespace-nowrap w-[140px]">Contact Number</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-right whitespace-nowrap w-[120px]">Stock Available</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-right whitespace-nowrap w-[120px]">Stock Shipping</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-right whitespace-nowrap w-[150px]">Warehouse Revenue</th>
        <th className="px-3.5 py-3.5 text-sm font-bold text-slate-500 text-center whitespace-nowrap w-[120px]">Action</th>
      </tr>
    </thead>
  );
}