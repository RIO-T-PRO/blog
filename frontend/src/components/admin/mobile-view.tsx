import { NavLink } from "react-router-dom";

import { FaChartLine, FaComments, FaGear, FaNewspaper } from "react-icons/fa6";

const MobileAdminNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border-muted bg-surface-container md:hidden">
      <NavLink to="/admin">
        <FaChartLine />
      </NavLink>

      <NavLink to="/admin/comments">
        <FaComments />
      </NavLink>

      <NavLink to="/admin/posts">
        <FaNewspaper />
      </NavLink>

      <NavLink to="/admin/system">
        <FaGear />
      </NavLink>
    </nav>
  );
};

export default MobileAdminNav;
