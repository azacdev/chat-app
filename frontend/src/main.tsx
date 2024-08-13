import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import { SocketContextProvider } from "@/context/socket-context.tsx";
import { AuthContextProvider } from "@/context/auth-context.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
        <Toaster />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
