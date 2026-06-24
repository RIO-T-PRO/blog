import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "@/lib/context/auth-context";
import { useRoleApplication } from "@/lib/context/role-application";
import SearchModal from "@/components/ui/search-modal";

import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import DashboardNavBar from "./nav-bar";
import DashboardAside from "./aside";
import DashboardMain from "./main";

const DashboardShell = () => {
  const { user, profile, logout } = useAuth();
  const { applications, fetchMyApplications } = useRoleApplication();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const [articlesOpen, setArticlesOpen] = useState(
    location.pathname.startsWith("/dashboard/articles"),
  );

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  useEffect(() => {
    setArticlesOpen(location.pathname.startsWith("/dashboard/articles"));
  }, [location.pathname]);

  const realNotifications = useMemo(() => {
    return applications.map((app) => {
      let icon: any, color: string, message: string;

      const roleName = app.role?.name ?? "Unknown role";

      switch (app.status) {
        case "PENDING":
          icon = FaClock;
          color = "bg-amber-100 text-amber-700";
          message = `Your ${roleName} application is pending review.`;
          break;

        case "APPROVED":
          icon = FaCheckCircle;
          color = "bg-green-100 text-green-700";
          message = `Your ${roleName} application has been approved!`;
          break;

        case "REJECTED":
          icon = FaTimesCircle;
          color = "bg-red-100 text-red-700";
          message = `Your ${roleName} application was rejected.`;
          break;

        default:
          icon = FaClock;
          color = "bg-surface-container-high text-on-surface-variant";
          message = `Status: ${app.status}`;
      }

      return {
        id: app.id,
        icon,
        title: `${roleName} application`,
        description: message,
        time: new Date(app.updatedAt).toLocaleDateString(),
        color,
      };
    });
  }, [applications]);

  useEffect(() => {
    setHasNotifications(applications.length > 0);
  }, [applications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setHasNotifications(false);
    setNotificationOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    navigate("/", { replace: true });
    await logout().catch(console.error);
  };

  const showSettingsTabs = [
    "/dashboard/settings",
    "/dashboard/security",
    "/dashboard/notifications",
  ].some((p) => location.pathname.startsWith(p));

  const showProfileHeader =
    location.pathname === "/dashboard" ||
    [
      "/dashboard/settings",
      "/dashboard/security",
      "/dashboard/notifications",
    ].some((p) => location.pathname.startsWith(p));

  return (
    <>
      <div className="min-h-screen bg-background text-on-surface">
        <DashboardNavBar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          setIsSearchOpen={setIsSearchOpen}
          notificationOpen={notificationOpen}
          notificationRef={notificationRef}
          handleBellClick={handleBellClick}
          hasNotifications={hasNotifications}
          realNotifications={realNotifications}
          profile={profile}
          user={user}
        />

        <div className="flex pt-16">
          <DashboardAside
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            locationPath={location.pathname}
            user={user}
            handleLogout={handleLogout}
            articlesOpen={articlesOpen}
            setArticlesOpen={setArticlesOpen}
          />

          <DashboardMain
            profile={profile}
            user={user}
            showSettingsTabs={showSettingsTabs}
            showProfileHeader={showProfileHeader}
          />
        </div>
      </div>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default DashboardShell;
