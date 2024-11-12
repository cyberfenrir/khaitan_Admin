import SummaryTable from './SummaryTable';
import PaymentInfo from './PaymentInfo';
import CustomerDetails from './CustomerDetails';
import MapView from './MapView';

function OrderSummary() {
  return (
    <main className="flex flex-col px-3 mx-auto w-full max-w-[480px]">
      <SummaryTable />
      <PaymentInfo />
      <CustomerDetails />
      <MapView />
    </main>
  );
}

export default OrderSummary;