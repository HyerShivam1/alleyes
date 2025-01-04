import { useFireBase } from "../services/firebase";
import { useState, useEffect } from "react";
const SearchData = () => {
  const [productData, setProductData] = useState([]);
  const { GetData } = useFireBase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetData();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  });
  return { productData };
};

export default SearchData;
