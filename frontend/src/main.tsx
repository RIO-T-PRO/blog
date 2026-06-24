import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./lib/context/auth-context";
import { RoleApplicationProvider } from "./lib/context/role-application";
import { ArticleProvider } from "./lib/context/article";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoleApplicationProvider>
          <ArticleProvider>
            <ArticleProvider>
              <App />
            </ArticleProvider>
          </ArticleProvider>
        </RoleApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
