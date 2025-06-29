import { useGetUserQuery } from "../../store/apiSlice.js";
import { ROLES } from "../constants/roles.js";

export const useUser = () => {
  const username = localStorage.getItem("username");
  const { data: user, isLoading } = useGetUserQuery(username, {
    skip: !username,
  });

  const logout = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  const hasRole = role => user?.role === role;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasRole,
    roles: ROLES,
    logout,
  };
};
