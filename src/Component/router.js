// src/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Router/MainLayout";
import Home from "./Router/Home";
import About from "./Router/About";
import Contact from "./Router/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home/> }, 
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;
