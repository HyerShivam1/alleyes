/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateQuantity({ itemId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className=" items-center gap-1 md:gap-3   px-0 w-[140px] rounded-lg flex justify-around">
        <button
          type="button"
          className="border-2 px-6 py-[4px] rounded-md font-semibold"
          onClick={() => dispatch(decreaseItemQuantity(itemId))}
        >
          -
        </button>
        <span className="font-medium">{currentQuantity}</span>
        <button
          className="border-2 px-6 rounded-md font-semibold py-[4px]"
          aria-label="Increase Quantity"
          onClick={() => dispatch(increaseItemQuantity(itemId))}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default UpdateQuantity;
