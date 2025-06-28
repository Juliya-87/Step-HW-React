import { redirect } from "react-router";
import { AuthGuard } from "../shared/components/AuthGuard.jsx";
import withLazyLoad from "../shared/hoc/withLazyLoad.jsx";

const AdminLayout = withLazyLoad(() => import("./layouts/AdminLayout.jsx"));
const AdminProducts = withLazyLoad(() => import("./pages/AdminProducts.jsx"));
const AddProduct = withLazyLoad(() => import("./pages/AddProduct.jsx"));
const EditProduct = withLazyLoad(() => import("./pages/EditProduct.jsx"));
const AdminLogin = withLazyLoad(() => import("./pages/AdminLogin.jsx"));
const NotFound = withLazyLoad(() => import("../shared/pages/NotFound.jsx"));

const adminRoutes = [
  {
    path: "/admin",
    children: [
      {
        Component: AdminLayout,
        children: [
          {
            path: "login",
            Component: AdminLogin,
          },
          {
            path: "not-found",
            Component: NotFound,
          },
          {
            path: "*",
            loader: () => redirect("/admin/not-found"),
          },
        ],
      },
      {
        Component: () => (
          <AuthGuard role="admin" redirectPath="/admin/login">
            <AdminLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            Component: AdminProducts,
          },
          {
            path: "products/add",
            Component: AddProduct,
          },
          {
            path: "products/:id/edit",
            Component: EditProduct,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
