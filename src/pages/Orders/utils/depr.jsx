import OrderTableRow from './OrderTableRow';

const orders = [
  {
    id: '#583488/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Gail C. Anderson',
    priority: 'Normal',
    total: '$1,230.00',
    paymentStatus: 'Unpaid',
    items: '4',
    deliveryNumber: '-',
    orderStatus: 'Draft'
  },
  {
    id: '#456754/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Jung S. Ayala',
    priority: 'Normal',
    total: '$987.00',
    paymentStatus: 'Paid',
    items: '2',
    deliveryNumber: '-',
    orderStatus: 'Packaging'
  },
  {
    id: '#578246/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'David A. Arnold',
    priority: 'High',
    total: '$1,478.00',
    paymentStatus: 'Paid',
    items: '5',
    deliveryNumber: '#D-57837678',
    orderStatus: 'Completed'
  },
  {
    id: '#348930/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Cecile D. Gordon',
    priority: 'Normal',
    total: '$720.00',
    paymentStatus: 'Refund',
    items: '4',
    deliveryNumber: '-',
    orderStatus: 'Canceled'
  },
  {
    id: '#391367/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'William Moreno',
    priority: 'Normal',
    total: '$1,909.00',
    paymentStatus: 'Paid',
    items: '6',
    deliveryNumber: '#D-89734235',
    orderStatus: 'Completed'
  },
  {
    id: '#930447/80',
    createdAt: 'March 09 , 2024',
    customer: 'Alphonse Roy',
    priority: 'High',
    total: '$879.00',
    paymentStatus: 'Paid',
    items: '4',
    deliveryNumber: '#D-35227268',
    orderStatus: 'Completed'
  },
  {
    id: '#462397/80',
    createdAt: 'March 09 , 2024',
    customer: 'Pierpont Marleau',
    priority: 'High',
    total: '$1,230.00',
    paymentStatus: 'Refund',
    items: '2',
    deliveryNumber: '-',
    orderStatus: 'Canceled'
  },
  {
    id: '#472356/80',
    createdAt: 'March 09 , 2024',
    customer: 'Madeleine Gervais',
    priority: 'Normal',
    total: '$1,264.00',
    paymentStatus: 'Paid',
    items: '3',
    deliveryNumber: '#D-74922656',
    orderStatus: 'Completed'
  },
  {
    id: '#456754/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Jung S. Ayala',
    priority: 'Normal',
    total: '$987.00',
    paymentStatus: 'Paid',
    items: '2',
    deliveryNumber: '-',
    orderStatus: 'Packaging'
  }
];

function OrderTable() {
  return (
    <div className="flex flex-wrap justify-center w-full min-h-[758px] max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink px-3 w-full basis-0 max-w-[1558px] min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center px-6 pt-5 pb-5 w-full border-b border-solid border-b-slate-200 max-md:px-5 max-md:max-w-full">
            <h2 className="flex flex-col self-stretch my-auto w-24 text-base font-semibold leading-none text-slate-700">
              All Order List
            </h2>
            <div className="flex gap-1 items-start self-stretch px-3.5 py-2 my-auto rounded-xl border border-solid border-slate-100">
              <span className="text-sm text-center text-zinc-700">This Month</span>
              <div className="flex items-start w-4">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/11b904fef0313227eab3352b4421eff4faac1897fe55db9392128ebdf05d77e7?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30" alt="" className="object-contain w-4 aspect-square" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex flex-col text-sm font-bold bg-gray-50 text-slate-500 max-md:max-w-full">
                  <div className="flex flex-wrap items-center max-md:max-w-full">
                    <div className="self-stretch pt-3.5 pr-16 pb-4 pl-3.5 my-auto border-b border-solid border-b-slate-200 max-md:pr-5">Order ID</div>
                    <div className="self-stretch pt-3.5 pr-20 pb-4 pl-3.5 my-auto border-b border-solid border-b-slate-200 max-md:pr-5">Created at</div>
                    <div className="self-stretch pt-3.5 pr-28 pb-4 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 max-md:pr-5">Customer</div>
                    <div className="self-stretch pt-3.5 pr-9 pb-4 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 max-md:pr-5">Priority</div>
                    <div className="self-stretch pt-3.5 pr-16 pb-4 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 max-md:pr-5">Total</div>
                    <div className="self-stretch pt-3.5 pr-14 pb-4 pl-3.5 my-auto border-b border-solid border-b-slate-200 max-md:pr-5">Payment Status</div>
                    <div className="self-stretch pt-3.5 pr-8 pb-4 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 max-md:pr-5">Items</div>
                    <div className="self-stretch pt-3.5 pr-14 pb-4 pl-3.5 my-auto border-b border-solid border-b-slate-200 max-md:pr-5">Delivery Number</div>
                    <div className="self-stretch pt-3.5 pr-14 pb-4 pl-3.5 my-auto border-b border-solid border-b-slate-200 max-md:pr-5">Order Status</div>
                    <div className="self-stretch pt-3.5 pr-44 pb-4 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 max-md:pr-5">Action</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center max-md:max-w-full">
                  {orders.map((order, index) => (
                    <OrderTableRow key={index} {...order} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-6 pt-5 pb-5 w-full text-sm text-gray-600 whitespace-nowrap border-t border-solid border-t-slate-200 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-0 w-full max-md:max-w-full">
              <button className="flex flex-col w-20 px-3.5 py-2 bg-white rounded-xl border border-solid border-slate-200">
                Previous
              </button>
              <button className="flex flex-col text-white w-[35px] px-3.5 bg-orange-500 border border-orange-500 border-solid h-[35px]">
                1
              </button>
              <button className="flex flex-col w-[35px] px-3.5 bg-white border border-solid border-slate-200 h-[35px]">
                2
              </button>
              <button className="flex flex-col w-[35px] px-3.5 bg-white border border-solid border-slate-200 h-[35px]">
                3
              </button>
              <button className="flex flex-col w-14 px-3.5 py-2 bg-white rounded-none border border-solid border-slate-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTable;