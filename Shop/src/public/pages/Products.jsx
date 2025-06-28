import Spinner from "../../shared/components/Spinner.jsx";
import { useGetProductsQuery } from "../../store/apiSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import { useNavigate } from "react-router";

export default function ProductsPage() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    navigate("/not-found", { replace: true });
    return null;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10">Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
