import StatCard from './StatCard';
import DataTable from './DataTable';

const statsData = [
  {
    title: 'Employees',
    value: '54',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/da4940ef3bb3c00a7fba707b0d941ec6b192cbf0b9085acb412673acb4f1087d?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
  },
  {
    title: 'Assigned Manager',
    value: '13',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e2b8b18634c810fab81aa37442c802ca5bf88fc9acc93b36f4b18b4865875825?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
  },
  {
    title: 'Project',
    value: '19',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2c75c24851ac207bae0b38e8be254a7217d1413ca475bc312867154bda74ee2a?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
  },
  {
    title: 'License Used',
    value: '36/50',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/70eedb804fe5319b6dc2b6dc22dc1424653f8a8f89e461427e27a9d21136efdc?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
  }
];

function DashboardStats() {
  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 px-3">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>
      <section className="flex flex-wrap justify-center w-full min-h-[758px] max-md:max-w-full">
        <DataTable />
      </section>
    </main>
  );
}

export default DashboardStats;