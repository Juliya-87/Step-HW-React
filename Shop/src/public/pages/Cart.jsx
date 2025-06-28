import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  changeQuantity,
} from "../../store/cartSlice.js";
import { useGetProductsQuery } from "../../store/apiSlice.js";
import Spinner from "../../shared/components/Spinner.jsx";
import CartItem from "../components/CartItem.jsx";
import Button from "../../shared/components/Button.jsx";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const { data: products = [], isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  const cartDetails = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    return {
      ...cartItem,
      name: product?.name || "Unknown",
      price: typeof product?.price === "number" ? product.price : 0,
      image: product?.image || "",
    };
  });

  const total = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(changeQuantity({ id, quantity: Number(quantity) }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      {cartDetails.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartDetails.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={id => dispatch(removeFromCart(id))}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Button
              onClick={() => dispatch(clearCart())}
              className="mt-2 px-3 py-1.5 text-sm rounded-md text-[#2d2e2e] hover:text-[#444545] focus:ring-[#2d2e2e]"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
