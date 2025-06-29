import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export function ErrorProvider({ children }) {
  const [error, setError] = useState("");

  const handleError = error => {
    setError(error.message || "An error occurred");
  };

  const clearError = () => {
    setError("");
  };

  const withErrorHandling = async asyncFn => {
    try {
      clearError();
      return await asyncFn();
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const value = {
    error,
    handleError,
    clearError,
    withErrorHandling,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}
