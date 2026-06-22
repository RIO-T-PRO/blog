import { useAuth } from "@/lib/context/auth-context";
import {
  FaFileAlt,
  FaCommentDots,
  FaUserShield,
  FaClock,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user, profile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome */}

      <section>
        <h2 className="text-3xl font-bold">
          Welcome back, {profile?.username || user?.email.split("@")[0]}
        </h2>

        <p className="mt-2 text-on-surface-variant">
          Here's an overview of your workspace.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-on-surface-variant">Articles</span>
            <FaFileAlt className="text-primary" />
          </div>

          <div className="mt-4 text-3xl font-bold">0</div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-on-surface-variant">Comments</span>
            <FaCommentDots className="text-primary" />
          </div>

          <div className="mt-4 text-3xl font-bold">0</div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-on-surface-variant">
              Applications
            </span>
            <FaUserShield className="text-primary" />
          </div>

          <div className="mt-4 text-3xl font-bold">0</div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-on-surface-variant">Drafts</span>
            <FaClock className="text-primary" />
          </div>

          <div className="mt-4 text-3xl font-bold">0</div>
        </div>
      </section>

      {/* Roles */}

      <section className="rounded-xl border border-outline-variant bg-surface p-6">
        <h3 className="mb-4 text-xl font-semibold">Your Roles</h3>

        <div className="flex flex-wrap gap-2">
          {user?.roles.map((role) => (
            <span
              key={role}
              className="rounded-full bg-primary-container px-3 py-1 text-xs font-medium text-on-primary"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Activity */}

      <section className="rounded-xl border border-outline-variant bg-surface p-6">
        <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>

        <div className="text-on-surface-variant">No recent activity.</div>
      </section>
    </div>
  );
};

export default DashboardHome;
