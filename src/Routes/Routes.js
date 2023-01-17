import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AllProducts from "../pages/AllProducts/AllProducts";
import Blog from "../pages/Blog/Blog";
import AddProduct from "../pages/Dashboard/AddProducts/AddProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../pages/Dashboard/MyProduct.js/MyProduct";
import Payment from "../pages/Dashboard/PaymentSystem/Payment";
import Welcome from "../pages/Dashboard/WelcomeDashboard/Welcome";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://react-assignment-resale-products-server.vercel.app/products/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Welcome></Welcome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <MyOrders></MyOrders>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myproduct",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyProduct></MyProduct>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://react-assignment-resale-products-server.vercel.app/booking/${params.id}`
          ),
      },
    ],
  },
]);
