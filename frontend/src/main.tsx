import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthContextProvider } from "@/context/auth-context.tsx";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <Toaster />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
