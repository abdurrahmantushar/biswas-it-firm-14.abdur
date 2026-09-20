const ProductSort = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-900"
    >
      <option value="">Sort Products</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="name_asc">Name: A to Z</option>
      <option value="name_desc">Name: Z to A</option>
      <option value="newest">Newest</option>
    </select>
  );
};

export default ProductSort;