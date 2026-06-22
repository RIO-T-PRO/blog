// DashboardHome.tsx
import { useAuth } from "@/lib/context/auth-context";
import { FaCommentDots, FaBookmark } from "react-icons/fa";

const DashboardHome = () => {
  const { user, profile } = useAuth();

  const recentActivity = [
    {
      id: 1,
      type: "comment",
      action: "Commented on",
      subject: "Designing for the Long Tail",
      date: "2 days ago",
      snippet:
        "This perspective on edge cases is incredibly relevant to the projects we're currently scoping.",
    },
    {
      id: 2,
      type: "like",
      action: "Liked an article by",
      subject: "Elena Rostova",
      date: "1 week ago",
      articleTitle: "The Future of Digital Solitude",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h2 className="text-3xl font-bold">
          Welcome back, {profile?.username || user?.email?.split("@")[0]}
        </h2>
        <p className="mt-2 text-on-surface-variant">
          Here's an overview of your workspace.
        </p>
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

      {/* Saved Articles Quick Link */}
      {user?.roles.includes("user") && (
        <section className="rounded-xl border border-outline-variant bg-surface p-6">
          <h3 className="mb-4 text-xl font-semibold">Quick Access</h3>
          <div className="flex gap-4">
            <a
              href="/dashboard/saved"
              className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg hover:bg-primary transition-colors"
            >
              <FaBookmark />
              View Saved Articles
            </a>
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <section className="rounded-xl border border-outline-variant bg-surface p-6">
        <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="text-on-surface-variant">No recent activity.</div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 bg-surface-container-lowest p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <FaCommentDots className="text-xs" />
                  <span>
                    {item.action}{" "}
                    <span className="font-semibold text-on-surface">
                      {item.subject}
                    </span>
                  </span>
                  <span className="ml-auto text-xs">{item.date}</span>
                </div>
                {item.snippet && (
                  <p className="text-sm text-on-surface italic">
                    “{item.snippet}”
                  </p>
                )}
                {item.articleTitle && (
                  <p className="text-sm font-medium">{item.articleTitle}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardHome;
