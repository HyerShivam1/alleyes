import { Link, useParams } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { FiBox } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import DataLoader from "../../common/DataLoader";
import useOrderItemFetching from "../../datastore/OrderItemFetching";

const OrderItem = () => {
  const { orderId, itemId } = useParams();
  const { order, product, loading, error } = useOrderItemFetching(
    orderId,
    itemId
  );

  if (loading) {
    return <DataLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const calculateDiscountPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(0);
  };

  const discountedPrice = calculateDiscountPrice(
    product.price,
    product.discount
  );
  const totalPrice = discountedPrice * product.quantity;

  return (
    <div>
      <Navbar />
      <div className="flex flex-row sm:justify-evenly justify-between sm:gap-96 gap-0 sm:px-0 px-4 pt-24 pb-4">
        <div>
          <h2 className="sm:text-base text-sm font-semibold text-gray-800">
            Order
          </h2>
          <span className="text-xs sm:text-sm text-gray-800">From anytime</span>
        </div>
        <Link to="/shoppingCart">
          <button className="text-xs p-2 border-2 border-blue-600 bg-blue-600 text-white rounded active:bg-white active:text-black duration-200">
            New Order
          </button>
        </Link>
      </div>

      <div className="w-full border bg-slate-300"></div>

      {/* Product Details */}
      <div className="flex justify-center pt-5">
        <div className="bg-zinc-100 sm:h-[430px] h-[350px] flex justify-center w-[700px]">
          <div className="flex flex-col sm:pt-20 pt-10">
            <img
              className="h-40 w-32 object-contain mx-auto"
              src={product.mainImage}
              alt={product.name}
            />
            <div className="flex flex-col relative left-5 pt-2 mx-auto">
              <h2 className="font-semibold sm:text-base text-sm">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </h2>
              <p className="sm:text-sm text-xs">
                Size: {product.size.toUpperCase()}
              </p>
              <p className="sm:text-sm text-xs">
                Color:{" "}
                {product.color.charAt(0).toUpperCase() + product.color.slice(1)}
              </p>
              <p className="sm:text-sm text-xs">Qty: {product.quantity}</p>
            </div>
            <div className="pt-4">
              <div className="sm:w-[600px] w-[350px] sm:h-14 h-12 bg-blue-500">
                <div className="flex items-center gap-2 pl-4 pt-4">
                  <FiBox className="text-white" />
                  <h2 className="text-white font-semibold sm:text-sm text-xs ">
                    Delivery soon
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="flex justify-center pt-5">
        <div className="bg-zinc-100 w-[700px] sm:h-[110px] h-[100px]">
          <div className="pl-4 sm:pl-8 pt-3">
            <h2 className="font-semibold pb-4 sm:text-base text-sm">
              Delivery Address
            </h2>
            <div className="flex gap-1.5">
              <span className="font-semibold text-xs sm:text-sm">
                {order.address?.[0].name.charAt(0).toUpperCase() +
                  order.address?.[0].name.slice(1)}
              </span>
              <div className="h-3 bg-gray-300 w-[1px]"></div>
              <span className="font-semibold text-xs sm:text-sm">
                {order.address?.[0].number}
              </span>
            </div>
            <span className="text-xs sm:text-sm">
              {order.address?.[0].address}
            </span>
          </div>
        </div>
      </div>

      {/* Total Order Price */}
      <div className="flex justify-center pt-5 pb-5">
        <div className="bg-zinc-100 w-[700px] sm:h-[65px] h-[55px]">
          <div className="sm:px-8 px-4 sm:pt-2 pt-1.5">
            <div className="flex justify-between">
              <h2 className="font-semibold sm:text-base text-sm">
                Total Order Price
              </h2>
              <div className="flex">
                <h3 className="font-semibold sm:text-base text-sm">
                  Rs. {totalPrice}
                </h3>
                <IoIosArrowDown className="text-blue-600 relative top-1 left-1" />
              </div>
            </div>
            <span className="sm:text-sm text-xs">
              Order ID: #{order.orderId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
