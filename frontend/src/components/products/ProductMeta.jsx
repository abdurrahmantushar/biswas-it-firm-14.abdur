const ProductMeta = ({ product }) => {
  const metaItems = [
    {
      label: "Source Type",
      value: product?.sourceType || "N/A",
    },
    {
      label: "Category",
      value:
        product?.category?.name ||
        product?.category ||
        "N/A",
    },
    {
      label: "Availability",
      value: product?.availability || "N/A",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metaItems.map((item) => (
        <div
          key={item.label}
          className="rounded-xl bg-slate-50 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {item.label}
          </p>

          <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductMeta;