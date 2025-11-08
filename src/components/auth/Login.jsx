import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAlert } from "../../contexts/Alert";
import Loader from "../common/Loader";
import { REDUX_HANDLE_LOG_IN } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

// ✅ Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email({ message: "Please enter a valid email address" })),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // ✅ Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { email, password } = data;
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      if (resp) {
        dispatch(REDUX_HANDLE_LOG_IN({ user: resp?.data?.data }));
        triggerAlert({
          type: "success",
          message: resp?.data?.message || "Login is successful",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error, "error logging in");
      triggerAlert({
        type: "error",
        message: error?.response?.data || "something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-content text-base-content">
      <div className="card w-full max-w-md bg-neutral shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back to
          <br />
          <span className="text-accent">DevTinder </span> 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-accent">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`input input-bordered w-full outline-0 ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text text-accent">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full outline-0 ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn bg-accent-content w-full mt-4`}
          >
            {loading && <Loader />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/auth/sign-up" className="link text-accent">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
