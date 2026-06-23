import { useState } from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";

const NotificationSettings = () => {
  const [prefs, setPrefs] = useState({
    emailComments: true,
    emailNewsletter: false,
    inAppMentions: true,
    inAppUpdates: false,
    appStatusChanges: true, // application status changes
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Notification Preferences
          </h2>
        </div>

        <div className="max-w-xl space-y-5">
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-on-surface-variant" />
              <div>
                <p className="font-medium">Email on new comments</p>
                <p className="text-sm text-on-surface-variant">
                  When someone comments on your articles
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("emailComments")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.emailComments ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.emailComments ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-on-surface-variant" />
              <div>
                <p className="font-medium">Weekly newsletter</p>
                <p className="text-sm text-on-surface-variant">
                  Top stories and editor’s picks
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("emailNewsletter")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.emailNewsletter ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.emailNewsletter ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3">
              <FaBell className="text-on-surface-variant" />
              <div>
                <p className="font-medium">In‑app mentions</p>
                <p className="text-sm text-on-surface-variant">
                  When someone @mentions you
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("inAppMentions")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.inAppMentions ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.inAppMentions ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3">
              <FaBell className="text-on-surface-variant" />
              <div>
                <p className="font-medium">Product updates</p>
                <p className="text-sm text-on-surface-variant">
                  New features and improvements
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("inAppUpdates")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.inAppUpdates ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.inAppUpdates ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Application status changes toggle */}
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="flex items-center gap-3">
              <FaBell className="text-on-surface-variant" />
              <div>
                <p className="font-medium">Application status changes</p>
                <p className="text-sm text-on-surface-variant">
                  When your writer application is reviewed (approved/rejected)
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("appStatusChanges")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.appStatusChanges ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.appStatusChanges ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationSettings;
