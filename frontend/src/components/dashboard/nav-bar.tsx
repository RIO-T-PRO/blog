import { NavLink } from "react-router-dom";
import { FaBars, FaBell, FaFeatherAlt, FaSearch, FaTh } from "react-icons/fa";

type Props = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationOpen: boolean;
  notificationRef: React.RefObject<HTMLDivElement | null>;
  handleBellClick: () => void;
  hasNotifications: boolean;
  realNotifications: any[];
  profile: any;
  user: any;
};

const DashboardNavBar = ({
  mobileOpen,
  setMobileOpen,
  setIsSearchOpen,
  notificationOpen,
  notificationRef,
  handleBellClick,
  hasNotifications,
  realNotifications,
  profile,
  user,
}: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          <FaBars />
        </button>

        <NavLink
          to="/"
          className="flex items-center gap-3 text-xl font-semibold text-on-surface justify-self-start"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container text-on-primary">
            <FaFeatherAlt className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-serif">Editorial</span>
            <span className="text-[10px] font-medium text-on-surface-variant">
              Journal
            </span>
          </div>
        </NavLink>
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="relative flex w-72 items-center rounded-lg border border-outline-variant bg-surface-lowest py-2 pl-10 pr-4 text-sm text-on-surface-variant hover:border-primary-container transition-colors"
        >
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <span>Search...</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={handleBellClick} className="relative">
            <FaBell />
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-error"></span>
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-outline-variant">
                <h3 className="font-semibold text-on-surface">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {realNotifications.length === 0 ? (
                  <p className="p-4 text-sm text-on-surface-variant text-center">
                    No notifications yet.
                  </p>
                ) : (
                  realNotifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        className="flex items-start gap-3 p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-none"
                      >
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.color}`}
                        >
                          <Icon className="text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-on-surface truncate">
                            {notif.title}
                          </p>
                          <p className="text-xs text-on-surface-variant truncate">
                            {notif.description}
                          </p>
                          <span className="text-[10px] text-on-surface-variant mt-1 block">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <a
                href="/dashboard/notifications"
                className="block text-center py-3 text-sm text-primary font-medium hover:bg-surface-container-low transition-colors border-t border-outline-variant"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>

        <button>
          <FaTh />
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="grid place-items-center h-full text-xs font-semibold">
              {profile?.username?.charAt(0) ?? user?.email?.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavBar;
