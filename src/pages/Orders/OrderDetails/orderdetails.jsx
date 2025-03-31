import ProgressBar from './ProgressBar';
import OrderTimeline from './OrderTimeline';
import ProductTable from './ProductTable';
import OrderSummary from './orderSidebar/OrderSummary';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getOrderDetails, updateOrderStatus } from '../../../services/orderService';
import { convertDateTime } from '../../../Utils/timeConversion';
import DialogBox from '../../../components/DialogBox'; // Import the new DialogBox component
import { getAllUsers } from '../../../services/userService';

function OrderDetails() {

  const { id } = useParams();
  const location = useLocation();
  const order = useMemo(() => location.state?.order || {}, [location.state]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  
  useEffect (() => {
    const fetchUserData = async () => {
      const data = await getAllUsers();
      setAllUsers(data?.data);
    }
    fetchUserData();
  }, []);
  
  const user = allUsers.find(user => user.id === order.userId);

  const handleDeliveryUpdate = async () => {
    try{
      const data = await updateOrderStatus(user.id);
      if(data.sucess){
        setShowDialog(true);
        setDialogMessage("Order Status Updated Successfully");
      }
    }
    catch(err){
      console.error("Update Delivery Error: ",err);
      setShowDialog(true);
      setDialogMessage("Failed to Update Order Status");
    }
  }

  return (
    <>
    {showDialog ? (
      <DialogBox 
      isOpen={showDialog} 
      message={dialogMessage} 
      onClose={() => setShowDialog(false)} 
      />
    ):(
        <div className="flex gap-6 px-6 py-6 w-full min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <section className="flex flex-col pt-6 w-full bg-white rounded-xl shadow-sm">
            <div className="flex flex-col px-3 w-full">
              <header className="flex flex-wrap gap-5 justify-between mr-3 ml-3 w-full max-w-[1097px]">
                <div className="flex flex-col">
                  <h1 className="flex gap-3 items-center text-sm font-medium">
                    <span className="self-stretch my-auto text-lg leading-5 text-slate-700">#{order.id}</span>
                    <span className="self-stretch px-3 py-1.5 my-auto font-semibold leading-3 text-center text-green-500 whitespace-nowrap bg-emerald-100 rounded">Paid</span>
                    <span className="self-stretch px-3.5 py-2 my-auto leading-4 text-amber-400 rounded-xl border border-amber-400 border-solid">In Progress</span>
                  </h1>
                  <p className="mt-4 text-sm leading-5 h-[21px] text-slate-500">
                    Order / Order Details / #{order.id} - {convertDateTime(order.createdAt)}
                  </p>
                </div>
              </header>
              <h2 className="self-start mt-11 ml-3 text-lg font-medium leading-5 text-slate-700">Progress</h2>
              <ProgressBar />
              <div className="flex flex-wrap gap-10 justify-between content-center items-center px-6 py-5 mt-6 w-full bg-gray-50">
                <div className="flex justify-center items-start self-stretch px-3.5 py-2.5 my-auto text-sm rounded-xl border border-solid bg-stone-50 border-slate-200 min-w-[240px] text-slate-500 w-[310px]">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/11113a09e50e65d6af7c8070772f3580b84ec7563c78335194cb4cf4296996df?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain shrink-0 w-4 aspect-square" />
                  <span className="flex-auto">
                    <span className="text-slate-500">Estimated shipping date : </span>
                    <span className="text-slate-700">{convertDateTime(order.expectedDeliveryDate)}</span>
                  </span>
                </div>
                <button className="self-stretch px-4 py-2.5 my-auto text-sm leading-5 text-center text-white bg-orange-500 rounded-xl border border-orange-500 border-solid" onClick={handleDeliveryUpdate}>
                  Mark As Delivered
                </button>
              </div>
            </div>
          </section>
          <ProductTable productsArray = {order.products}/>
        </div>

        <div className="w-[480px] flex-shrink-0">
          <div className="sticky top-6">
            <OrderSummary orderData = {order} userData = {user} />
          </div>
        </div>
      </div>    
      )
    }
    </>
  );
}

export default OrderDetails;