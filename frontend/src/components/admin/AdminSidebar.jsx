import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminSidebar = () => {
  const { logout } = useAuth();

  const links = [
    {
      label: "Dashboard",
      path: "/admin",
    },
    {
      label: "Users",
      path: "/admin/users",
    },
    {
      label: "Sources",
      path: "/admin/sources",
    },
    {
      label: "Requests",
      path: "/admin/requests",
    },
    {
    label: "Fulfillment",
    path: "/admin/fulfillment",
  },
  ];

  return (
    <aside className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Admin Panel
      </h2>

      <nav className="mt-5 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={logout}
          className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;