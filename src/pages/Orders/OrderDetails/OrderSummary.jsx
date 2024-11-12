

function OrderSummary() {
  const summaryItems = [
    { label: 'Vender', value: 'Catpiller', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9' },
    { label: 'Date', value: 'April 23 , 2024', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9' },
    { label: 'Paid By', value: 'Gaston Lapierre', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9' },
    { label: 'Reference #IMEMO', value: '#0758267/90', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9' }
  ];

  return (
    <section className="flex flex-wrap gap-6 py-6 pr-12 pl-6 mt-6 w-full bg-gray-50 rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
      {summaryItems.map((item, index) => (
        <div key={index} className={`flex gap-10 px-6 py-0.5 whitespace-nowrap ${index < summaryItems.length - 1 ? 'border-r border-solid border-r-slate-200' : ''} max-md:px-5`}>
          <div className="flex flex-col self-start mt-1.5">
            <div className="text-base leading-6 text-slate-700">{item.label}</div>
            <div className="mt-5 text-sm leading-5 h-[21px] text-slate-500">{item.value}</div>
          </div>
          <div className="flex shrink-0 w-12 h-12 rounded-xl bg-slate-100">
            <img src={item.icon} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default OrderSummary;