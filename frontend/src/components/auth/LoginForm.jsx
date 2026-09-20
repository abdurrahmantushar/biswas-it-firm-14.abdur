import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowRight, FiLock, FiMail, FiShield } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser(formData);

      login(result.user, result.token);

      const role = String(result.user?.role || "")
        .trim()
        .toLowerCase();

      toast.success("Login successful.");

      navigate(role === "admin" ? "/admin" : "/buyer", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#09213d] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-xl font-bold text-[#09213d]">
              SX
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Welcome to Source X
            </p>

            <h1 className="max-w-md text-4xl font-bold leading-tight">
              Discover reliable sources with confidence.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Connect with verified sources, discover products, and
              manage your sourcing requests from one platform.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <FiShield className="text-2xl text-cyan-300" />

            <div>
              <p className="text-sm font-semibold">
                Secure Access
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your sourcing journey starts here.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#09213d] text-sm font-bold text-white lg:hidden">
                SX
              </div>

              <p className="mb-2 text-sm font-semibold text-cyan-600">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to continue to Source X.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#09213d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#12365d] focus:outline-none focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Sign In"}

                {!loading && <FiArrowRight className="text-lg" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;