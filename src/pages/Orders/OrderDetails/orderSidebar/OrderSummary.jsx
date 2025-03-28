import SummaryTable from './SummaryTable';
import PaymentInfo from './PaymentInfo';
import CustomerDetails from './CustomerDetails';
import MapView from './MapView';

function OrderSummary({orderData, userData}) {
  return (
    <main className="flex flex-col px-3 mx-auto w-full max-w-[480px]">
      <SummaryTable order = {orderData} />
      {/* <PaymentInfo /> */}
      <CustomerDetails order = {orderData} user = {userData} />
      {/* <MapView /> */}
    </main>
  );
}

export default OrderSummary;