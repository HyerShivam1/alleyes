/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { WishlistDeleteItem } from "./userSlice";
import AddToCart from "../cart-wishlist-add/AddToCart";
import ProductDataFetching from "../../datastore/ProductDataFetching";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ wishlist }) => {
  const { itemId, price, mainImage, name, discount } = wishlist;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productData, selectSize, selectColor } = ProductDataFetching(itemId);

  const handleRemove = () => {
    dispatch(WishlistDeleteItem(itemId));
  };

  const addToCart = AddToCart();

  const handleMoveToBag = () => {
    if (productData) {
      addToCart(productData, selectSize, selectColor);
      dispatch(WishlistDeleteItem(itemId));
    }
    navigate("/MainCart");
  };

  const calculateDiscountPrice = (price, discount) => {
    if (discount && discount > 0) {
      return (price - (price * discount) / 100).toFixed(0);
    }
    return price;
  };

  const discountedPrice = calculateDiscountPrice(price, discount);

  return (
    <div>
      <div className="relative">
        <div className="border-2 border-gray-100 w-full h-full">
          {/* Item Image */}
          <img
            onClick={() => navigate(`/MenuItem/${itemId}`)}
            className="w-full h-[300px] object-cover left-0 cursor-pointer"
            src={mainImage}
            alt={name}
          />
          {/* Remove Button */}
          <button
            className="absolute bg-gray-300 rounded-full flex items-center justify-center 
              h-6 w-6 text-sm sm:text-base hover:bg-gray-400
              lg:bottom-[90%] lg:left-[82%] 
              md:bottom-[90%] md:left-[80%] 
              sm:bottom-[91%] sm:left-[84%] 
              bottom-[90%] left-[82%]"
            onClick={handleRemove}
          >
            <RxCross2 size={16} />
          </button>
          {/* Item Details */}
          <div className="flex flex-col px-3 py-2 gap-y-1">
            <h2 className="text-gray-900 sm:text-lg text-sm truncate">
              {name?.charAt(0).toUpperCase() + name?.slice(1)}
            </h2>
            {discount > 0 ? (
              <div className=" font-semibold flex flex-row  gap-1">
                <span className="text-black sm:text-base text-sm sm:pt-0 pt-1">
                  Rs. {discountedPrice}
                </span>

                <span className="line-through font-light text-gray-500  sm:text-xs text-[10px] sm:pt-[5.5px] pt-2 ">
                  Rs. {price}
                </span>
                <span className=" sm:text-[10px] text-[7px] sm:pt-[5.5px] text-orange-400 font-medium pt-[9.5px] ">
                  ({discount}% OFF)
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold">Rs. {price}</span>
            )}
          </div>
          <div className="border w-full border-gray-100"></div>
          {/* Move to Bag Button */}
          <button
            onClick={handleMoveToBag}
            className="py-4 w-full font-bold text-xs text-blue-600 sm:text-sm hover:text-blue-800"
          >
            MOVE TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
