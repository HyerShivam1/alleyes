import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { WishlistAddItem } from "../../features/wishlist/userSlice";

const AddToWishlist = () => {
  const dispatch = useDispatch();

  const handleAddToWishlist = (productData) => {
    const WishlistItem = {
      itemId: productData.id,
      name: productData.name,
      price: productData.price,
      mainImage: productData.mainImage,
      discount: productData.discount,
    };

    dispatch(WishlistAddItem(WishlistItem));
    toast.success(`Added to your Wishlist`);
  };
  return handleAddToWishlist;
};
export default AddToWishlist;
