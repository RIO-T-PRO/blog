import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminTopbar from "./top-nav-bar";
import MobileAdminNav from "./mobile-view";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background text-on-background flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 min-h-screen">
        <AdminTopbar />

        <div className="p-6 lg:p-10 max-w-350 mx-auto">
          <Outlet />
        </div>
      </main>

      <MobileAdminNav />
    </div>
  );
};

export default AdminDashboard;
