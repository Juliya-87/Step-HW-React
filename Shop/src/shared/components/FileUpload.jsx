import { useFormikContext } from "formik";
import { useCallback, useState, useEffect, useRef } from "react";
import { CloseIcon, UploadIcon } from "../../icons/index.js";

export default function FileUpload({
  name,
  label,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
}) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fieldValue = values[name];
    if (fieldValue instanceof File) {
      const previewUrl = URL.createObjectURL(fieldValue);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } else if (typeof fieldValue === "string" && fieldValue) {
      setPreview(fieldValue);
    } else {
      setPreview(null);
    }
  }, [values, name]);

  const handleFileChange = useCallback(
    file => {
      if (!file) {
        setPreview(null);
        setFieldValue(name, null);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFieldValue(name, file);
    },
    [name, setFieldValue]
  );

  const handleInputChange = event => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = useCallback(
    event => {
      event.preventDefault();
      setIsDragOver(false);

      const file = event.dataTransfer.files[0];
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback(event => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(event => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = () => {
    setPreview(null);
    setFieldValue(name, null);
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const fieldError = errors[name];
  const fieldTouched = touched[name];

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${
            fieldError && fieldTouched
              ? "border-red-300 bg-red-50 hover:border-red-400"
              : isDragOver
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleAreaClick}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 max-w-full min-h-32 min-w-32 rounded-lg shadow-sm object-contain"
                onError={e => {
                  e.target.src = "/no-image.svg";
                }}
              />
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors pointer-events-auto"
              >
                <CloseIcon className="w-3 h-3" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Drag a new image here or click to select
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drag an image here or click to select
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF. Maximum size:{" "}
              {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          name={name}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
        />
      </div>

      {fieldError && fieldTouched && (
        <p className="mt-2 text-sm text-red-600">{fieldError}</p>
      )}
    </div>
  );
}
