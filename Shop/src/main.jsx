import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { routes } from "./routes.jsx";
import { store } from "./store/store.js";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";
import GlobalErrorMessage from "./shared/components/GlobalErrorMessage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorProvider>
        <RouterProvider router={routes} />
        <GlobalErrorMessage />
      </ErrorProvider>
    </Provider>
  </StrictMode>
);
