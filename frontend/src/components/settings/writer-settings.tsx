import { useAuth } from "@/lib/context/auth-context";

const WriterSettings = () => {
  const { user } = useAuth();

  if (!user?.writer) return null;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Writer Settings</h1>

      <div className="rounded-xl border border-border-muted bg-surface p-6">
        <label className="text-sm text-text-secondary">Website</label>
        <input className="w-full mt-2 rounded-lg border px-4 py-3" />
      </div>
    </section>
  );
};

export default WriterSettings;
