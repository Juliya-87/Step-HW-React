import { NavLink } from "react-router";

export const Header = () => (
  <header className="bg-[#f7f4f1] border-b border-gray-300 py-4">
    <div className="container mx-auto flex justify-between items-center px-4">
      <NavLink to="/">
        <span className="text-xl font-semibold">Shop</span>
      </NavLink>
      <nav className="flex gap-6">
        {localStorage.getItem("isAdmin") === "true" && (
          <NavLink to="/admin">Admin</NavLink>
        )}
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </div>
  </header>
);
