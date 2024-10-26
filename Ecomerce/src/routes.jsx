import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/layout";
import Home from "./Pages/home";
import ProductDetails from "./Pages/productDetails";
import Login from "./Pages/login";
import Register from "./Pages/register/register";
import AddProduct from "./Pages/addProduct";
import MyProduct from "./Pages/myProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import Cart from "./Components/cart";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'productDetails/:id',
        element: <ProductDetails />,
      },
      {
        path: 'product',
        element: <AddProduct />,
      },
      {
        path: "myproduct/:id", // Route with dynamic user ID
        element: <MyProduct />
      },
      {
        path: "update-product/:id", // Route with dynamic user ID
        element: <UpdateProduct />
      },
      {
        path: "cart", // Route with dynamic user ID
        element: <Cart />
      }
    ]
  }
]);

export default routes;
