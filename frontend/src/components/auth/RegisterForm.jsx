import { useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiShield, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registration successful.");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#09213d] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-xl font-bold text-[#09213d]">
              SX
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Join Source X
            </p>

            <h1 className="max-w-md text-4xl font-bold leading-tight">
              Start your smarter sourcing journey today.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Create your account to discover products, connect with
              reliable sources, and manage your sourcing requests.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <FiShield className="text-2xl text-cyan-300" />

            <div>
              <p className="text-sm font-semibold">
                Simple & Secure
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Everything you need in one platform.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-md">
            <div className="mb-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#09213d] text-sm font-bold text-white lg:hidden">
                SX
              </div>

              <p className="mb-2 text-sm font-semibold text-cyan-600">
                Get started
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fill in your details to join Source X.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#09213d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#12365d] focus:outline-none focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}

                {!loading && <FiArrowRight className="text-lg" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;