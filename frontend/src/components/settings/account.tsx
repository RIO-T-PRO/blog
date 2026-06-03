import { useState } from "react";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaListUl,
  FaCheckCircle,
} from "react-icons/fa";

const AccountSettings = () => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="mb-section-gap">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-headline-md text-headline-md text-on-background">
          Edit Profile
        </h2>
        <p className="font-label-ui text-text-secondary">
          Personal Information
        </p>
      </div>

      <div className="bg-surface ambient-shadow rounded-xl p-8 border border-border-muted space-y-8">
        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Full Name
            </label>
            <input
              className="w-full bg-background border-border-muted rounded-lg px-4 py-2.5 font-body-standard focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Elena Vance"
              type="text"
            />
          </div>

          <div>
            <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-label-ui">
                @
              </span>
              <input
                className="w-full bg-background border-border-muted rounded-lg pl-8 pr-4 py-2.5 font-body-standard focus:ring-1 focus:ring-primary focus:border-primary"
                defaultValue="elenavance"
                type="text"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Website
            </label>
            <input
              className="w-full bg-background border-border-muted rounded-lg px-4 py-2.5 font-body-standard focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="https://elenavance.com"
              type="url"
            />
          </div>

          {/* STATUS */}
          <div className="md:col-span-2 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-status-success text-[18px]" />

              <span className="font-label-ui text-sm text-text-primary uppercase tracking-tight">
                Account Status:{" "}
                <span className="text-status-success font-bold">Active</span>
              </span>
            </div>

            <div className="text-right">
              <p className="font-label-caps text-text-secondary uppercase text-[10px] tracking-widest">
                Member Since
              </p>
              <p className="font-label-ui text-sm font-semibold text-text-primary">
                October 24, 2023
              </p>
            </div>
          </div>
        </div>

        {/* BIO EDITOR */}
        <div>
          <div
            className={`bio-editor bg-background border rounded-lg transition-colors overflow-hidden ${
              focused ? "border-primary" : "border-border-muted"
            }`}
          >
            <div className="flex gap-2 p-2 border-b border-border-muted/50 bg-surface-container-lowest">
              <button className="p-1 hover:bg-surface-container rounded">
                <FaBold />
              </button>
              <button className="p-1 hover:bg-surface-container rounded">
                <FaItalic />
              </button>
              <button className="p-1 hover:bg-surface-container rounded">
                <FaLink />
              </button>
              <button className="p-1 hover:bg-surface-container rounded">
                <FaListUl />
              </button>
            </div>

            <textarea
              className="w-full bg-transparent border-none focus:ring-0 p-4 font-body-standard leading-relaxed resize-none"
              rows={4}
              defaultValue="Cultural critic and essayist based in London. Exploring the intersection of digital intimacy and traditional craft. Currently contributing to Chronicle's Science and Culture columns."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>

          <p className="text-[12px] text-text-secondary mt-2 font-body-standard italic">
            Brief description for your profile page and essay bylines.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-border-muted/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-[13px] font-body-standard">
            All fields except username and primary email are visible to the
            public.
          </p>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg font-label-ui text-text-secondary hover:bg-surface-container-high transition-colors">
              Discard
            </button>

            <button className="flex-1 md:flex-none px-8 py-2.5 rounded-lg bg-primary text-on-primary font-label-ui hover:opacity-90 transition-opacity ambient-shadow">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <section className="mb-12 mt-10">
        <div className="p-8 border border-status-error/20 bg-status-error/5 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="font-label-ui text-status-error font-bold text-[16px] mb-1">
              Archive Account
            </h3>
            <p className="text-[13px] text-on-surface-variant opacity-80 font-body-standard">
              Temporarily hide your profile and published essays from the public
              archive.
            </p>
          </div>

          <button className="px-6 py-2 border border-status-error/30 text-status-error rounded-lg font-label-ui text-[13px] hover:bg-status-error hover:text-on-error transition-all">
            Archive
          </button>
        </div>
      </section>
    </section>
  );
};

export default AccountSettings;
