import Navbar from "../../common/Navbar";
import Coming from '../../../assets/coming-soon.png'

const Arrivals = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex justify-center sm:pt-0 pt-48 sm:pr-0 pr-4">
        <img
          className=" sm:h-[690px] h-[400px]"
          src={Coming}
        />
      </div>
    </div>
  );
};

export default Arrivals;
