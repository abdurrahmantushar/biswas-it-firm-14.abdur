import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Discovery from "../components/discovery/Discovery";
import Categories from "../components/categories/Categories";
import CategoryProducts from "../components/categories/CategoryProducts";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import CreateRequest from "../components/requests/CreateRequest";
import Requests from "../pages/Requests/Requests";
import RequestDetails from "../pages/Requests/RequestDetails";
import BuyerDashboard from "../pages/Buyer/BuyesDashboard";
import SavedProducts from "../pages/Buyer/SavedProducts";
import Profile from "../pages/Buyer/Profile";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Users from "../pages/Admin/Users";
import Sources from "../pages/Admin/Sources";
import AdminRequests from "../pages/Admin/Request";
import AdminRoute from "../components/auth/AdminRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";
import FulfillmentDashboard from "../pages/Admin/FulfillmentDashboard";
import FulfillmentOrders from "../pages/Admin/FulfillmentOrders";
import FulfillmentOrderDetails from "../pages/Admin/FulfillmentOrderDetails";
import AdminLayout from "../components/layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/discovery",
        element: <Discovery />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/:id",
        element: <CategoryProducts />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/requests/create",
            element: <CreateRequest />,
          },
          {
            path: "/requests",
            element: <Requests />,
          },
          {
            path: "/requests/:id",
            element: <RequestDetails />,
          },
          {
            path: "/buyer",
            element: <BuyerDashboard />,
          },
          {
            path: "/buyer/profile",
            element: <Profile />,
          },
          {
            path: "/buyer/saved-products",
            element: <SavedProducts />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout/>,
            children: [
              {
                path: "/admin",
                element: <AdminDashboard />,
              },
              {
                path: "/admin/users",
                element: <Users />,
              },
              {
                path: "/admin/sources",
                element: <Sources />,
              },
              {
                path: "/admin/requests",
                element: <AdminRequests />,
              },
              {
                path: "/admin/fulfillment",
                element: <FulfillmentDashboard />,
              },  
              {
                path: "/admin/fulfillment/orders",
                element: <FulfillmentOrders />,
              },  
              {
                path: "/admin/fulfillment/orders/:id",
                element: <FulfillmentOrderDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;