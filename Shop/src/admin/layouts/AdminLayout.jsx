import { Outlet } from "react-router";
import AdminHeader from "../components/AdminHeader.jsx";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f4f1] text-black">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
