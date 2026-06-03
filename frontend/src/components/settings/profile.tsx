import { useRef, useState } from "react";
import Avatar from "@/components/avatar";
import { FaCamera } from "react-icons/fa";

const ProfileSettings = () => {
  const [avatar, setAvatar] = useState<string | null>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZAO93yvs2lbxoO5qY80NhINyNvoCZ7e1HOmtmi-qLymK3NSOxyLci6y0w3lPc5D44I4j7Var_Xd99nHFAzq7wKNJi530WgOt0C6Pf2yca3yJyxDE9x_Zz2YEdVJbRuQwQ3JpciakJNDCBIUfAxq4N2Dhf8stfOk0eGA8KnT9QlEGxSryVe49_v0Du7ABunY0uGGch-RAlvQ21ySqLeleAHKE7c-c47d06nOCZxZ32D30ltvjE",
  );

  const [displayName, setDisplayName] = useState("Elena Vance");
  const [bio, setBio] = useState(
    "Cultural critic and essayist based in London. Exploring the intersection of digital intimacy and traditional craft. Currently contributing to Chronicle's Science and Culture columns.",
  );

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mb-section-gap">
      <h2 className="font-headline-md text-headline-md mb-8 text-on-background">
        Profile Overview
      </h2>

      <div className="bg-surface ambient-shadow rounded-xl p-8 border border-border-muted">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar Upload */}
          <div className="shrink-0 flex flex-col items-center">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <Avatar
                avatar={avatar}
                name="Elena Vance"
                size={12}
                rounded="full"
                clickable
              />

              <div className="absolute inset-0 flex items-center justify-center bg-on-background/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200">
                <FaCamera className="text-white text-xl" />
              </div>
            </div>

            <p className="font-label-ui text-[12px] text-center mt-3 text-text-secondary">
              Click to update
            </p>

            <input
              ref={fileRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-6">
            {/* READ ONLY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 opacity-70">
              <div>
                <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
                  Account Full Name (Read Only)
                </label>
                <input
                  className="w-full bg-surface-container border-border-muted rounded-lg px-4 py-2.5 font-body-standard cursor-not-allowed"
                  value="Elena Vance"
                  readOnly
                />
              </div>

              <div>
                <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
                  Account Email (Read Only)
                </label>
                <input
                  className="w-full bg-surface-container border-border-muted rounded-lg px-4 py-2.5 font-body-standard cursor-not-allowed"
                  value="elena.vance@chronicle.com"
                  readOnly
                />
              </div>
            </div>

            {/* DISPLAY NAME */}
            <div>
              <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
                Display Name
              </label>

              <input
                className="w-full bg-background border-border-muted rounded-lg px-4 py-2.5 font-body-standard focus:ring-1 focus:ring-primary focus:border-primary transition-shadow"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* BIO */}
            <div>
              <label className="block font-label-ui text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
                Biography
              </label>

              <textarea
                className="w-full bg-transparent border-none focus:ring-0 p-4 font-body-standard leading-relaxed resize-none"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
