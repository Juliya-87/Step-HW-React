import Button from "../../shared/components/Button.jsx";

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-[#f7f4f1] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img
              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
              src={product.image}
              alt={product.name}
              onError={e => {
                e.target.src = "/no-image.svg";
              }}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-black">{product.name}</div>
            <div className="text-sm text-gray-600">ID: {product.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-black">
          ${product.price.toFixed(2)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-700 max-w-xs truncate">
          {product.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-3">
          <Button
            onClick={() => onEdit(product.id)}
            className="text-[#2d2e2e] hover:text-[#444545] focus:ring-[#2d2e2e]"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-800 focus:ring-red-500"
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
