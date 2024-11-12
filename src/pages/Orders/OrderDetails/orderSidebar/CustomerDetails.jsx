function CustomerDetails() {
  return (
    <section className="flex flex-col pb-8 mt-6 w-full bg-white rounded-xl shadow-sm">
      <h2 className="px-6 pt-5 pb-5 text-base font-semibold leading-4 border-b border-solid border-b-slate-200 text-slate-700">
        Customer Details
      </h2>
      <div className="flex flex-col px-6 mt-6 w-full">
        <div className="flex gap-3 self-start text-sm leading-5">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ee6357c850c30d7e1885f120296c304fda7eefc7250ab7614bc5f8fddc88d60?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="Customer avatar" className="object-contain shrink-0 w-12 aspect-square" />
          <div className="flex flex-col self-start mt-2">
            <div className="self-start h-[21px] text-slate-500">Gaston Lapierre</div>
            <div className="mt-2 text-orange-500 whitespace-nowrap">hello@dundermuffilin.com</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between mt-6">
          <div className="flex flex-col items-start text-sm leading-5 text-slate-500">
            <h3 className="text-base font-semibold leading-4 text-slate-700">Contact Number</h3>
            <p className="mt-5 h-[21px]">(723) 732-760-5760</p>
            <h3 className="mt-8 text-base font-semibold leading-4 text-slate-700">Shipping Address</h3>
            <p className="mt-4 h-[21px]">Wilson's Jewelers LTD</p>
            <p className="self-stretch mt-4 h-[21px]">1344 Hershell Hollow Road ,</p>
            <p className="mt-4 h-[21px]">Tukwila, WA 98168 ,</p>
            <p className="mt-4 h-[21px]">United States</p>
            <p className="mt-4 h-[21px]">(723) 732-760-5760</p>
            <h3 className="mt-7 text-base font-semibold leading-4 text-slate-700">Billing Address</h3>
            <p className="self-stretch mt-4 h-[21px]">Same as shipping address</p>
          </div>
          <div className="flex flex-col self-start">
            <div className="flex flex-col pb-0.5">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/70a6d3e8685d6f6134622266cefaef822a5927b754c531f2fdbaa74f081b0cea?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
            </div>
            <div className="flex flex-col pb-0.5 mt-12">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb98a0bbe0bd25bf0e1c53581b6671f0e5cb220dca25472c94d4ec72ae2f6dfd?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
            </div>
            <div className="flex flex-col pb-0.5 mt-40">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/70a6d3e8685d6f6134622266cefaef822a5927b754c531f2fdbaa74f081b0cea?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain aspect-square w-[18px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerDetails;