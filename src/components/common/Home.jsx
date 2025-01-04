import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/features.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatButton from "./FloatButton";
import Loader from "./Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  var settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 3,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const data = [
    {
      img: `./src/assets/watch.webp`,
      desc: `Watches & Wearables`,
      disc: `40-50% OFF`,
    },
    {
      img: `./src/assets/men-sports.jpg`,
      desc: `Men's Activewear`,
      disc: `30-40% OFF`,
    },
    {
      img: `./src/assets/women-sport.webp`,
      desc: `Women's Activewear`,
      disc: `20-30% OFF`,
    },
    {
      img: `./src/assets/women-traditional.webp`,
      desc: `Women's Traditional`,
      disc: `10-20% OFF`,
    },
    {
      img: `./src/assets/mens-casual-shirts.jpg`,
      desc: `Men's Casual`,
      disc: `40-50% OFF`,
    },
    {
      img: `./src/assets/mens-footwear.jpg`,
      desc: `Men's Casual Footwear`,
      disc: `30-40% OFF`,
    },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FloatButton />
          <Navbar />
          <div className="bg-background w-full min-w-20 h-screen bg-cover bg-local bg-center bg-no-repeat justify-center items-center flex px-0 dark:brightness-90 ">
            <div className="text-white grid gap-4">
              <h2 className="flex justify-center text-4xl font-bold px-[35px]">
                Made from Nature. Designed for Sun.
              </h2>
              <p className="flex justify-center font-medium text-lg px-[35px]">
                Shop all made with light & breezy eucalyptus tree fiber.
              </p>

              <div className="flex flex-row justify-center gap-6 text-xs font-bold text-black px-[35px] ">
                <Link to="/shoppingCart/male">
                  <button className="bg-slate-100 px-10 py-3 dark:bg-gray-900 dark:text-white ">
                    SHOP MEN
                  </button>
                </Link>
                <Link to="/shoppingCart/female">
                  <button className="bg-slate-100 px-7 py-3 dark:bg-gray-900 dark:text-white">
                    SHOP WOMEN
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 pl-6 dark:bg-gray-800">
            <Slider {...settings}>
              {data.map((d, key) => (
                <div
                  key={key}
                  className="max-h-[1080px] border-4 border-yellow-400 p-1 bg-pink-600 cursor-pointer dark:brightness-90 "
                >
                  <div className="relative right-4">
                    <img
                      className="w-full h-96  object-cover"
                      src={d.img}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col items-center p-2">
                    <h2 className="text-white font-medium">{d.desc} </h2>
                    <h4 className="text-white font-bold text-2xl">{d.disc}</h4>
                    <h3 className="text-white text-base">Shop Now</h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <Footer />{" "}
        </div>
      )}
    </div>
  );
};

export default Home;
