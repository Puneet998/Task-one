// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
// import { CookiesProvider } from "react-cookie";


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CookiesProvider>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//     </CookiesProvider>
//   </StrictMode>
// )



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);