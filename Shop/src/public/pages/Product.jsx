import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Spinner from "../../shared/components/Spinner.jsx";
import { useGetProductQuery } from "../../store/apiSlice.js";
import { addToCart } from "../../store/cartSlice.js";
import Button from "../../shared/components/Button.jsx";

export default function Product() {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useGetProductQuery(productId);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !product) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: Number(quantity) }));
    setAdded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAdded(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>
      <div className="mb-4 h-80 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={e => {
            e.target.src = "/no-image.svg";
          }}
        />
      </div>
      <p className="mb-2">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <div className="flex items-center gap-4 mt-6">
        <label htmlFor="quantity" className="font-medium">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="border rounded px-2 py-1 w-20"
        />
        <Button
          onClick={handleAddToCart}
          className="px-4 py-2 rounded bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
        >
          Add to cart
        </Button>
        {added && (
          <span className="ml-2 bg-[#f7f4f1] text-[#2d2e2e] px-2 py-1 text-sm font-medium">
            Added to cart!
          </span>
        )}
      </div>
    </div>
  );
}
