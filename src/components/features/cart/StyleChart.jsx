import { RxCross1 } from "react-icons/rx";
/* eslint-disable react/prop-types */

const StyleChart = ({ popup, handleSize }) => {
  return (
    <div>
      {popup && (
        <div className="h-full w-screen absolute top-0 left-0  grid grid-cols-2 backdrop-blur-3xl pt-16 ">
          <div></div>
          <div className=" duration-200 p-4 shadow-md w-100% bg-gray-50">
            <h2 className="flex justify-center text-lg font-semibold">
              Measurement Guide
            </h2>
            <button onClick={handleSize}>
              <RxCross1 className="w-6 h-6 relative bottom-7" />
            </button>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleChart;
