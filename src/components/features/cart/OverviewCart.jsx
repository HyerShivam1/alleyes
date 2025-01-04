import { useForm } from "react-hook-form";
import "../../styles/cart.css";
import CartNav from "./CartNav";
import {
  getCart,
  getTotalCartPrice,
  clearCart,
  getTotalOriginalPrice,
  getDiscount,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFireBase } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import GetLocation from "../../services/apiGeocoding";
import { useState, useEffect } from "react";
import {
  addOrderAddress,
  getOrderAddress,
} from "../../features/order/orderSlice";

const OverviewCart = () => {
  const [locationData, setLocationData] = useState("");
  const [cityData, setCityData] = useState("");
  const [LocalityData, setLocalityData] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState("");
  const [submitAddress, setSubmitAddress] = useState("");
  const [error, setError] = useState("");
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const { sendOrderData } = useFireBase();
  const dispatch = useDispatch();

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await GetLocation();
      setCityData(data.address.features[0].properties?.city);
      setLocationData(data.address.features[0].properties?.address_line2);
      setLocalityData(data.address.features[0].properties?.state_district);
      setPostalCode(data.address.features[0].properties?.postcode);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch location data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!isAddressSaved) {
        setIsAddressSaved(true);
        setSubmitAddress(data);
        dispatch(addOrderAddress(data));
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  async function handleOrder() {
    if (!submitAddress || Object.keys(submitAddress).length === 0) {
      alert("Please fill the Address to place the order");
    } else {
      // Send the order data to Firebase
      await sendOrderData(
        GetOrderAddress,
        GetCart,
        totalPrice + TOTAL_EXTRA_CHARGES
      );
      dispatch(clearCart());
      navigate("/orderConfirm",{replace:true})
    }
  }
  const totalPrice = useSelector(getTotalCartPrice);
  const originalPrice = useSelector(getTotalOriginalPrice);
  const TotalDiscount = useSelector(getDiscount);
  const GetCart = useSelector(getCart);
  const GetOrderAddress = useSelector(getOrderAddress);
  const firebase = useFireBase();

  const EXTRA_FEE = 99;
  const SHIPPING_FEE = 50;
  const TOTAL_EXTRA_CHARGES = EXTRA_FEE + SHIPPING_FEE;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!firebase.isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [firebase.isLoggedIn, navigate]);

  return (
    <div>
      <CartNav/>
      <div className="grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-2 xl:mx-[9rem] lg:mx-[2rem]  sm:mx-12 mx-2 lg:mt-10 sm:mt-4 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border sm:p-10 p-4">
            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">
                Full Name*
              </label>
              <input
                className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.name && (
                <span className="text-red-500">
                  {errors.name.message || "Name is required"}
                </span>
              )}
            </div>
            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">
                Mobile No*
              </label>
              <input
                className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                placeholder="Mobile No"
                {...register("number", {
                  required: true,
                  maxLength: 10,
                  pattern: {
                    value:
                      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                    message: "Enter a valid Mobile number",
                  },
                })}
              />
              {errors.number && (
                <span className="text-red-500">
                  {errors.number.message || "Mobile number is required"}
                </span>
              )}
            </div>

            <div className="flex flex-row pt-4">
              <div className="bg-slate-200 w-full h-[1px]"></div>
              <h2 className="relative sm:bottom-[9px] bottom-[7px] bg-white sm:w-80 w-[180px] flex justify-center sm:text-base text-xs text-slate-400">
                ADDRESS
              </h2>
              <div className="bg-slate-200 w-full h-[1px]"></div>
            </div>

            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">
                Pin Code*
              </label>

              <div className="flex justify-between">
                <input
                  className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                  placeholder="Pin Code"
                  defaultValue={postalCode}
                  {...register("pincode", {
                    required: true,
                    maxLength: 6,
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter a valid Pincode",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="md:px-5 md:py-3 px-3 py-2 md:text-base text-xs bg-blue-600 rounded font-semibold text-white border border-blue-600"
                >
                  {loading ? <div className="loading"></div> : "Get Location"}
                </button>
              </div>
              <h2 className="text-red-500">{error}</h2>
              {errors.pincode && (
                <span className="text-red-500">
                  {errors.pincode.message || "Pincode is required"}
                </span>
              )}
            </div>

            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">
                Address(House No, Building, Street, Area)*
              </label>
              <input
                className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                placeholder="Address(House No, Building, Street, Area)"
                defaultValue={locationData}
                {...register("address", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.address && (
                <span className="text-red-500">
                  {errors.address.message || "Address is required"}
                </span>
              )}
            </div>

            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">City*</label>
              <input
                className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                placeholder="City"
                defaultValue={cityData}
                {...register("city", {
                  required: true,
                  maxLength: 40,
                })}
              />
              {errors.city && (
                <span className="text-red-500">
                  {errors.city.message || "City is required"}
                </span>
              )}
            </div>
            <div className="flex flex-col pb-4">
              <label className="sm:pb-3 pb-1 sm:text-base text-sm">
                Locality/Town*
              </label>
              <input
                className="sm:px-6 px-4 border sm:py-3 py-2 rounded sm:text-base text-sm"
                placeholder="Locality/Town"
                defaultValue={LocalityData}
                {...register("locality", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.locality && (
                <span className="text-red-500">
                  {errors.locality.message || "Locality/Town is required"}
                </span>
              )}
            </div>
            <button
              className="sm:text-base text-sm w-full font-semibold bg-blue-600 py-4 rounded text-white border border-blue-600 active:bg-white active:text-black active:border-black"
              disabled={isSubmitting}
            >
              {isAddressSaved
                ? "Address Saved"
                : isSubmitting
                ? "Saving..."
                : "SAVE ADDRESS"}
            </button>
          </div>
        </form>

        <div className="mb-4">
          <div className="p-4 border">
            <h2 className="sm:text-lg text-base font-semibold mb-4">
              Price Details
            </h2>

            <div className="flex justify-between">
              <p className="sm:text-base text-sm text-gray-600">Total MRP</p>
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
              <p className="sm:text-base text-sm text-gray-600">Extra Fee</p>
              <p className="sm:text-base text-sm text-green-600 font-semibold">
                ₹{EXTRA_FEE}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="sm:text-base text-sm text-gray-600">Shipping Fee</p>
              <p className="sm:text-base text-sm text-green-600 font-semibold">
                ₹{SHIPPING_FEE}
              </p>
            </div>
            <div className="w-full border my-2"></div>
            <div className="flex justify-between">
              <p className="sm:text-base text-sm text-gray-600">Total Price:</p>
              <p className="sm:text-base text-sm text-gray-900 font-semibold">
                ₹{totalPrice + TOTAL_EXTRA_CHARGES}
              </p>
            </div>
            <div className="sm:block hidden">
              <div className="flex justify-end pt-4  ">
                <button
                  className="font-semibold px-16 py-2 bg-blue-600 border border-blue-600 text-white rounded active:bg-white hover:shadow-md active:border-black active:text-gray-950 duration-100 "
                  onClick={handleOrder}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
            <div className="sm:hidden block pt-6">
              <button
                className=" font-semibold w-full text-sm py-4 bg-blue-600 border border-blue-600 text-white rounded active:bg-white active:border-black active:text-gray-950 duration-50 "
                onClick={handleOrder}
              >
                PLACE ORDER
              </button>
            </div>
            {/* Add coupon or price details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCart;
