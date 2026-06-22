// SecuritySettings.tsx
import { useState } from "react";
import {
  FaLock,
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";

const SecuritySettings = () => {
  const { logout } = useAuth();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: call API to change password
    console.log("Changing password...");
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // TODO: call API to delete account permanently
      console.log("Account deleted");
      await logout();
      // navigate to home or goodbye page
    } catch (error) {
      console.error("Account deletion failed", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Change Password Section */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Change Password
          </h2>
        </div>
        <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-5">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Current Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* Delete Account Section */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Danger Zone
          </h2>
        </div>
        <div className="max-w-xl p-5 border border-error rounded-lg bg-surface-container-lowest">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-error mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-on-surface">Delete Account</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="mt-4 px-4 py-2 bg-error text-on-error rounded-lg font-label-md text-label-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaTrash /> Delete My Account
            </button>
          ) : (
            <div className="mt-4 p-4 border border-outline-variant rounded-lg bg-surface">
              <p className="text-sm text-on-surface mb-3 font-medium">
                Are you sure? This action is irreversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-error text-on-error rounded-lg font-label-md text-label-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Yes, delete"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-high transition-colors flex items-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SecuritySettings;
