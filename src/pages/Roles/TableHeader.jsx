import React from 'react';

function TableHeader() {
  return (
    <thead>
      <tr className="flex flex-wrap justify-center items-center w-full min-h-[49px] max-md:max-w-full bg-gray-50">
        <th className="flex flex-col grow shrink justify-center self-stretch p-3.5 my-auto border-b border-solid border-b-slate-200 min-h-[49px] w-[42px]">
          <div className="flex flex-col items-start pt-0.5 pr-2.5 pb-1 w-full min-h-[21px]">
            <input type="checkbox" className="w-4 bg-white rounded border border-solid border-black border-opacity-20 min-h-[16px]" aria-label="Select all" />
          </div>
        </th>
        <th className="grow shrink self-stretch p-3.5 my-auto text-sm font-bold leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] text-slate-500 w-[283px]">
          Name
        </th>
        <th className="grow shrink self-stretch p-3.5 my-auto text-sm font-bold leading-5 border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] text-slate-500 w-[468px] max-md:max-w-full">
          Assigned To
        </th>
        <th className="grow shrink self-stretch py-3.5 pr-3.5 pl-3.5 my-auto text-sm font-bold leading-5 border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] text-slate-500 w-[253px]">
          Created Date & Time
        </th>
        <th className="grow shrink self-stretch p-3.5 my-auto text-sm font-bold leading-5 border-b border-solid border-b-slate-200 min-h-[49px] text-slate-500 w-[154px]">
          Last Update
        </th>
        <th className="grow shrink self-stretch p-3.5 my-auto text-sm font-bold leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] text-slate-500 w-[268px]">
          Action
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;