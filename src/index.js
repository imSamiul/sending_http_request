import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import AppWithAxios from "./AppWithAxios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWithAxios />);
