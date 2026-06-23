import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./lib/context/auth-context";
import { RoleApplicationProvider } from "./lib/context/role-application";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoleApplicationProvider>
          <App />
        </RoleApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
