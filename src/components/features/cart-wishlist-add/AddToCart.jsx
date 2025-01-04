import { useDispatch, useSelector } from "react-redux";
import { addItem, getCart } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(getCart);

  const handleAddToCart = (productData, selectSize, selectColor) => {
    const isProductInCart = cartItems.some(
      (item) => item.itemId === productData.id
    );
    if (isProductInCart) {
      navigate("/MainCart");
      return;
    }

    // Item Added To Cart Slice
    const item = {
      itemId: productData.id,
      name: productData.name,
      desc: productData.desc,
      price: productData.price,
      quantity: 1,
      maxQuantity: productData.quantity,
      size: selectSize,
      color: selectColor,
      mainImage: productData.mainImage,
      discount: productData.discount,
      category: productData.category,
    };

    dispatch(addItem(item));
    toast.success(`Added to your cart`);
  };

  return handleAddToCart;
};

export default AddToCart;
