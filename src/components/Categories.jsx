function Categories({ categories, activeCategory, setActiveCategory }) {
  return (
    <>
      {/* add all category first */}
      <span
        className={`category-item cursor-pointer ${activeCategory === "all" ? "category-item--active" : ""}`}
        onClick={() => setActiveCategory("all")}
      >
        all
      </span>

      {categories?.map((category) => (
        <CategoriesItem
          key={category.id}
          category={category}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </>
  );
}

function CategoriesItem({ category, activeCategory, setActiveCategory }) {
  return (
    <span
      className={`category-item cursor-pointer ${activeCategory === category.title ? "category-item--active" : ""}`}
      onClick={() => setActiveCategory(category.title)}
    >
      {category.title}
    </span>
  );
}

export default Categories;
