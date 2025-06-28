import { createBrowserRouter } from "react-router";
import publicRoutes from "./public/publicRoutes.jsx";
import adminRoutes from "./admin/adminRoutes.jsx";

export const routes = createBrowserRouter([...publicRoutes, ...adminRoutes]);
