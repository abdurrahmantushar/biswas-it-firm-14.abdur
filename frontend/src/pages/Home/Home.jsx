import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiLayers,
  FiPackage,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: <FiPackage />,
      title: "Discover Products",
      description:
        "Explore a wide range of products across different categories.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FiShield />,
      title: "Verified Sources",
      description:
        "Find reliable and verified sources for your sourcing needs.",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <FiLayers />,
      title: "Manage Requests",
      description:
        "Create, track, and manage your sourcing requests easily.",
      color: "bg-violet-100 text-violet-600",
    },
  ];



  return (
    <main className="overflow-hidden bg-white">
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <FiShield />
              Your Trusted Sourcing Partner
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Discover Better Sources.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Source Smarter.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover quality products, connect with verified sources,
              and manage your sourcing journey through one reliable
              platform.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/discovery"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#09213d] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-[#12365d]"
              >
                Explore Products
                <FiArrowRight className="text-lg" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-800 transition hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600"
              >
                Get Started
                <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <FiShield className="text-xl" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Verified Sources
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Reliable suppliers
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <FiCheckCircle className="text-xl" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Quality Products
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Trusted product discovery
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div className="rounded-full bg-violet-100 p-3 text-violet-600">
                <FiGlobe className="text-xl" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Smart Sourcing
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Simple and efficient
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              Why Choose Source-X
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                source smarter
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              We make sourcing simple, transparent, and efficient so
              you can focus on growing your business.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>

                <Link
                  to="/discovery"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3"
                >
                  Learn More
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#09213d] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to start sourcing?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
              Find the right products and reliable sources with
              Source-X.
            </p>
          </div>

          <Link
            to="/discovery"
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#09213d] transition hover:bg-blue-50"
          >
            Explore Now
            <FiArrowRight className="text-lg" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;