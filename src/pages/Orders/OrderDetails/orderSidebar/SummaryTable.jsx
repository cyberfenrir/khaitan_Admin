function SummaryTable({ order }) {
  const summaryItems = [
    { label: "Sub Total :", value: `₹${order.totalPrice}` },
    // { label: "Discount :", value: "-₹60.00" }, 
    { label: "Delivery Charge :", value: "₹00.00" },
    { label: "Estimated Tax (18%) :", value: `₹${0.18*order.totalPrice}` },
  ];

  return (
    <section className="flex flex-col gap-6 w-full text-sm leading-5 bg-white rounded-xl shadow-sm">
      <h2 className="px-6 pt-5 pb-5 w-full text-base font-semibold leading-4 border-b border-solid border-b-slate-200 text-slate-700">
        Order Summary
      </h2>
      <div className="px-6 py-4 text-slate-700">
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>
      </div>
      <div className="flex overflow-hidden flex-col justify-center w-full h-auto">
        {summaryItems.map((item, index) => (
          <div key={index} className="flex justify-center w-full min-h-[49px]">
            <div className="flex gap-1.5 items-center py-3.5 h-full border-b border-solid border-b-slate-200 min-w-[240px] text-slate-500 w-[243px]">
              <div className="self-stretch my-auto">{item.label}</div>
            </div>
            <div className={`pt-3.5 pb-4 pl-6 text-right whitespace-nowrap border-b border-solid border-b-slate-200 text-slate-700 w-[75px] ${index === 3 ? 'pl-8' : ''}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-10 justify-between items-center px-6 py-5 mt-6 border border-y w-full bg-gray-50 text-slate-700">
        <div className="self-stretch my-auto">Total Amount</div>
        <div className="self-stretch my-auto">
          ₹{summaryItems.reduce((total, item) => {
            const numericValue = parseFloat(item.value.replace(/[₹,-]/g, '')) || 0;
            return total + numericValue;
          }, 0).toFixed(2)}
        </div>
      </div>
    </section>
  );
}

export default SummaryTable;