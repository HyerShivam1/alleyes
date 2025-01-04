import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import StyleChart from "../cart/StyleChart";
import Color from "../cart/Color";
import DataLoader from "../../common/DataLoader";
import { Toaster } from "react-hot-toast";
import AddToCart from "../cart-wishlist-add/AddToCart";
import AddToWishlist from "../cart-wishlist-add/AddToWishlist";
import ProductDataFetching from "../../datastore/ProductDataFetching";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "../../styles/design.css";
import ShareToSocial from "./ShareToSocial";
import { GoShareAndroid } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { TbCash } from "react-icons/tb";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { useFireBase } from "../../services/firebase";
// import { SlArrowRight } from "react-icons/sl";


function MenuItem() {
  const { id } = useParams();
  const {
    productData,
    selectSize,
    selectColor,
    setSelectSize,
    setSelectColor,
  } = ProductDataFetching(id);
  const [popup, setPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const handleAddToCart = AddToCart();
  const firebase = useFireBase();
  const navigate = useNavigate();
  const addToWishlist = AddToWishlist();

  const handleAddToWishlist = () => {
    if (firebase.isLoggedIn) {
      addToWishlist(productData);
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

  // Show loader if data is loading
  if (!productData) {
    return <DataLoader />;
  }

  if (productData.error) {
    return <div>Error loading product details. Please try again later.</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= productData.primaryImage.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productData.primaryImage.length - 3 : prevIndex - 1
    );
  };

  const handleSharePopup = () => {
    setSharePopup(!sharePopup);
  };

  const discountedPrice = calculateDiscountPrice(
    productData.price,
    productData.discount
  );

  return (
    <div className="">
      <Navbar />
      <div className="pt-24 pb-5 bg-zinc-50 h-auto">
        <div className="grid xl:grid-cols-2 grid-col-1  sm:gap-0 gap-5">
          {/* Image Gallery */}
          <div className="sm:block hidden slider-container">
            <div className="max-w-[700px] gap-5 pb-4 sm:pb-4 grid-cols-2 grid grid-rows-2 m-[auto] xl:pr-4 lg:pr-0 pr-8">
              {productData.primaryImage?.slice(0, 4).map((image, index) => (
                <div key={index}>
                  <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={productData.name || "Product Image"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="slider sm:hidden block">
            <div
              className="slides"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {productData.primaryImage?.slice(0, 4).map((image, index) => (
                <div className="slide" key={index}>
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="prev" onClick={prevSlide}>
              <IoIosArrowBack />
            </button>
            <button className="next" onClick={nextSlide}>
              <IoIosArrowForward />
            </button>
          </div>

          {/* Product Details */}
          <div className="lg:pl-4 pl-4">
            <div>
              <div className="flex flex-row md:gap-4 gap-2">
                <h2 className="md:text-2xl text-lg font-bold pb-1">
                  {productData.name.charAt(0).toUpperCase() +
                    productData.name.slice(1)}
                </h2>
                {/* Share Products TO Social Media */}
                <div
                  className="relative bottom-1 hover:shadow-md active:bg-slate-300 duration-200 w-10 p-2 rounded-3xl"
                  onClick={handleSharePopup}
                >
                  <GoShareAndroid size={25} className="cursor-pointer" />
                </div>
              </div>

              <p className="mb-3 text-gray-400 text-lg">
                {productData.category.charAt(0).toUpperCase() +
                  productData.category.slice(1)}
              </p>

              {productData.discount && productData.discount > 0 ? (
                <div className=" pt-1 font-semibold flex flex-row gap-2">
                  <span className="text-black text-lg">
                    Rs. {discountedPrice}
                  </span>
                  <span className="line-through font-light text-gray-500  text-sm pt-1">
                    Rs. {productData.price}
                  </span>
                  <span className=" text-xs pt-[6px] text-orange-400 font-medium ">
                    ({productData.discount}% OFF)
                  </span>
                </div>
              ) : (
                <span className="pl-[8px] pt-1 text-sm font-semibold">
                  Rs. {productData.price}
                </span>
              )}

              <div className="md:mt-7 mt-4">
                <span className="font-semibold md:font-base text-sm">
                  MORE COLOR
                </span>
                <Color
                  colors={productData.color}
                  onClick={(selectedColor) => setSelectColor(selectedColor)}
                  selectColor={selectColor}
                />
              </div>

              <div className="pt-4">
                <div className="flex flex-row gap-10">
                  <span className="font-semibold pb-2 md:text-base text-sm">
                    SELECT SIZE
                  </span>
                  {/* <button
                    onClick={() => setPopup(true)}
                    className="flex flex-row gap-1 md:text-sm text-xs font-semibold text-blue-400"
                  >
                    SIZE CHART <SlArrowRight className="w-[10px]" />
                  </button> */}
                </div>
                <ul className="flex gap-2 mt-2">
                  {productData.size?.map((size, idx) => (
                    <li
                      key={idx}
                      onClick={() => setSelectSize(size)}
                      className={`w-12 h-12 flex justify-center items-center border rounded-3xl text-xs font-semibold cursor-pointer ${
                        selectSize === size
                          ? "border-black bg-black text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:pt-9 pt-6 flex flex-row gap-4">
                <button
                  onClick={() =>
                    handleAddToCart(productData, selectSize, selectColor)
                  }
                  className="flex flex-row xl:px-20 xl:py-4 px-10 py-4 border bg-blue-600 gap-2 rounded hover:shadow-md active:bg-white active:shadow-none"
                >
                  <Toaster
                    toastOptions={{
                      style: {
                        border: "1px solid #713200",
                        padding: "10px",
                        color: "#713200",
                        position: "relative",
                        left: "640px",
                        top: "60px",
                      },
                    }}
                  />
                  <FiShoppingBag className="relative top-[2px]" /> ADD TO BAG
                </button>
                <button
                  onClick={() => handleAddToWishlist(productData)}
                  className="hidden sm:flex sm:px-14 sm:py-4 border bg-blue-600 gap-2 rounded hover:shadow-md active:bg-white active:shadow-none"
                >
                  {/* <Toaster
                    toastOptions={{
                      className: "relative left-{1000px}",
                      style: {
                        border: "1px solid #713200",
                        padding: "10px",
                        color: "#713200",
                        position: "relative",
                        left: "640px",
                        top: "60px",
                      },
                    }}
                  /> */}
                  <FaRegHeart className="relative top-[2px]" /> FAVORITE
                </button>
                <button className="sm:hidden block py-5 px-6 bg-blue-600 rounded hover:shadow-md active:bg-white active:shadow-none">
                  <FaRegHeart />
                </button>
              </div>
              <div className="pt-4 max-w-[520px]">
                <h2 className="font-bold text-lg pb-2">Product Details</h2>
                <p1 className="text-m text-gray-700">{productData.desc}</p1>
              </div>

              {productData.material?.length > false ? (
                <div className="pt-4">
                  <h3 className="font-bold text-lg pb-2">Product Material</h3>
                  <p1 className="text-gray-700">{productData.material}</p1>
                </div>
              ) : (
                <div></div>
              )}
              <div className=" sm:block hidden">
                <div className="pt-6 grid gap-4">
                  <div className="flex flex-row gap-4">
                    <TbTruckDelivery size={30} className="text-gray-700" />
                    <span className="font-semibold text-gray-700">
                      Fastest delivery available
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <TbCash size={30} className="text-gray-700" />
                    <span className="font-semibold text-gray-700">
                      Pay on delivery available
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <AiOutlineArrowsAlt size={30} className="text-gray-700" />
                    <span className="font-semibold text-gray-700">
                      Easy 14 days return & exchange available
                    </span>
                  </div>
                </div>
              </div>

              <div className=" sm:hidden block">
                <div className="flex flex-row justify-around pt-4 pr-4">
                  <div>
                    <TbTruckDelivery
                      size={30}
                      className="text-gray-700 relative left-5"
                    />
                    <span className="text-xs">Fast Delivery</span>
                  </div>
                  <div>
                    <TbCash
                      size={30}
                      className="text-gray-700 relative left-7"
                    />
                    <span className="text-xs">Pay on Delivery</span>
                  </div>
                  <div>
                    <AiOutlineArrowsAlt
                      size={30}
                      className="text-gray-700 relative left-6"
                    />
                    <span className="text-xs">14 days return</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <span className="font-medium text-gray-700">
                  {" "}
                  100% Original Products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareToSocial
        handleSharePopup={handleSharePopup}
        sharePopup={sharePopup}
        shareUrl={`${window.location.origin}/MenuItem/${productData.id}`}
      />
      <StyleChart handleSize={() => setPopup(true)} popup={popup} />
    </div>
  );
}

export default MenuItem;
