import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LifeOSProvider } from "./context/LifeOSContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LifeOSProvider>
      <App />
    </LifeOSProvider>
  </StrictMode>
);