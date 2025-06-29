import { NavLink } from "react-router";
import { useUser } from "../../shared/hooks/useUser.js";
import Button from "../../shared/components/Button.jsx";
import HeaderNavLink from "../../shared/components/HeaderNavLink.jsx";

export default function Header() {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header className="bg-[#f7f4f1] border-b border-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/">
          <span className="text-xl font-semibold text-black">Shop</span>
        </NavLink>
        <nav className="flex gap-6 items-center">
          <HeaderNavLink
            to="/cart"
            activeClassName="text-[#2d2e2e] header-nav-underline-dark"
            inactiveClassName="text-black hover:text-[#2d2e2e]"
          >
            Cart
          </HeaderNavLink>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#2d2e2e] font-medium">
                Welcome, {user?.name || user?.username}!
              </span>
              <Button
                onClick={logout}
                className="px-4 py-2 text-sm bg-[#f1ede9] text-[#2d2e2e] hover:bg-[#eae7e3] border border-[#d4cfc8] rounded-lg transition-colors font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm bg-[#2d2e2e] text-white hover:bg-[#444545] rounded-lg transition-colors font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 text-sm border border-[#2d2e2e] text-[#2d2e2e] hover:bg-[#2d2e2e] hover:text-white rounded-lg transition-colors font-medium"
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
