import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "../../contexts/Alert";
import Loader from "../common/Loader";

// ✅ Validation Schema
const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(30),
  emailId: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must include uppercase, number, and special char"
    ),
  age: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "Age must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 18, {
      message: "You must be at least 18 years old",
    }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select a valid gender" }),
  }),
});

const SignUp = () => {
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`,
        data,
        { withCredentials: true }
      );
      if (resp.status === 201) {
        triggerAlert({
          type: "success",
          message: `${
            resp?.data?.message || "Account created successfully !"
          } Login to get started`,
        });
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error, "error signin up");
      triggerAlert({
        type: "error",
        message: error.response?.data || "Failed to sign up",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-content custom-container">
      <div className="w-full max-w-lg bg-neutral backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-accent mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Join DevTinder and start connecting with developers 👩‍💻
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Fields */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-accent mb-1 text-sm">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="input  input-bordered w-full bg-base-100 outline-0"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-accent mb-1 text-sm">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="input input-bordered w-full bg-base-100 outline-0"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-accent mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register("emailId")}
              className="input input-bordered w-full bg-base-100 outline-0"
              placeholder="you@example.com"
            />
            {errors.emailId && (
              <p className="text-red-400 text-xs mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-accent mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              className="input input-bordered w-full bg-base-100 outline-0"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-accent mb-1 text-sm">Age</label>
            <input
              type="text"
              {...register("age")}
              className="input input-bordered w-full bg-base-100 outline-0"
              placeholder="18+"
            />
            {errors.age && (
              <p className="text-red-400 text-xs mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-accent mb-1 text-sm">Gender</label>
            <select
              {...register("gender")}
              className="select select-bordered w-full bg-base-100 outline-0"
            >
              <option value="">Select gender</option>
              <option value="male" className="text-white">
                Male
              </option>
              <option value="female" className="text-white">
                Female
              </option>
              <option value="other" className="text-white">
                Other
              </option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn bg-accent-content w-full mt-4 transition-all duration-300"
          >
            {loading && <Loader />}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-white text-sm mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-accent underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
