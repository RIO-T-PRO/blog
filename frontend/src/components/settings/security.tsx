import { FaKey, FaShieldAlt, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const SecuritySettings = () => {
  return (
    <section className="space-y-8">
      {/* TITLE */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-background">
          Security Settings
        </h2>
        <p className="text-text-secondary text-sm mt-1 font-body-standard">
          Manage your password, authentication, and account security
        </p>
      </div>

      {/* PASSWORD */}
      <div className="bg-surface ambient-shadow rounded-xl p-8 border border-border-muted space-y-6">
        <h3 className="font-label-ui text-text-primary font-semibold flex items-center gap-2">
          <FaKey />
          Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full bg-background border border-border-muted rounded-lg px-4 py-2.5 font-body-standard"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-background border border-border-muted rounded-lg px-4 py-2.5 font-body-standard"
          />
        </div>

        <button className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-ui hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>

      {/* 2FA */}
      <div className="bg-surface ambient-shadow rounded-xl p-8 border border-border-muted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-primary text-[18px]" />
          <div>
            <p className="font-label-ui font-semibold text-text-primary">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-text-secondary">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <button className="px-6 py-2 border border-border-muted text-text-secondary rounded-lg font-label-ui hover:bg-surface-container-high transition-colors">
          Enable
        </button>
      </div>

      {/* STATUS */}
      <div className="bg-surface ambient-shadow rounded-xl p-6 border border-border-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-status-success" />
          <span className="font-label-ui text-sm text-text-primary">
            Account security is strong
          </span>
        </div>

        <span className="text-status-success font-semibold text-sm">
          Secure
        </span>
      </div>

      {/* DANGER ZONE */}
      <div className="p-8 border border-status-error/20 bg-status-error/5 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-label-ui text-status-error font-bold text-[16px] mb-1 flex items-center gap-2">
            <FaTrashAlt />
            Delete Account
          </h3>
          <p className="text-[13px] text-on-surface-variant opacity-80 font-body-standard">
            Permanently remove your account and all associated data.
          </p>
        </div>

        <button className="px-6 py-2 border border-status-error/30 text-status-error rounded-lg font-label-ui text-[13px] hover:bg-status-error hover:text-on-error transition-all">
          Delete
        </button>
      </div>
    </section>
  );
};

export default SecuritySettings;
