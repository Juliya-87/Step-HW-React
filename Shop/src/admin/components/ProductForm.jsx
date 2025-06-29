import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUploadFileMutation } from "../../store/apiSlice.js";
import Button from "../../shared/components/Button.jsx";
import FileUpload from "../../shared/components/FileUpload.jsx";
import { useError } from "../../contexts/ErrorContext.jsx";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .min(0.01, "Price must be at least $0.01")
    .max(10000, "Price must be less than $10,000")
    .required("Price is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  image: Yup.mixed()
    .required("Please upload an image")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    })
    .test("fileType", "Please select an image file", function (value) {
      if (!value) return true;
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return true;
    }),
});

export default function ProductForm({
  initialData = {
    name: "",
    price: "",
    description: "",
    image: null,
  },
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSubmitting = false,
}) {
  const { withErrorHandling } = useError();
  const [uploadFile] = useUploadFileMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await withErrorHandling(async () => {
        let finalImageUrl;
        if (values.image instanceof File) {
          const result = await uploadFile(values.image).unwrap();
          finalImageUrl = result.imageUrl;
        } else if (typeof values.image === "string" && values.image) {
          finalImageUrl = values.image;
        } else {
          throw new Error("Please upload an image");
        }

        await onSubmit({ ...values, image: finalImageUrl });
        resetForm();
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-black">
        {initialData.id ? "Edit Product" : "Add New Product"}
      </h3>

      <Formik
        initialValues={initialData}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting: formikSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black mb-1"
              >
                Product Name *
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2e2e] ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-black mb-1"
              >
                Price ($) *
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2e2e] ${
                  errors.price && touched.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <FileUpload
              name="image"
              label="Product Image *"
              accept="image/*"
              maxSize={5 * 1024 * 1024}
            />

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-black mb-1"
              >
                Description *
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2e2e] ${
                  errors.description && touched.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter product description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={formikSubmitting || isSubmitting}
                isLoading={formikSubmitting || isSubmitting}
                loadingText="Saving..."
                className="flex-1 px-4 py-2 rounded-md bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
              >
                {submitLabel}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-[#f7f4f1] focus:ring-[#2d2e2e]"
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
