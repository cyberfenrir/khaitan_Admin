/**
 * This code was generated by Builder.io.
 */
import React from "react";

function PerformanceChart() {
  return (
    <div className="flex flex-col grow shrink px-3 max-w-[1558px] min-w-[240px] w-[778px] max-md:max-w-full">
      <div className="flex flex-col justify-center w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
        <div className="flex flex-col flex-1 p-6 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center w-full whitespace-nowrap max-md:max-w-full">
            <h3 className="self-stretch my-auto text-base font-semibold leading-none text-slate-700">
              Performance
            </h3>
            <div className="flex gap-1 items-center self-stretch my-auto text-sm text-center text-zinc-700">
              <button className="self-stretch px-3.5 py-2 my-auto rounded-lg border border-solid border-slate-100">
                ALL
              </button>
              <button className="self-stretch px-3.5 py-2 my-auto rounded-lg border border-solid border-slate-100">
                1M
              </button>
              <button className="self-stretch px-3.5 py-2 my-auto rounded-lg border border-solid border-slate-100">
                6M
              </button>
              <button className="self-stretch px-3.5 py-2 my-auto rounded-lg border border-solid bg-slate-100 border-slate-100">
                1Y
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full min-h-[10px] max-md:max-w-full">
            <div className="flex flex-col justify-center max-w-full min-h-[313px] w-[837px]">
              <div className="flex flex-col py-6 pr-1 pl-4 w-full max-w-[837px] max-md:max-w-full">
                <div className="flex flex-wrap gap-2.5">
                  <div className="flex flex-col text-xs text-right whitespace-nowrap text-slate-400 max-md:hidden">
                    <div>80</div>
                    <div className="mt-4">70</div>
                    <div className="mt-4">60</div>
                    <div className="mt-4">50</div>
                    <div className="mt-4">40</div>
                    <div className="mt-4">30</div>
                    <div className="mt-4">20</div>
                    <div className="mt-4">10</div>
                    <div className="self-start mt-4">0</div>
                  </div>
                  <div className="flex flex-col grow shrink-0 self-start mt-1.5 basis-0 w-fit max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/154b454dd7ab274d8416344bf33455b8648b9b360b73af47b29bfcca6da8b5a6?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30"
                      alt="Performance chart"
                      className="object-contain w-full aspect-[3.38] max-md:max-w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-10 self-end mt-2.5 max-w-full text-xs text-center whitespace-nowrap text-slate-400 w-[767px] max-md:mr-2.5">
                  <div className="grow">Jan</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                  <div>Jul</div>
                  <div>Aug</div>
                  <div>Sep</div>
                  <div>Oct</div>
                  <div>Nov</div>
                  <div>Dec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceChart;
