import OrderStatusCard from './utils/StatusCard';
import OrderTable from './utils/OrderTable';

const orderStatuses = [
  // { title: 'Payment Refund', count: 490, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2874344da3eeb8bbd3b35f144e1f1450596fe88e0476d3b22d7ad8d33d35e0fd?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  // { title: 'Order Cancel', count: 241, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/728f8c8a474dd3ec5c37b8317edb830187cec6dac07863ee19b97d5551dd1770?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'Order Shipped', count: 630, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d96c55e967513fd74273d93053cca80c119726fc36da77e0a9153999295a9142?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'Order Delivering', count: 170, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4898b9a411204486decf7b363078f6ff3cfc8dc0355c051ff388d73d04257344?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'Pending Review', count: 210, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b26bab37a401ca8aaf6e6e48911ff9e6d54ccf062b2314d7a0abd3f521148fde?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'Pending Payment', count: 608, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9ac0f89606c67c0f582ef3f8165d1eb3425412563da937e150565ed74e3344ca?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'Delivered', count: 200, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1ba2e9d5ebf99ab70c0fcac47a65dffa8c4b7438d12f232d90b36d33e6724217?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
  { title: 'In Progress', count: 656, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/451e4d1e480aa358e670c8842427979361a45214ba1905ea41ff271de60e0ead?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30' },
];

function OrderList() {
  return (
    <main className="px-4 md:px-10 pb-20">
      <section className="w-full">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStatuses.map((status, index) => (
            <OrderStatusCard key={index} {...status} />
          ))}
        </div> */}
        <div className="mt-8">
          <OrderTable />
        </div>
      </section>
    </main>
  );
}

export default OrderList;