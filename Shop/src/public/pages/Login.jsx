import { Link } from "react-router";
import LoginForm from "../../shared/components/LoginForm.jsx";
import { ROLES } from "../../shared/constants/roles.js";

export default function Login() {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Login</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <LoginForm role={ROLES.USER} redirectPath="/" />

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#2d2e2e] hover:text-[#444545] font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
