import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../common/Navbar";
import {
  getCart,
  getTotalCartPrice,
  clearCart,
  getTotalOriginalPrice,
  getDiscount,
} from "./cartSlice";
import CartItem from "./CartItem";
import { useFireBase } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const MainCart = () => {
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const originalPrice = useSelector(getTotalOriginalPrice);
  const TotalDiscount = useSelector(getDiscount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebase = useFireBase();
  console.log(TotalDiscount);

  const EXTRA_FEE = 99;
  const SHIPPING_FEE = 50;
  const TOTAL_EXTRA_CHARGES = EXTRA_FEE + SHIPPING_FEE;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProduct = () => {
    if (firebase.isLoggedIn) {
      navigate("/overviewCart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {cart.length === 0 ? (
        <div className="text-center bg-white h-screen">
          <Navbar />
          <div className="flex justify-center items-center h-screen text-center flex-col">
            <h2 className="font-bold text-xl">Your cart is empty.</h2>
            <p>Please add some items to your cart to view them here.</p>
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="md:pt-16 pt-20 bg-slate-50 h-screen">
            <div className="grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-2 xl:mx-[9rem] lg:mx-[2rem] md:mx-12 mx-2 lg:mt-10 sm:mt-4 mt-2">
              <div className="grid gap-y-2 relative">
                <button
                  onClick={handleClearCart}
                  className="text-xs font-semibold flex justify-start cursor-pointer"
                >
                  REMOVE ALL
                </button>
                {cart.map((item) => (
                  <CartItem key={item.itemId} item={item} />
                ))}
              </div>

              <div className="">
                <div className="p-4 border mb-4 bg-white">
                  <h2 className="sm:text-lg text-base font-semibold mb-4">
                    Price Details
                  </h2>

                  <div className="flex justify-between">
                    <p className="sm:text-base text-sm text-gray-600">
                      Total MRP
                    </p>
                    <p className="sm:text-base text-sm text-gray-600">
                      Rs. {originalPrice}
                    </p>
                  </div>
                  {TotalDiscount > 0 && (
                    <div className="flex justify-between">
                      <p className="sm:text-base text-sm text-gray-600">
                        Total discount
                      </p>
                      <p className="sm:text-base text-sm text-gray-600">
                        Rs. - {TotalDiscount}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p className="sm:text-base text-sm text-gray-600">
                      Extra Fee
                    </p>
                    <p className="sm:text-base text-sm text-green-600 font-semibold">
                      ₹{EXTRA_FEE}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="sm:text-base text-sm text-gray-600">
                      Shipping Fee
                    </p>
                    <p className="sm:text-base text-sm text-green-600 font-semibold">
                      ₹{SHIPPING_FEE}
                    </p>
                  </div>
                  <div className="w-full border my-2"></div>
                  <div className="flex justify-between">
                    <p className="sm:text-base text-sm text-gray-600">
                      Total Price:
                    </p>
                    <p className="sm:text-base text-sm text-gray-900 font-semibold">
                      ₹{totalPrice + TOTAL_EXTRA_CHARGES}
                    </p>
                  </div>
                  <div className="sm:block hidden">
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleProduct}
                        className="font-semibold px-16 py-2 bg-blue-600 border border-blue-600 text-white rounded active:bg-white hover:shadow-md active:border-black active:text-gray-950 duration-100"
                      >
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
                  <div className="sm:hidden block pt-6">
                    <button
                      onClick={handleProduct}
                      className="font-semibold w-full text-sm py-4 bg-blue-600 border border-blue-600 text-white rounded active:bg-white active:border-black active:text-gray-950 duration-50"
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCart;
