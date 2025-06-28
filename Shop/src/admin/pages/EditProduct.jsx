import { useNavigate, useParams } from "react-router";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../store/apiSlice.js";
import ProductForm from "../components/ProductForm.jsx";
import Spinner from "../../shared/components/Spinner.jsx";
import Button from "../../shared/components/Button.jsx";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    isLoading: isLoadingProduct,
    error,
  } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleSubmit = async values => {
    await updateProduct({ id: parseInt(id), ...values });
    navigate("/admin");
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  if (isLoadingProduct) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded-md bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Edit Product</h1>
        <p className="text-gray-600">Update product information</p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Product"
        isSubmitting={isUpdating}
      />
    </div>
  );
}
