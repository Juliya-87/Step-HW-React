import { useNavigate } from "react-router";
import { useAddProductMutation } from "../../store/apiSlice.js";
import ProductForm from "../components/ProductForm.jsx";
import Spinner from "../../shared/components/Spinner.jsx";

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleSubmit = async values => {
    await addProduct(values);
    navigate("/admin");
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new product for your shop</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Create Product"
        isSubmitting={isLoading}
      />
    </div>
  );
}
