import Navbar from "../../common/Navbar";

const Arrivals = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex justify-center sm:pt-0 pt-48 sm:pr-0 pr-4">
        <img
          className=" sm:h-[690px] h-[400px]"
          src="../src/assets/coming-soon.png"
        />
      </div>
    </div>
  );
};

export default Arrivals;
