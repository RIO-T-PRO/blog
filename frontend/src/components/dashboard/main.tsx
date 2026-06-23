import { Outlet, NavLink } from "react-router-dom";
import { FaBell, FaShieldAlt, FaUser } from "react-icons/fa";

type Props = {
  profile: any;
  user: any;
  showSettingsTabs: boolean;
  showProfileHeader: boolean;
};

const DashboardMain = ({
  profile,
  user,
  showSettingsTabs,
  showProfileHeader,
}: Props) => {
  return (
    <main className="flex-1 md:ml-64">
      <div className="max-w-5xl mx-auto px-4 md:px-10 py-12">
        {/* Profile header – only on Dashboard and Settings */}
        {showProfileHeader && (
          <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-outline-variant">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="grid place-items-center h-full bg-surface-container">
                  <span className="text-2xl font-bold text-on-surface-variant">
                    {profile?.username?.charAt(0) ?? user?.email?.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-3">
                {profile?.username ?? user?.email.split("@")[0]}
              </h1>
              <p className="max-w-xl text-on-surface-variant">
                {profile?.bio ?? "Welcome to your editorial workspace."}
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {user?.roles.map((role: string) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {showSettingsTabs && (
          <nav className="flex gap-8 border-b border-outline-variant mt-12">
            <NavLink
              to="/dashboard/settings"
              end
              className={({ isActive }) =>
                isActive
                  ? "pb-3 border-b-2 border-primary text-primary"
                  : "pb-3 text-on-surface-variant"
              }
            >
              <div className="flex items-center gap-2">
                <FaUser />
                Profile
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/security"
              className={({ isActive }) =>
                isActive
                  ? "pb-3 border-b-2 border-primary text-primary"
                  : "pb-3 text-on-surface-variant"
              }
            >
              <div className="flex items-center gap-2">
                <FaShieldAlt />
                Security
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/notifications"
              className={({ isActive }) =>
                isActive
                  ? "pb-3 border-b-2 border-primary text-primary"
                  : "pb-3 text-on-surface-variant"
              }
            >
              <div className="flex items-center gap-2">
                <FaBell />
                Notifications
              </div>
            </NavLink>
          </nav>
        )}

        <div className={showSettingsTabs ? "mt-10" : "mt-12"}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardMain;
