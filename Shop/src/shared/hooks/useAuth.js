import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetUserQuery } from "../../store/apiSlice.js";

export const useAuth = (requiredRole, redirectPath) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { data: user, isLoading } = useGetUserQuery(username, {
    skip: !username,
  });

  useEffect(() => {
    if (!isLoading && (!user || (requiredRole && user.role !== requiredRole))) {
      navigate(redirectPath);
    }
  }, [isLoading, user, requiredRole, navigate, redirectPath]);

  return { user, isLoading };
};
