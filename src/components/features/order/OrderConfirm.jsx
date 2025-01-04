import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import "../../styles/design.css";
import { useFireBase } from "../../services/firebase";
import { useEffect } from "react";
import Check from '../../../assets/check.png'


const OrderConfirm = () => {
    const firebase = useFireBase();
    const navigate = useNavigate();
  
  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase.isLoggedIn, navigate]);


  return (
    <div>
      <Navbar />

      {/* FOR THE LAPTOP & TABLETS */}
      <div className=" pt-24 gap-4 px-6 sm:block hidden">
        <div className="p-6 bg-slate-300 flex flex-row justify-between">
          <div className="">
            <h2 className="lg:text-7xl text-4xl font-bold text-gray-800">
              Thanks for Your Order!
            </h2>
           
          <Link to="/order">
           <span className="block mt-4 text-blue-500 cursor-pointer">
              Check your order here
            </span>
            </Link> 
         
          </div>
          <div className="pr-10">
            <img
              src={Check}
              alt="Order Success"
              className="lg:mt-6 mt-0 lg:w-40 w-32 object-contain orderConfirm"
            />
          </div>
        </div>
      </div>

     

      {/* FOR THE MOBILE ONLY */}

      <div className="sm:hidden block ">
        <div className="flex justify-center items-center h-screen bg-slate-300">
          <div className="flex flex-col">
        <img
              src={Check}
              alt="Order Success"
              className=" w-[40px] relative left-[75px] object-contain orderConfirm"
              />
              <h2 className="text-lg font-semibold "> Thanks for Your Order!</h2>
              <Link to="/order">
           <span className=" relative left-3 text-blue-500 cursor-pointer">
              Check your order here
            </span>
            </Link> 
              </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
