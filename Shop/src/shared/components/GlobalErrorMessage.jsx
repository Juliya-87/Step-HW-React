import { useError } from "../../contexts/ErrorContext.jsx";
import { useEffect } from "react";
import { CloseIcon } from "../../icons/index.js";

export default function GlobalErrorMessage() {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-sm">{error}</span>
        <button
          onClick={clearError}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
