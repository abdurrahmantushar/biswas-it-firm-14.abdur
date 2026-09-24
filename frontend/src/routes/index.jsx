import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";

const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));

const Discovery = lazy(() => import("../components/discovery/Discovery"));
const Categories = lazy(() => import("../components/categories/Categories"));

const CategoryProducts = lazy(() =>
  import("../components/categories/CategoryProducts")
);
const ProductDetailsPage = lazy(() =>
  import("../pages/Products/ProductDetailsPage")
);
const CreateRequest = lazy(() =>
  import("../components/requests/CreateRequest")
);
const Requests = lazy(() => import("../pages/Requests/Requests"));
const RequestDetails = lazy(() =>
  import("../pages/Requests/RequestDetails")
);
const BuyerDashboard = lazy(() =>
  import("../pages/Buyer/BuyesDashboard")
);
const SavedProducts = lazy(() =>
  import("../pages/Buyer/SavedProducts")
);
const Profile = lazy(() => import("../pages/Buyer/Profile"));
const AdminDashboard = lazy(() =>
  import("../pages/Admin/AdminDashboard")
);
const Users = lazy(() => import("../pages/Admin/Users"));
const Sources = lazy(() => import("../pages/Admin/Sources"));
const AdminRequests = lazy(() =>
  import("../pages/Admin/Request")
);
const FulfillmentDashboard = lazy(() =>
  import("../pages/Admin/FulfillmentDashboard")
);
const FulfillmentOrders = lazy(() =>
  import("../pages/Admin/FulfillmentOrders")
);
const FulfillmentOrderDetails = lazy(() =>
  import("../pages/Admin/FulfillmentOrderDetails")
);
const Loading = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <p className="text-sm text-slate-500">Loading...</p>
  </div>
);

const withSuspense = (element) => (
  <Suspense fallback={<Loading />}>
    {element}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/register",
    element: withSuspense(<Register />),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/discovery",
        element: withSuspense(<Discovery />),
      },
      {
        path: "/categories",
        element: withSuspense(<Categories />),
      },
      {
        path: "/categories/:id",
        element: withSuspense(<CategoryProducts />),
      },
      {
        path: "/products/:id",
        element: withSuspense(<ProductDetailsPage />),
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
            element: withSuspense(<CreateRequest />),
          },
          {
            path: "/requests",
            element: withSuspense(<Requests />),
          },
          {
            path: "/requests/:id",
            element: withSuspense(<RequestDetails />),
          },
          {
            path: "/buyer",
            element: withSuspense(<BuyerDashboard />),
          },
          {
            path: "/buyer/profile",
            element: withSuspense(<Profile />),
          },
          {
            path: "/buyer/saved-products",
            element: withSuspense(<SavedProducts />),
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin",
                element: withSuspense(<AdminDashboard />),
              },
              {
                path: "/admin/users",
                element: withSuspense(<Users />),
              },
              {
                path: "/admin/sources",
                element: withSuspense(<Sources />),
              },
              {
                path: "/admin/requests",
                element: withSuspense(<AdminRequests />),
              },
              {
                path: "/admin/fulfillment",
                element: withSuspense(<FulfillmentDashboard />),
              },
              {
                path: "/admin/fulfillment/orders",
                element: withSuspense(<FulfillmentOrders />),
              },
              {
                path: "/admin/fulfillment/orders/:id",
                element: withSuspense(<FulfillmentOrderDetails />),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;