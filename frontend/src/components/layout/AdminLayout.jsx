import { Outlet } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4 sm:p-6 lg:p-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <AdminSidebar />
        </aside>

        <main className="min-w-0 flex-1">
          <AdminHeader />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;