import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="w-full h-screen text-3xl flex items-center justify-center text-stone-500">
          Something went wrong 💔
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
