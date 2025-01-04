import { useState, useEffect } from "react"; // Importing React hooks (useState, useEffect) for state management and side effects
import { useFireBase } from "../services/firebase"; // Importing the custom useFireBase hook to interact with Firebase

const useOrderItemFetching = (orderId, itemId) => {
  // State to store the fetched order data, product data, loading state, and error messages
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Destructuring the Firebase methods from the useFireBase hook
  const { FetchOrderData, getUserUid } = useFireBase();

  // useEffect hook to fetch order and product details when the orderId or itemId changes
  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        // Set loading state to true and reset any previous error
        setLoading(true);
        setError(null);

        // Get the current user UID
        const uid = getUserUid();
        if (!uid) throw new Error("User UID is undefined."); // If UID is undefined, throw an error

        // Fetch order data using FetchOrderData method
        const data = await FetchOrderData(uid);
        
        // Find the order with the specified orderId
        const order = data?.find((order) => order.orderId === orderId);
        if (!order) {
          throw new Error("Order ID not found."); // If the order is not found, throw an error
        }

        // Find the product with the specified itemId within the found order
        const product = order.products.find(
          (product) => product.itemId === itemId
        );
        if (!product) {
          throw new Error("Order product not found."); // If the product is not found, throw an error
        }

        // Set the order and product states with the fetched data
        setOrder(order);
        setProduct(product);
      } catch (err) {
        // If an error occurs, set the error state with the error message
        setError(
          err.message || "An error occurred while fetching the order data."
        );
      } finally {
        // Set loading state to false once data fetching is completed (whether successful or not)
        setLoading(false);
      }
    };

    fetchOrderItem(); // Call the fetchOrderItem function to fetch the order and product details
  }, [itemId, orderId, FetchOrderData, getUserUid]); // Dependencies: the effect will re-run if any of these values change

  // Return the order, product, loading state, and error message for use by the component calling this hook
  return { order, product, loading, error };
};

export default useOrderItemFetching;
