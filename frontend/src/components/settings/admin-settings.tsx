import { useAuth } from "@/lib/context/auth-context";

const AdminSettings = () => {
  const { user } = useAuth();

  if (!user?.admin) return null;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <div className="rounded-xl border border-border-muted bg-surface p-6">
        <p className="text-sm text-text-secondary">Role: {user.admin.role}</p>
      </div>
    </section>
  );
};

export default AdminSettings;
