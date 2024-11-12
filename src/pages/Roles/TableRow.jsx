import React from 'react';

function TableRow({ name, assignedTo, createdDate, lastUpdate }) {
  return (
    <tr className="flex flex-wrap justify-center items-center w-full min-h-[60px] max-md:max-w-full">
      <td className="flex flex-col grow shrink justify-center self-stretch px-3.5 py-5 my-auto border-b border-solid border-b-slate-200 min-h-[60px] w-[42px]">
        <div className="flex flex-col items-start pt-0.5 pr-2.5 pb-1 w-full min-h-[21px]">
          <input type="checkbox" className="w-4 bg-white rounded border border-solid border-black border-opacity-20 min-h-[16px]" aria-label={`Select ${name}`} />
        </div>
      </td>
      <td className="flex flex-col grow shrink justify-center self-stretch py-5 pr-3.5 pl-3.5 my-auto text-base leading-6 border-b border-solid border-b-slate-200 min-h-[60px] min-w-[240px] text-slate-500 w-[283px]">
        <div className="pb-px w-full">{name}</div>
      </td>
      <td className="flex flex-col grow shrink justify-center items-start self-stretch px-3.5 py-5 my-auto text-xs font-bold leading-3 text-center whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[60px] min-w-[240px] w-[468px] max-md:max-w-full">
        {assignedTo.map((role, index) => (
          <span key={index} className={`px-3 py-1.5 rounded ${getRoleStyle(role)}`}>
            {role}
          </span>
        ))}
      </td>
      <td className="grow shrink self-stretch py-5 pr-3.5 pl-3.5 my-auto text-sm leading-5 border-b border-solid border-b-slate-200 min-h-[60px] min-w-[240px] text-slate-500 w-[253px]">
        {createdDate}
      </td>
      <td className="grow shrink self-stretch px-3.5 py-5 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[60px] text-slate-500 w-[154px]">
        {lastUpdate}
      </td>
      <td className="flex flex-col grow shrink justify-center self-stretch px-3.5 py-4 my-auto border-b border-solid border-b-slate-200 min-h-[60px] min-w-[240px] w-[268px]">
        <div className="flex gap-3 w-full">
          <button className="flex flex-col justify-center items-center px-3.5 pt-2 pb-2 w-11 rounded-lg border border-solid bg-slate-100 border-slate-100" aria-label="View">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5b206f40515f9f637391e28565a3e5c92b5fcaef5d667ecb88218a8a2e5bb9e?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
          </button>
          <button className="flex flex-col justify-center items-center px-3.5 pt-2 pb-2 w-11 rounded-lg bg-orange-500 bg-opacity-10" aria-label="Edit">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7c023376f8ee63e77a2f113f342089c78303e6bc789078e283d809b7cd5316f?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
          </button>
          <button className="flex flex-col justify-center items-center px-3.5 pt-2 pb-2 w-11 rounded-lg bg-red-400 bg-opacity-10" aria-label="Delete">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e26188d1c45189b003666c00ef3fa999b843fda8327cba850f5c290ee9f4a42?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function getRoleStyle(role) {
  switch (role) {
    case 'Manager':
      return 'bg-orange-100 text-orange-500';
    case 'Administrator':
      return 'bg-stone-200 text-teal-400';
    case 'Developer':
      return 'bg-slate-100 text-slate-700';
    case 'Analyst':
      return 'bg-emerald-100 text-green-500';
    case 'Trial':
      return 'bg-orange-100 text-amber-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default TableRow;