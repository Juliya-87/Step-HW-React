import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../store/apiSlice.js";
import { useNavigate } from "react-router";
import Spinner from "../../shared/components/Spinner.jsx";
import Button from "../../shared/components/Button.jsx";
import ProductsList from "../components/ProductsList.jsx";

export default function AdminProducts() {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleEdit = productId => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleAddNew = () => {
    navigate("/admin/products/add");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black">
          Products Management
        </h2>
        <Button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-md bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
        >
          Add New Product
        </Button>
      </div>

      <ProductsList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {products.length === 0 && (
        <div className="text-center">
          <Button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-md bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
          >
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
}
