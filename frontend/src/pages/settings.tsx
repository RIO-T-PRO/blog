import { useAuth } from "@/lib/context/auth-context";

import ProfileSettings from "@/components/settings/profile";
import WriterSettings from "@/components/settings/writer-settings";
import AdminSettings from "@/components/settings/admin-settings";
import AccountSettings from "@/components/settings/account";
import SecuritySettings from "@/components/settings/security";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-on-surface">Settings</h1>

      <ProfileSettings />

      {user?.writer && <WriterSettings />}

      {user?.admin && <AdminSettings />}

      <AccountSettings />

      <SecuritySettings />
    </div>
  );
};

export default SettingsPage;
