import { useFireBase } from "../services/firebase"; // Importing the useFireBase hook for Firebase interactions
import { useState, useEffect } from "react"; // Importing React hooks (useState and useEffect) for state management and side effects

const OrderData = () => {
  // Destructuring the methods from useFireBase hook for fetching order data and getting user UID
  const { FetchOrderData, getUserUid } = useFireBase();

  // State to store the fetched order data
  const [orderData, setOrderData] = useState([]);

  // State to handle the loading state
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch order data when the component mounts
  useEffect(() => {
    // Function to fetch order data asynchronously
    const fetchOrder = async () => {
      try {
        const uid = getUserUid(); // Get the UID of the current user
        if (uid) {
          // Fetch order data using the FetchOrderData function
          const data = await FetchOrderData(uid);

          // If data is fetched successfully, update the orderData state
          setOrderData(data || []); // Default to an empty array if no data is returned
          console.log("Fetched Order Data:", data); // Log the fetched data to console
        }
      } catch (error) {
        // Log any errors that occur during the data fetching process
        console.error("Error fetching order data:", error);
      } finally {
        // Set loading state to false after fetching data (whether successful or not)
        setLoading(false);
      }
    };

    fetchOrder(); // Call the fetchOrder function to initiate data fetching
  }, [getUserUid, FetchOrderData]); // Dependencies: the effect will re-run if either getUserUid or FetchOrderData changes

  // Return the orderData and loading state to be used by the component that calls OrderData
  return { orderData, loading };
};

export default OrderData;
