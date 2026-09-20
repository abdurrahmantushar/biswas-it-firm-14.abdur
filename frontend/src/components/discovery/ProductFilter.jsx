const ProductFilters = ({
  category,
  sourceType,
  location,
  minPrice,
  maxPrice,
  availability,
  categories = [],
  locations = [],
  onCategoryChange,
  onSourceTypeChange,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onAvailabilityChange,
}) => {
  const fieldClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <select
        value={category}
        onChange={onCategoryChange}
        className={fieldClass}
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item.id || item._id} value={item.id || item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={sourceType}
        onChange={onSourceTypeChange}
        className={fieldClass}
      >
        <option value="">All Sources</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="wholesaler">Wholesaler</option>
        <option value="distributor">Distributor</option>
        <option value="farmer">Farmer</option>
        <option value="other">Other</option>
      </select>

      <select
        value={location}
        onChange={onLocationChange}
        className={fieldClass}
      >
        <option value="">All Locations</option>

        {locations.map((item) => (
          <option
            key={item.id || item.value}
            value={item.value || item.name}
          >
            {item.name || item.label}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={minPrice}
        onChange={onMinPriceChange}
        placeholder="Minimum price"
        min="0"
        className={fieldClass}
      />

      <input
        type="number"
        value={maxPrice}
        onChange={onMaxPriceChange}
        placeholder="Maximum price"
        min="0"
        className={fieldClass}
      />

      <select
        value={availability}
        onChange={onAvailabilityChange}
        className={fieldClass}
      >
        <option value="">All Availability</option>
        <option value="available">Available</option>
        <option value="limited">Limited</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </div>
  );
};

export default ProductFilters;