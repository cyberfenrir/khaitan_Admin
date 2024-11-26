import ProgressBar from './ProgressBar';
import OrderTimeline from './OrderTimeline';
import ProductTable from './ProductTable';
import OrderSummary from './orderSidebar/OrderSummary';

function OrderDetails() {
  return (
    <div className="flex gap-6 px-6 py-6 w-full min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <section className="flex flex-col pt-6 w-full bg-white rounded-xl shadow-sm">
          <div className="flex flex-col px-3 w-full">
            <header className="flex flex-wrap gap-5 justify-between mr-3 ml-3 w-full max-w-[1097px]">
              <div className="flex flex-col">
                <h1 className="flex gap-3 items-center text-sm font-medium">
                  <span className="self-stretch my-auto text-lg leading-5 text-slate-700">#0758267/90</span>
                  <span className="self-stretch px-3 py-1.5 my-auto font-semibold leading-3 text-center text-green-500 whitespace-nowrap bg-emerald-100 rounded">Paid</span>
                  <span className="self-stretch px-3.5 py-2 my-auto leading-4 text-amber-400 rounded-xl border border-amber-400 border-solid">In Progress</span>
                </h1>
                <p className="mt-4 text-sm leading-5 h-[21px] text-slate-500">
                  Order / Order Details / #0758267/90 - April 23 , 2024 at 6:23 pm
                </p>
              </div>
              <div className="flex gap-1 my-auto text-sm leading-5 text-center text-slate-500">
                <button className="self-stretch px-4 py-2.5 whitespace-nowrap rounded-xl border border-solid border-slate-500">Refund</button>
                <button className="self-stretch px-4 py-2.5 whitespace-nowrap rounded-xl border border-solid border-slate-500">Return</button>
                <button className="self-stretch px-4 py-2.5 text-white bg-orange-500 rounded-xl border border-orange-500 border-solid">Edit Order</button>
              </div>
            </header>
            <h2 className="self-start mt-11 ml-3 text-lg font-medium leading-5 text-slate-700">Progress</h2>
            <ProgressBar />
            <div className="flex flex-wrap gap-10 justify-between content-center items-center px-6 py-5 mt-6 w-full bg-gray-50">
              <div className="flex justify-center items-start self-stretch px-3.5 py-2.5 my-auto text-sm rounded-xl border border-solid bg-stone-50 border-slate-200 min-w-[240px] text-slate-500 w-[293px]">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain shrink-0 w-4 aspect-square" />
                <span className="flex-auto">
                  <span className="text-slate-500">Estimated shipping date : </span>
                  <span className="text-slate-700">Apr 25 , 2024</span>
                </span>
              </div>
              <button className="self-stretch px-4 py-2.5 my-auto text-sm leading-5 text-center text-white bg-orange-500 rounded-xl border border-orange-500 border-solid">
                Make As Ready To Ship
              </button>
            </div>
          </div>
        </section>
        <ProductTable />
        <OrderTimeline />
      </div>

      {/* Sidebar */}
      <div className="w-[480px] flex-shrink-0">
        <div className="sticky top-6">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;