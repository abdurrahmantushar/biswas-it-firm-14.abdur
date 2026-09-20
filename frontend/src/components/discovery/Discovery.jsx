import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import ProductSearch from "./ProductSearch";
import ProductSort from "./ProductSort";
import ProductFilters from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import SearchLoading from "./SearchLoading";
import SearchEmptyState from "./SearchEmptyState";
import DiscoveryContext from "./DiscoveryContext";
import DiscoverySuggestions from "./DiscoverySuggstions";

const Discovery = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("");

  const params = useMemo(
    () => ({
      search,
      category,
      sourceType,
      location,
      minPrice,
      maxPrice,
      availability,
      sort,
    }),
    [
      search,
      category,
      sourceType,
      location,
      minPrice,
      maxPrice,
      availability,
      sort,
    ]
  );

  const {
    data,
    loading,
    error,
  } = useProducts(params);

  const {
    data: categoryData,
  } = useCategories();

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  const categories = Array.isArray(categoryData)
    ? categoryData
    : categoryData?.categories || [];

  const locations = [
    {
      id: "dhaka",
      name: "Dhaka",
      value: "dhaka",
    },
    {
      id: "chattogram",
      name: "Chattogram",
      value: "chattogram",
    },
    {
      id: "sylhet",
      name: "Sylhet",
      value: "sylhet",
    },
    {
      id: "rajshahi",
      name: "Rajshahi",
      value: "rajshahi",
    },
    {
      id: "khulna",
      name: "Khulna",
      value: "khulna",
    },
  ];

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

return (
  <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Discover Products
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Find products and reliable sources for your business.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <ProductSearch
            value={search}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />

          <ProductSort
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          />
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <ProductFilters
            category={category}
            sourceType={sourceType}
            location={location}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availability={availability}
            categories={categories}
            locations={locations}
            onCategoryChange={(event) =>
              setCategory(event.target.value)
            }
            onSourceTypeChange={(event) =>
              setSourceType(event.target.value)
            }
            onLocationChange={(event) =>
              setLocation(event.target.value)
            }
            onMinPriceChange={(event) =>
              setMinPrice(event.target.value)
            }
            onMaxPriceChange={(event) =>
              setMaxPrice(event.target.value)
            }
            onAvailabilityChange={(event) =>
              setAvailability(event.target.value)
            }
          />
        </div>
      </div>

{error ? (
  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
    Failed to load products.
  </div>
) : loading ? (
  <SearchLoading />
) : !products.length ? (
  <SearchEmptyState message="Try changing your search or filters." />
) : (
  <>
    <DiscoveryContext
      search={search}
      category={category}
      location={location}
      sourceType={sourceType}
    />

    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="min-w-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Products
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {products.length} results
          </span>
        </div>

        <ProductGrid
          products={products}
          loading={false}
        />
      </section>

      <aside className="min-w-0 lg:sticky lg:top-6">
        <DiscoverySuggestions
          products={products}
          search={search}
        />
      </aside>
    </div>
  </>
)}
    </div>
  </main>
);
};

export default Discovery;