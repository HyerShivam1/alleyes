import OrderData from "../../DataStore/OrderData";
import DataLoader from "../../common/DataLoader";
import Navbar from "../../common/Navbar";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { loading, orderData } = OrderData();

  if (loading) {
    return <DataLoader />;
  }

  const handleBuy = (itemId) => {
    navigate(`/MenuItem/${itemId}`);
  };

  const handleOrderItem = (orderId,itemId) => {
    navigate(`/OrderItem/${orderId}/${itemId}`);
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-row sm:justify-evenly justify-between sm:gap-96 gap-0 sm:px-0 px-4 pt-24 pb-4 ">
          <div className="">
            <h2 className="sm:text-base text-sm font-semibold text-gray-800">
              All Orders
            </h2>
            <span className="text-xs sm:text-sm text-gray-800">
              From anytime
            </span>
          </div>
          <Link to="/shoppingCart">
            <button className="text-xs p-2 border-2 border-blue-600 bg-blue-600 text-white rounded active:bg-white active:text-black duration-200">
              New Order
            </button>
          </Link>
        </div>
      </div>

      <div className="  w-full border  bg-slate-300 "></div>

      {orderData.length === 0 ? (
        <div className=" flex flex-col sm:pt-40 pt-60 h-full items-center gap-y-2">
          <h2 className="sm:text-base text-sm">
            No orders found. Start shopping to place your first order
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:gap-4 gap-10 pt-4 pb-4">
          {orderData.map((order, orderIndex) => (
            <div key={orderIndex} className="flex justify-center w-full ">
              <div className="flex flex-col sm:gap-y-4 gap-y-10">
                {order.products.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex sm:flex-row gap-10 flex-col"
                  >
                    <div className="flex flex-row gap-6 sm:h-full h-24 full">
                      <img
                        className="h-28 w-28 object-contain bg-gray-200 pr-0"
                        src={product.mainImage}
                      />

                      <div className="flex flex-col w-80 gap-1">
                        <h2 className="text-sm font-semibold text-green-400">
                          Order confirmed
                        </h2>
                        <span className="text-gray-500  sm:text-sm text-sm truncate">
                          {product.name.charAt(0).toUpperCase() +
                            product.name.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Size {product.size.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:px-0 px-4  min-w-28 gap-2 sm:pt-5 pt-0">
                      <button
                        onClick={() => handleBuy(product.itemId)}
                        className="sm:py-1  py-4 border-2 border-blue-600 active:border-blue-600 active:bg-white active:text-black duration-200 text-white rounded-2xl bg-blue-600 text-xs"
                      >
                        Buy it Again
                      </button>
                      <button onClick={() => handleOrderItem(order.orderId,product.itemId)} className="sm:py-1 py-4 border-2 border-gray-300 rounded-2xl  text-xs">
                        View or Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
