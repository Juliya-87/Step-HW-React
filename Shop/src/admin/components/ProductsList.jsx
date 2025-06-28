import ProductItem from "./ProductItem.jsx";

export default function ProductsList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products yet
        </h3>
        <p className="text-gray-600 mb-4">
          Get started by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f1ede9]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
