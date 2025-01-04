import "../styles/features.css";
import logo from '../../assets/logo.jpg'

function Loader() {
  return (
    <div className="absolute inset-0 right-5 left-0 bottom-10 flex items-center justify-center dark:bg-white">
      <div className="w-[400px]  loader">
        <img className="" src={logo}/>
        <h1 className="flex justify-center relative bottom-12 left-4 text-[50px] ">
          alleyes
        </h1>
      </div>
    </div>
  );
}

export default Loader;
