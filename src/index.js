//
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DishList from "./page/DishList";
import Statistical from "./page/Statistical";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App/>
);
