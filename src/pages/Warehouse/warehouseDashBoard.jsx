import StatsCard from './utils/statsCard';
import WarehouseTable from './warehouseTable';
import { statsData } from './utils/stats';

export default function WarehouseDashboard() {
  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 px-3">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </section>
      <section className="flex flex-wrap justify-center w-full min-h-[818px] max-md:max-w-full">
        <WarehouseTable />
      </section>
    </main>
  );
}