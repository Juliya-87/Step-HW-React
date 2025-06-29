import { NavLink } from "react-router";
import { useUser } from "../../shared/hooks/useUser.js";
import Button from "../../shared/components/Button.jsx";
import HeaderNavLink from "../../shared/components/HeaderNavLink.jsx";

export default function AdminHeader() {
  const { user, isAuthenticated, hasRole, roles, logout } = useUser();
  const isAuthorizedAdmin = isAuthenticated && hasRole(roles.ADMIN);

  return (
    <header className="bg-[#2d2e2e] text-white py-4 mb-8">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-6">
          <NavLink to="/admin">
            <span className="text-xl font-semibold">Admin Panel</span>
          </NavLink>
          {isAuthorizedAdmin && (
            <nav className="flex space-x-6">
              <HeaderNavLink
                to="/admin"
                end
                activeClassName="text-white header-nav-underline-white"
                inactiveClassName="text-gray-300 hover:text-white"
              >
                Products
              </HeaderNavLink>
              <HeaderNavLink
                to="/admin/users"
                activeClassName="text-white header-nav-underline-white"
                inactiveClassName="text-gray-300 hover:text-white"
              >
                Users
              </HeaderNavLink>
            </nav>
          )}
        </div>
        {isAuthorizedAdmin && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-200">
              {user.name} ({user.username})
            </span>
            <Button
              onClick={logout}
              className="px-3 py-1 rounded bg-white text-[#2d2e2e] hover:bg-gray-200 focus:ring-[#2d2e2e]"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
