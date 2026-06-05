import { useState } from "react";
import { FaKey, FaShieldAlt, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { deleteUser } from "@/lib/api/auth";

const SecuritySettings = () => {
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const updatePassword = async () => {
    setLoadingPassword(true);
    setTimeout(() => setLoadingPassword(false), 1000);
  };

  const toggle2FA = async () => {
    setLoading2FA(true);
    setTimeout(() => setLoading2FA(false), 1000);
  };

  const deleteAccount = async () => {
    try {
      setLoadingDelete(true);

      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?.user_id) return;

      await deleteUser(user.user_id);

      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDelete(false);
      setConfirmDelete(false);
    }
  };

  const inputClass =
    "mt-1 w-full bg-background border border-border-muted rounded-lg px-4 py-2.5 " +
    "transition-colors duration-150 " +
    "hover:border-primary/60 " +
    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary " +
    "disabled:opacity-70";

  return (
    <section className="space-y-10 max-w-3xl mx-auto">
      {/* HEADER */}
      <header>
        <h2 className="font-headline-md text-headline-md text-on-background">
          Security
        </h2>
        <p className="text-sm text-text-secondary mt-2">
          Control authentication and account safety
        </p>
      </header>

      {/* AUTH */}
      <div className="bg-surface border border-border-muted rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <FaKey className="text-primary mt-1" />
          <div>
            <h3 className="font-medium">Authentication</h3>
            <p className="text-sm text-text-secondary">
              Manage password and login protection
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current password"
            className={inputClass}
          />
          <input
            type="password"
            placeholder="New password"
            className={inputClass}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={updatePassword}
            disabled={loadingPassword}
            className="px-6 py-2.5 bg-primary text-on-primary rounded-lg disabled:opacity-60"
          >
            {loadingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border-muted">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-primary" />
            <span className="text-sm">Two-Factor Authentication</span>
          </div>

          <button
            onClick={toggle2FA}
            disabled={loading2FA}
            className="px-6 py-2.5 border border-border-muted rounded-lg hover:bg-surface-container transition-colors disabled:opacity-60"
          >
            {loading2FA ? "Processing..." : "Enable"}
          </button>
        </div>
      </div>

      {/* ACCOUNT HEALTH */}
      <div className="bg-surface border border-border-muted rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-status-success" />
          <div>
            <p className="font-medium">Account Security</p>
            <p className="text-sm text-text-secondary">No issues detected</p>
          </div>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-status-success/10 text-status-success">
          Secure
        </span>
      </div>

      {/* DANGER ZONE (CONSISTENT DESIGN FIXED) */}
      <div className="bg-surface border border-border-muted rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <FaTrashAlt className="text-status-error mt-1" />
          <div>
            <h3 className="font-medium text-on-background">Danger Zone</h3>
            <p className="text-sm text-text-secondary">
              Irreversible actions that permanently affect your account
            </p>
          </div>
        </div>

        <div className="border border-border-muted rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete account</p>
              <p className="text-sm text-text-secondary">
                All your data will be permanently removed
              </p>
            </div>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-5 py-2.5 rounded-lg border border-status-error text-status-error hover:bg-status-error hover:text-on-error transition-colors"
              >
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  disabled={loadingDelete}
                  className="px-4 py-2 rounded-lg border border-border-muted hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteAccount}
                  disabled={loadingDelete}
                  className="px-4 py-2 rounded-lg bg-status-error text-on-error disabled:opacity-60"
                >
                  {loadingDelete ? "Deleting..." : "Confirm"}
                </button>
              </div>
            )}
          </div>

          {confirmDelete && (
            <p className="text-xs text-status-error">
              This action cannot be undone.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecuritySettings;
