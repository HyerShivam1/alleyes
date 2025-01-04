import { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../styles/search.css";
import SearchData from "../../datastore/SearchData";
import Camera from '../../../assets/camera.png'
import Photo from '../../../assets/photo.png'

function SearchHome() {
  const { productData } = SearchData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filteredResults, setFilteredResults] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = productData.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          (typeof item.gender === "string" ? item.gender : item.gender.join(""))
            .toLowerCase()
            .includes(query)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
    setActiveIndex(-1);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredResults([]);
    }
  };

  const handleKeyDown = (event) => {
    if (filteredResults.length === 0) return;

    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < filteredResults.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredResults.length - 1
      );
    } else if (event.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredResults.length) {
        handleItemClick(filteredResults[activeIndex]);
      } else if (searchQuery.trim() !== "") {
        handleSearchClick();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    navigate(`/ShoppingCart/${item.name}`, { state: { item } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchClick = () => {
    if (!searchQuery) {
      return null;
    }
    navigate(`/ShoppingCart/${searchQuery}`);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center pl-4 md:p-4 md:pr-8 sm:py-4 sm:pr-4 py-4 pr-4">
        <div className="relative right-2 z-10 top-2 sm:top-3">
          <FaArrowLeft
            size={22}
            className="cursor-pointer"
            onClick={handleBack}
          />
        </div>
        <div className="w-full relative" ref={dropdownRef}>
          <input
            placeholder="Search in alleyes store"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="md:border-2 border-0 w-[100%]  px-4 sm:px-6 sm:py-3 py-2 rounded-md md:text-md text:sm"
          />
          {/* Dropdown List */}
          {filteredResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto">
              {filteredResults.map((item, index) => (
                <div
                  key={index}
                  className={`block px-4 py-2 text-sm text-gray-800 cursor-pointer ${
                    activeIndex === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)} -{" "}
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute sm:right-[60px] right-6 sm:top-[30px]  top-[28px]">
          <FaMagnifyingGlass
            onClick={handleSearchClick}
            size={20}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Photo Search Section */}
      <h2 className="flex justify-center pb-4 text-sm font-semibold dark:bg-gray-800 dark:text-white">
        PHOTO SEARCH
      </h2>

      <div className="flex px-4 justify-center gap-3 dark:bg-gray-800">
        {/* Camera Search */}
        <button>
          <div className="border-2 border-black flex min-w-[120px] justify-between items-center py-3 gap-6 rounded-sm cursor-pointer">
            <img
              className="max-w-4"
              src={Camera}
              alt="camera"
            />
            <span className="pl-0 text-xs pr-2">Click a photo</span>
          </div>
        </button>
        {/* Folder Image Search */}
        <button>
          <div className="border-2 border-black flex min-w-[120px] justify-between items-center py-3 gap-6 rounded-sm cursor-pointer">
            <img className="max-w-4" src={Photo} alt="photo" />
            <span className="pl-0 text-xs pr-2">Select a photo</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SearchHome;
