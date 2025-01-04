import { FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../../assets/alleyes.jpg'
import Shield from '../../../assets/shield.png'


const CartNav = () => {
  return (
    <div>
      {/* CART NAVBAR MIN-768 PX */}
      <div className="md:block hidden ">
        <div className="flex justify-between">
          <div className="flex flex-row cursor-pointer pl-14">
            <img
              className="w-[30px] h-[28px] relative top-4 pl-0"
              src={logo}
              alt="Logo"
            />
            <Link to="/">
              <h1 className="pl-4 pt-3 text-2xl">alleyes</h1>
            </Link>
          </div>
          <div className="flex flex-row items-center relative right-[80px] gap-2">
            <img
              className="w-[35px] h-[50px] pt-4 relative left-0"
              src= {Shield}
              alt="Shield"
            />
            <h2 className="relative top-3 text-sm">100% SECURE</h2>
          </div>
        </div>
      </div>

      {/* CART NAVBAR MOBILE */}
      <div className="md:hidden block mx-4 mt-6">
        <div className="flex justify-between">
          <div className="flex flex-row gap-2">
            <span className="relative bottom-0.5">
              <FaArrowLeft className="w-6 h-6" />
            </span>
            <h2 className="text-sm">SHOPPING BAG</h2>
          </div>
          <div>
            <FaRegHeart className="w-6 relative bottom-2 h-10" />
          </div>
        </div>
      </div>

      {/* CENTRE LINE */}
      <div className="w-full bg-gray-300 h-[0.5px] lg:mt-4 mt-1"></div>
    </div>
  );
};

export default CartNav;
