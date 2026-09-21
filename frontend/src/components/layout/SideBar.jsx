import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  if (user?.role !== "buyer") {
    return null;
  }

  const links = [
    {
      label: "Dashboard",
      path: "/buyer",
    },
    {
      label: "Saved Products",
      path: "/buyer/saved-products",
    },
    {
      label: "My Requests",
      path: "/requests",
    },
    {
      label: "Profile",
      path: "/buyer/profile",
    },
  ];

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-5 md:block">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/buyer"}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;