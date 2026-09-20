
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import Footer from "./Footer";



const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;