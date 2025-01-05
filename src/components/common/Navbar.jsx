/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../../components/styles/features.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { useFireBase } from "../services/firebase";
import { useSelector } from "react-redux";
import { getQuantity } from "../features/cart/cartSlice";

function DropdownItem({ link, text, onClick }) {
  return (
    <ul>
      <li className="dropdownItem py-[5px] cursor-pointer" onClick={onClick}>
        {link ? <Link to={link}>{text}</Link> : text}
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(null);
  const { isLoggedIn, signout, user } = useFireBase();
  const location = useLocation();
  const dropdownRef = useRef(null); // Ref for dropdown
  const menuRef = useRef(null); // Ref for menu
  const totalQuantity = useSelector(getQuantity);

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setOpen(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="fixed border border-slate-200 z-10 w-full top-[70px] "></div>
      <div className="md:px-10 px-4 py-4 h-[70px] pb-2 flex flex-row justify-between z-10 bg-white w-full fixed ">
        {/* Nav Components - MEN, WOMEN, STORES, ARRIVALS */}
        <ul className="flex-row gap-4 justify-start relative top-2 md:flex hidden xl:pl-5 pl-0 ">
          <Link
            to="/ShoppingCart/male"
            className={`cursor-pointer hover:underline hover:text-blue-600 decoration-blue-600 underline-offset-8 ${
              location.pathname === "/ShoppingCart/male"
                ? "underline decoration-blue-600 text-blue-600"
                : ""
            }`}
          >
            <li>MEN</li>
          </Link>
          <Link
            to="/ShoppingCart/female"
            className={`cursor-pointer hover:underline hover:text-blue-600 decoration-blue-600 underline-offset-8 ${
              location.pathname === "/ShoppingCart/female"
                ? "underline decoration-blue-600 text-blue-600"
                : ""
            }`}
          >
            <li>WOMEN</li>
          </Link>
          <Link
            to="/Arrivals"
            className={`cursor-pointer hover:underline hover:text-blue-600 decoration-blue-600 underline-offset-8 ${
              location.pathname === "/Arrivals"
                ? "underline decoration-blue-600 text-blue-600"
                : ""
            }`}
          >
            <li>ARRIVALS</li>
          </Link>
          <Link
            to="/ShoppingCart"
            className={`cursor-pointer hover:underline hover:text-blue-600 decoration-blue-600 underline-offset-8 ${
              location.pathname === "/ShoppingCart"
                ? "underline decoration-blue-600 text-blue-600"
                : ""
            }`}
          >
            <li>STORES</li>
          </Link>
        </ul>

        {/* LOGO */}
        <Link to="/">
          <h1 className="md:pr-24 pr-0 flex items-center justify-center text-3xl cursor-pointer sticky left-10">
            alleyes
          </h1>
        </Link>

        <div className="flex lg:gap-5 gap-1 p-0">
          {/* Icons */}
          <Link to="/Search">
            <FaMagnifyingGlass size={20} className="relative top-[8px] lg:left-[8px] left-0" />
          </Link>
          <Link to="/Wishlist">
            <FaRegHeart size={22} className="relative lg:left-4 left-[10px] top-[7px]" />
          </Link>
          <Link to="/MainCart">
            <div className="px-1 top-[1.50px]">
              <FaShoppingCart size={20} className="top-[9.5px] relative left-[17px] cursor-pointer" />
              <h2 className="bg-black text-white rounded-3xl w-4 h-4 flex justify-center text-xs relative bottom-[1.2rem] left-[1.9rem] dark:bg-white dark:text-black">
                {totalQuantity}
              </h2>
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="menu-container hidden md:block">
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <BsFillPersonFill size={25} className="cursor-pointer lg:block hidden relative top-[6px] left-4" />
            </div>
            <div
              className={`absolute top-[70px] z-1000 right-[50px] bg-white dark:bg-black dropdown-menu ${
                open ? "active" : "inactive"
              }`}
            >
              <ul className="p-2">
                {isLoggedIn ? (
                  <ul>
                    <DropdownItem link={""} text={`Welcome, ${user?.displayName || "User"}`} />
                    <DropdownItem link={"/Order"} text="Orders" />
                    <DropdownItem link={""} text="Help" />
                    <DropdownItem onClick={handleSignOut} text="Logout" />
                  </ul>
                ) : (
                  <ul>
                    <DropdownItem link={"/login"} text={"Login/Signup"} />
                  
                  </ul>
                )}
              </ul>
            </div>
          </div>

          {/* Menu Dropdown */}
          <div ref={menuRef} className="menu-container px-2">
            <div
              className="menu-trigger"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <RiMenu3Fill className="w-6 h-7 relative top-[5px] left-4 cursor-pointer lg:hidden block" />
            </div>
            <div
              className={`absolute top-[70px] right-[50px] z-96 bg-gray-100 dark:bg-black container ${
                menuOpen ? "active" : "inactive"
              }`}
            >
              {isLoggedIn ? (
                <ul>
                  <DropdownItem link={""} text={`Welcome, ${user?.displayName || "User"}`} />
                  <DropdownItem link={"/order"} text={"Orders"} />
                  <DropdownItem link={"/ShoppingCart/male"} text={"Men"} />
                  <DropdownItem link={"/ShoppingCart/female"} text={"Women"} />
                  <DropdownItem link={"/"} onClick={handleSignOut} text={"Logout"} />
                </ul>
              ) : (
                <ul>
                  <DropdownItem link={"login"} text={"Login"} />
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
