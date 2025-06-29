import { redirect } from "react-router";
import withLazyLoad from "../shared/hoc/withLazyLoad.jsx";

const Layout = withLazyLoad(() => import("./layouts/Layout.jsx"));
const Products = withLazyLoad(() => import("./pages/Products.jsx"));
const NotFound = withLazyLoad(() => import("../shared/pages/NotFound.jsx"));
const Product = withLazyLoad(() => import("./pages/Product.jsx"));
const Cart = withLazyLoad(() => import("./pages/Cart.jsx"));
const Login = withLazyLoad(() => import("./pages/Login.jsx"));
const Register = withLazyLoad(() => import("./pages/Register.jsx"));

const publicRoutes = [
  {
    Component: Layout,
    path: "/",
    children: [
      {
        index: true,
        Component: Products,
      },
      {
        path: "products/:productId",
        Component: Product,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "not-found",
        Component: NotFound,
      },
      {
        path: "*",
        loader: () => redirect("/not-found"),
      },
    ],
  },
];

export default publicRoutes;
