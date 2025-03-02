import React from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import "./styles/colors.css";
import { AuthProvider } from "./contexts/AuthContext";

const appElement = document.getElementById("root") as HTMLElement;

Modal.setAppElement(appElement);

const root = ReactDOM.createRoot(appElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
