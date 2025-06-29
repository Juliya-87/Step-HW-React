import { useAuth } from "../hooks/useAuth.js";
import Spinner from "./Spinner.jsx";

export default function AuthGuard({ children, role, redirectPath }) {
  const { user, isLoading } = useAuth(role, redirectPath);

  if (isLoading) return <Spinner />;
  if (!user || (role && user.role !== role)) return null;

  return children;
}
