import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
