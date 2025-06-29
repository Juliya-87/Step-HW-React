import { Link } from "react-router";
import { CloseIcon } from "../../icons/index.js";

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow">
      <div className="flex items-center gap-4">
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 object-contain rounded group-hover:underline cursor-pointer"
            onError={e => {
              e.target.src = "/no-image.svg";
            }}
          />
        </Link>
        <div>
          <Link to={`/products/${item.id}`}>
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <label
              htmlFor={`cart-qty-${item.id}`}
              className="text-gray-600 text-sm"
            >
              Qty:
            </label>
            <input
              id={`cart-qty-${item.id}`}
              type="number"
              min={1}
              value={item.quantity}
              onChange={e => onQuantityChange(item.id, e.target.value)}
              className="border rounded px-2 py-0.5 w-16 text-center"
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="mt-1 p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          title="Remove item"
        >
          <CloseIcon className="w-4 h-4" alt="Remove" />
        </button>
      </div>
    </div>
  );
}
