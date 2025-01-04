import { useFireBase } from "../services/firebase"; // Import the custom hook to interact with Firebase
import { useEffect, useState } from "react"; // Import React hooks for state management and side effects
import { useParams } from "react-router-dom"; // Import the useParams hook for accessing URL parameters

// Custom hook for fetching shopping data (products) based on a search name
const ShoppingData = () => {
  // State to store the fetched product data
  const [ProductData, setProductData] = useState([]);
  
  // Get the 'name' parameter from the URL using useParams
  const { name } = useParams();
  
  // Destructuring GetData method from the useFireBase hook to fetch data from Firebase
  const { GetData } = useFireBase();

  // useEffect hook to fetch data when the component mounts or 'name' parameter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data from Firebase using GetData
        let data = await GetData();
        console.log(data); // Log the fetched data for debugging purposes

        // If there's a 'name' parameter in the URL, filter the data based on the search term
        if (name) {
          const nameLower = name.toLowerCase(); // Convert search term to lowercase for case-insensitive comparison
          
          // Filter the products based on the name, category, or gender fields
          data = data.filter(
            (item) =>
              item.name?.toLowerCase().includes(nameLower) || // Match name
              item.category?.toLowerCase().includes(nameLower) || // Match category
              (typeof item.gender === "string"
                ? item.gender
                : item.gender.join("")) // If gender is an array, join it into a string for comparison
                .toLowerCase()
                .includes(nameLower) // Match gender
          );
        }

        // Set the filtered (or unfiltered) data to the ProductData state
        setProductData(data);
      } catch (error) {
        // Log any errors that occur during data fetching
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the fetchData function to initiate the data fetch
  }, [name]); // The effect depends on the 'name' parameter, so it will re-run when 'name' changes

  // Return the fetched product data so it can be used by components consuming this hook
  return { ProductData };
};

export default ShoppingData;
