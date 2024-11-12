const summaryItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1a5545634b60474b8cb225d93ad9defd26d4bab062f73d348adaec50dacd4909?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9", label: "Sub Total :", value: "$777.00" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/01c77c842ecae839ae8cbc99bf5f5ab5efb5fe63982685b06fa1cad4af0b2631?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9", label: "Discount :", value: "-$60.00" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9bc9a3bb5ac1fab159af4e763d649bd5ea505a3ec69bf4a21360d09a9b377a80?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9", label: "Delivery Charge :", value: "$00.00" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/18186f024251e4c13704341385eca3d38f28195b01ae7d4699b10fd7cc07df34?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9", label: "Estimated Tax (15.5%) :", value: "$20.00" }
];

function SummaryTable() {
  return (
    <section className="flex flex-col gap-6 w-full text-sm leading-5 bg-white rounded-xl shadow-sm">
      <h2 className="px-6 pt-5 pb-5 w-full text-base font-semibold leading-4 border-b border-solid border-b-slate-200 text-slate-700">
        Order Summary
      </h2>
      <div className="flex overflow-hidden flex-col justify-center mt-6 w-full h-[196px]">
        {summaryItems.map((item, index) => (
          <div key={index} className="flex justify-center w-full min-h-[49px]">
            <div className="flex gap-1.5 items-center py-3.5 h-full border-b border-solid border-b-slate-200 min-w-[240px] text-slate-500 w-[243px]">
              <img loading="lazy" src={item.icon} alt="" className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square" />
              <div className="self-stretch my-auto">{item.label}</div>
            </div>
            <div className={`pt-3.5 pb-4 pl-6 text-right whitespace-nowrap border-b border-solid border-b-slate-200 text-slate-700 w-[75px] ${index === 3 ? 'pl-8' : ''}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-10 justify-between items-center px-6 py-5 mt-6 w-full bg-gray-50 text-slate-700">
        <div className="self-stretch my-auto">Total Amount</div>
        <div className="self-stretch my-auto">$737.00</div>
      </div>
    </section>
  );
}

export default SummaryTable;