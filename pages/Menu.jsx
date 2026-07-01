import { useEffect, useState } from "react";
import Categories from "../src/components/Categories";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Product from "../src/components/Product";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Menu({ categories, products }) {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products?.filter(
          (product) => product.category.title === activeCategory,
        );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchMenuData() {
      const myParams = {};
      if (searchText.trim()) myParams.search = searchText;
      if (activeCategory && activeCategory !== "all")
        myParams.category = activeCategory;

      try {
        const apiUrl = import.meta.env.VITE_BASE_URL;
        const { data } = await axios.get(`${apiUrl}/home`, {
          params: myParams,
        });

        setDisplayedProducts(data.products);
      } catch (error) {
        toast.error("sothing went wrong", {
          id: "error",
        });
      }
    }

    fetchMenuData();
  }, [searchText, activeCategory]);

  return (
    <div>
      <Toaster id="error" />
      <header>
        <div className="container flex justify-between items-center px-7.5 py-9">
          <img src="../src/assets/img/Group 2.svg" alt="" />

          <div className="flex justify-between gap-x-4 border-2 px-3 py-1 rounded-lg border-[#5F4841]">
            <input
              className="w-[70%] font-cursive border-0 outline-0"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="search"
            />
            <button className="size-5 bg-transparent cursor-pointer text-[#3d2b26]">
              <MagnifyingGlassIcon />
            </button>
          </div>

          <h2 className="font-cursive text-4xl text-primary select-none">
            sefr coffee
          </h2>
        </div>
      </header>

      <main>
        <section>
          <div className="container flex flex-nowrap items-center overflow-x-auto gap-x-5 pt-8 category-wrp">
            <Categories
              categories={categories}
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
            />
          </div>
        </section>
        <section>
          {/* <!-- products wrp --> */}

          <div className="container py-10 px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-y-10 product-wrp">
            {displayedProducts?.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-2xl text-[#5F4841] font-cursive mb-2">
                  No products found! 🔍
                </p>
              </div>
            ) : (
              <Product
                products={
                  displayedProducts ? displayedProducts : filteredProducts
                }
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Menu;
