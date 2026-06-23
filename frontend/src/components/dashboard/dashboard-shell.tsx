import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "@/lib/context/auth-context";
import { useRoleApplication } from "@/lib/context/role-application";
import SearchModal from "@/components/ui/search-modal";
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

  const handleBellClick = () => {
    setHasNotifications(false);
    setNotificationOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    navigate("/", { replace: true });
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const settingsPaths = [
    "/dashboard/settings",
    "/dashboard/security",
    "/dashboard/notifications",
  ];
  const showSettingsTabs = settingsPaths.some((path) =>
    location.pathname.startsWith(path),
  );

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
          realNotifications={applications}
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
          />
        </div>
      </div>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default DashboardShell;
