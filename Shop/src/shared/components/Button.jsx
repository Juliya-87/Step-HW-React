import { SpinnerIcon } from "../../icons/index.js";

export default function Button({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <SpinnerIcon className="w-4 h-4" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
