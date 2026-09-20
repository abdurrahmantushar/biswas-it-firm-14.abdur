import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories = [] }) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
};

export default CategoryList;