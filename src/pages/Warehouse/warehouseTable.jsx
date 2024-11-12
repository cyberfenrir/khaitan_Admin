import TableHeader from './utils/tableHeader';
import TableRow from './utils/tableRow';
import TablePagination from './utils/paginator';
import { warehouseData } from './utils/stats';

export default function WarehouseTable() {
  return (
    <div className="flex flex-col flex-1 shrink px-3 w-full basis-0 max-w-[1558px] min-w-[240px] max-md:max-w-full">
      <div className="flex flex-col w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
        <header className="flex flex-wrap gap-10 justify-between items-center px-6 pt-5 pb-5 w-full border-b border-solid border-b-slate-200 max-md:px-5 max-md:max-w-full">
          <h2 className="flex flex-col self-stretch my-auto text-base font-semibold leading-none text-slate-700 w-[135px]">
            All Warehouse List
          </h2>
          <button className="flex gap-1 items-start self-stretch py-2 pr-3 pl-3.5 my-auto rounded-xl border border-solid border-slate-100">
            <span className="text-sm text-center text-zinc-700">This Month</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/64607fad1435ff669573c9f1a9e682909ba23cbdd4a226eb0d71a344af4e6d1e?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="w-4 h-4" />
          </button>
        </header>
        <div className="overflow-x-auto">
          <div className="min-w-[1200px] w-full">
            <table className="w-full">
              <TableHeader />
              <tbody>
                {warehouseData.map((warehouse, index) => (
                  <TableRow key={index} {...warehouse} />
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination />
        </div>
      </div>
    </div>
  );
}