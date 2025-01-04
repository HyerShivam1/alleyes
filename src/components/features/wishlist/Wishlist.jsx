import Navbar from "../../common/Navbar";
import { useSelector } from "react-redux";
import { WishlistGetCart } from "./userSlice";
import WishlistItem from "./WishlistItem";
import { useFireBase } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector(WishlistGetCart);
  const { isLoggedIn } = useFireBase();
  const navigate = useNavigate();

  const MoveToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      {/* Header */}
      {isLoggedIn ? (
        wishlist.length === 0 ? (
          <div className="flex justify-center items-center h-screen text-center">
            <div>
              <h2 className="md:text-xl sm:text-lg text-m font-semibold">
                Your wishlist is empty
              </h2>
              <p className="md:text-base sm:text-sm text-m text-gray-500">
                Start adding items to your wishlist to view them here.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="pt-20 flex flex-row gap-2 lg:px-10 md:px-6 sm:px-4 px-2">
              <h2 className="font-bold sm:text-lg text-base">My Wishlist</h2>
              <h2 className="sm:text-lg text-base">{wishlist.length} Items</h2>
            </div>

            <div className="flex justify-center lg:px-10 md:px-6 sm:p-4 p-2 lg:pt-10 pt-4">
              <div className="grid xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-2 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                {wishlist.map((wishlistItem) => (
                  <WishlistItem
                    key={wishlistItem.itemId}
                    wishlist={wishlistItem}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-screen text-center">
          <div>
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold">
              Please log in
            </h2>
            <p className="md:text-lg sm:text-base text-sm text-gray-500">
              You need to be logged in to view your wishlist.
            </p>
            <div className="pt-6">
              <button
                className="md:px-10 md:py-4 sm:px-8 sm:py-3 px-6 py-2 border-2 border-blue-600 bg-blue-600 rounded active:bg-white active:border-black font-medium duration-100"
                onClick={MoveToLogin}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
