import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home.jsx";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ShoppingCart from "./components/features/product/ShoppingCart.jsx";
import Loader from "./components/common/Loader.jsx";
import SearchHome from "./components/features/search-bar/SearchHome.jsx";
import Error from "./components/common/Error.jsx";
import MenuItem from "./components/features/product/MenuItem.jsx";
import MainCart from "./components/features/cart/MainCart.jsx";
import OverviewCart from "./components/features/cart/OverviewCart";
import DataLoader from "./components/common/DataLoader.jsx";
import Wishlist from "./components/features/wishlist/Wishlist.jsx";
import Order from './components/features/order/Order.jsx'
import OrderItem from "./components/features/order/OrderItem.jsx";
import OrderConfirm from "./components/features/order/OrderConfirm.jsx";
import Arrivals from "./components/features/product/Arrivals.jsx";

const router = createBrowserRouter([
  {
   
    errorElement: <Error />,

    children: [
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/signup/login", element: <Login /> },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchHome />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/MenuItem/:id",
        element: <MenuItem />,
      },
      {
        path: "/Arrivals",
        element: <Arrivals />,
      },
      {
        path: "/MainCart",
        element: <MainCart />,
      },
      {
        path: "/OverviewCart",
        element: <OverviewCart />,
      },
      {
        path: "/ShoppingCart",
        element: <ShoppingCart />,
      },
      {
        path: "/ShoppingCart/:name",
        element: <ShoppingCart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/Data",
        element: <DataLoader />,
      },
      {
        path: "/Order",
        element: <Order />,
      },
      {
        path: "/OrderItem/:orderId/:itemId",
        element: <OrderItem />,
      },
      {
        path: "/OrderConfirm",
        element: <OrderConfirm />,
      },
      // {
      //   path: "/OrderItemFetching",
      //   element: <OrderItemFetching />,
      // },
      {
        path: "/loader",
        element: <Loader />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </div>
  );
}

export default App;
