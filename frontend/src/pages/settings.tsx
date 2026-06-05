import { useAuth } from "@/lib/context/auth-context";

import ProfileSettings from "@/components/settings/profile";
import WriterSettings from "@/components/settings/writer-settings";
import AdminSettings from "@/components/settings/admin-settings";
import SecuritySettings from "@/components/settings/security";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* PAGE HEADER */}

      {/* SECTIONS */}
      <ProfileSettings />

      {user?.writer && <WriterSettings />}

      {user?.admin && <AdminSettings />}

      <SecuritySettings />
    </div>
  );
};

export default SettingsPage;
