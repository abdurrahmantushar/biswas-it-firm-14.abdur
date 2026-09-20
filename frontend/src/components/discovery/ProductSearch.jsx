import SearchBar from "../common/SearchBar";

const ProductSearch = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      placeholder="Search products..."
    />
  );
};

export default ProductSearch;