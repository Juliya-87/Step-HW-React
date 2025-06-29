import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="rounded-xl overflow-hidden bg-[#f1ede9] shadow-md hover:shadow-lg transition"
    >
      <div className="aspect-square bg-[#eae7e3] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={e => {
            e.target.src = "/no-image.svg";
          }}
        />
      </div>
      <div className="bg-white p-4">
        <h2 className="font-medium text-lg">{product.name}</h2>
        <p className="text-gray-700">${product.price}</p>
      </div>
    </Link>
  );
}
