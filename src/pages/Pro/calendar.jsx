import { useState } from 'react';
import StatsCard from '../Warehouse/utils/statsCard';
import WarehouseTable from '../Warehouse/warehouseTable';
import { statsData } from '../Warehouse/utils/stats';

export default function Calendar() {
    const [showProModal, setShowProModal] = useState(true);
  
    return (
      <>
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
  
        {showProModal && (
          <>
            {/* Overlay with increased blur effect */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-lg z-40"
              onClick={() => setShowProModal(false)}
            />
            
            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl z-50 w-[90%] max-w-md">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Upgrade to Pro</h2>
                <p className="text-gray-500 mb-6">
                  Get access to advanced analytics, unlimited storage, and priority support.
                </p>
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md transition-colors border-2 border-solid border-orange-500"
                  onClick={() => setShowProModal(false)}
                >
                  Get Pro Plan
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }