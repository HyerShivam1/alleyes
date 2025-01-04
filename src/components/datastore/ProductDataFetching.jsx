import { useState, useEffect } from "react"; // Importing React hooks for state management and side effects
import { useFireBase } from "../services/firebase"; // Importing the custom useFireBase hook to interact with Firebase

// Custom hook for fetching product data and managing selected size and color
const ProductDataFetching = (itemId) => {
  // State to store product data, selected size, and selected color
  const [productData, setProductData] = useState(null);
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");

  // Destructuring GetData method from the useFireBase hook
  const { GetData } = useFireBase();

  // useEffect hook to fetch product details when itemId changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product data using GetData method from Firebase
        const data = await GetData();
        
        // Find the product with the matching itemId
        const product = data.find((item) => item.id === itemId);
        setProductData(product); // Set the fetched product data to the state

        // Set default size and color if available in the product data
        if (product?.size?.length > 0) setSelectSize(product.size[0]);
        if (product?.color?.length > 0) setSelectColor(product.color[0]);
      } catch (error) {
        // Log error if fetching product data fails
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductDetails(); // Call the fetchProductDetails function to fetch product data
  }, [itemId, GetData]); // Dependencies: the effect will run again if itemId or GetData changes

  // Return the product data, selected size, selected color, and setters for size and color
  return {
    productData,
    selectSize,
    selectColor,
    setSelectSize,
    setSelectColor,
  };
};

export default ProductDataFetching;
