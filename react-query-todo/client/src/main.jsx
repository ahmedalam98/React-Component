import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// queryClient is an instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // client --> special prop
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
