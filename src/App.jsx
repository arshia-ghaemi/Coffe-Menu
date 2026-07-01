import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Start from "../pages/Start";
import Menu from "../pages/Menu";

import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_BASE_URL;
        const { data } = await axios.get(`${apiUrl}/home/`);
        setCategoriesData(data.categories);
        setProductsData(data.products);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong", {
          id: "error",
        });
      }
    }

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Toaster id="error" />

      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/menu"
          element={<Menu categories={categoriesData} products={productsData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
