import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { isAuthenticated, user, logout } = useAuth();


  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="text-xl font-bold text-slate-900"
        >
          Source-X
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            to="/discovery"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Discovery
          </Link>

          <Link
            to="/categories"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Categories
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user?.role === "admin" ? "/admin" : "/buyer"}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {sidebarOpen && (
        <div className="border-t border-slate-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              to="/discovery"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Discovery
            </Link>

            <Link
              to="/categories"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Categories
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/buyer"}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;