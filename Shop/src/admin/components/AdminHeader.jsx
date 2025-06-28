import { NavLink } from "react-router";
import { useUser } from "../../shared/hooks/useUser.js";
import Button from "../../shared/components/Button.jsx";

export default function AdminHeader() {
  const user = useUser("admin", "/admin/login");

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/admin/login";
  };

  return (
    <header className="bg-[#2d2e2e] text-white py-4 mb-8">
      <div className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/admin">
          <span className="text-xl font-semibold">Admin Panel</span>
        </NavLink>
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-200">
              {user.name} ({user.username})
            </span>
            <Button
              onClick={handleLogout}
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
