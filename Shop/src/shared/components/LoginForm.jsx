import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLoginUserMutation } from "../../store/apiSlice.js";
import Button from "./Button.jsx";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .required("Password is required"),
});

export default function LoginForm({ role, redirectPath, onSuccess }) {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setFormError("");
      const user = await loginUser({
        username: values.username,
        password: values.password,
        role: role,
      }).unwrap();

      if (user) {
        localStorage.setItem("username", user.username);

        if (onSuccess) {
          onSuccess(user);
        }

        navigate(redirectPath);
        return;
      }

      setFormError("Invalid username or password");
    } catch {
      setFormError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black mb-2"
            >
              Username
            </label>
            <Field
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d2e2e] transition-colors ${
                errors.username && touched.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter your username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-2"
            >
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d2e2e] transition-colors ${
                errors.password && touched.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              isLoading={isSubmitting || isLoading}
              loadingText="Signing in..."
              className="w-full px-4 py-3 rounded-lg bg-[#2d2e2e] text-white hover:bg-[#444545] focus:ring-[#2d2e2e]"
            >
              Sign In
            </Button>
          </div>

          {formError && (
            <div className="text-center text-sm text-red-600 mt-2">
              {formError}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
