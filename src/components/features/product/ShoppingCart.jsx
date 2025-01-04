import Navbar from "../../common/Navbar";
import { useNavigate, useNavigation } from "react-router-dom";
import DataLoader from "../../common/DataLoader";
import HeartButton from "./HeartButton";
import AddToWishlist from "../../features/cart-wishlist-add/AddToWishlist";
import ShoppingData from "../../datastore/ShoppingData";
import { useFireBase } from "../../services/firebase";

function ShoppingCart() {
  const firebase = useFireBase();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const addToWishList = AddToWishlist();
  const { ProductData } = ShoppingData();

  const handleAddToWishlist = (item) => {
    if (firebase.isLoggedIn) {
      addToWishList(item);
    } else {
      navigate("/login");
    }
  };

  const calculateDiscountPrice = (price, discount) => {
    if (discount && discount > 0) {
      return (price - (price * discount) / 100).toFixed(0);
    }
    return price;
  };

  const handleCart = (id) => {
    navigate(`/MenuItem/${id}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="pb-10">
        <Navbar />
      </div>

      {/* Product Grid */}
      <div className="ml-0 mr-0 mt-0 grid gap-4 gap-y-0 p-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {isLoading || ProductData.length === 0 ? (
          <DataLoader />
        ) : (
          ProductData.map((item) => {
            const discountedPrice = calculateDiscountPrice(
              item.price,
              item.discount
            );

            return (
              <ul
                className="mt-[20px] cursor-pointer shopping-container relative"
                key={item.id}
                onClick={() => handleCart(item.id)}
              >
                <img
                  className="xl:w-[250px] xl:h-[300px] lg:w-[200px] lg:h-[250px] md:w-[200px] md:h-[250px] sm:w-[200px] sm:h-[250px] h-[200px] w-full relative left-0 object-cover"
                  src={item.mainImage}
                  alt={item.name}
                />
                {/* Heart Button */}
                <div className="absolute top-3 right-6">
                  <HeartButton onClick={() => handleAddToWishlist(item)} />
                </div>
                <li className="pl-[8px] pt-2 font-semibold truncate">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </li>
                <li className="pl-[8px] pt-1 text-gray-600 text-sm">
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </li>
                {item.discount && item.discount > 0 ? (
                  <div>
                    <span className="pl-[8px] pt-1 text-sm font-semibold flex flex-row gap-2">
                      <span className="text-black">Rs. {discountedPrice}</span>
                      <span className="line-through font-light text-gray-500 sm:text-xs text-[10px]  sm:pt-0.5 md:pt-[3.1px] pt-[1.5px] ">
                        Rs. {item.price}
                      </span>
                      <span className=" text-[10px] text-orange-400 font-medium">
                        ({item.discount}% OFF)
                      </span>
                    </span>
                  </div>
                ) : (
                  <span className="pl-[8px] pt-1 text-sm font-semibold">
                    Rs. {item.price}
                  </span>
                )}
              </ul>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
