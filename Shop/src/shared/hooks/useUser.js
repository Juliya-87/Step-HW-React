import { useAuth } from "./useAuth.js";

export const useUser = (role, redirectPath) => {
  const { user, isLoading } = useAuth(role, redirectPath);
  return user;
};
