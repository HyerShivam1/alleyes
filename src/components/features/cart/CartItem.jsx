/* eslint-disable react/prop-types */
import { getCurrentQuantityById } from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const CartItem = ({ item }) => {
  const {
    itemId,
    name,
    quantity,
    mainImage,
    price,
    desc,
    size,
    color,
    discount,
  } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(itemId));

  const dispatch = useDispatch(itemId);

  const discountedPrice = discount
    ? (price - (price * discount) / 100).toFixed(0)
    : price;

  return (
    <div key={itemId} className="flex gap-6 bg-white py-3 border relative">
      <img
        className="sm:w-[150px] w-[140px] sm:h-[200px] h-[200px] object-cover"
        src={mainImage}
        alt={name}
      />
      <div className="flex flex-col justify-between pt-2 pr-1">
        <div className="absolute right-2  top-2">
          <RxCross2
            className="cursor-pointer"
            size={20}
            onClick={() => dispatch(deleteItem(itemId))}
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-800 pr-7">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <p className="text-gray-700 sm:text-sm text-xs pt-1 truncate-desc">
            {desc.charAt(0).toUpperCase() + desc.slice(1)}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-gray-500 text-sm">Size: {size.toUpperCase()}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-gray-500 text-sm">
              Color: {color.charAt(0).toUpperCase() + color.slice(1)}
            </p>
          </div>
          <div>
            <UpdateQuantity itemId={itemId} currentQuantity={currentQuantity} />
          </div>

          {discount ? (
            <div className=" flex gap-2">
              <span className="sm:text-base text-sm sm:pt-0 pt-0.5 font-semibold">
                Rs. {discountedPrice * quantity}
              </span>
              <span className="line-through font-light text-gray-500 text-xs pt-[5.5px]">
                Rs. {price}
              </span>
              <span className="text-[10px] text-orange-400 pt-[7px]">
                {discount}% OFF
              </span>
            </div>
          ) : (
            <div>
              <span className="font-semibold">Rs. {price * quantity}</span>
            </div>
          )}

          <div className="flex flex-row gap-5 relative right-4 sm:pt-1 pt-0">
            <img
              className="w-4 h-4"
              src="../src/assets/tick-mark.png"
              alt="tick"
            />
            <h2 className="text-xs text-gray-400">Verified Product</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
