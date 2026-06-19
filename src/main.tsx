import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { ThemeProvider } from "./lib/theme";
import { ProgressProvider } from "./lib/progress";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MotionConfig>
      </ProgressProvider>
    </ThemeProvider>
  </React.StrictMode>
);
