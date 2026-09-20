import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories = [] }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => {
        const categoryId = category?._id || category?.id;

        return (
          <CategoryCard
            key={categoryId}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;