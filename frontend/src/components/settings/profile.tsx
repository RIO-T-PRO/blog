import { useEffect, useRef, useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";

import Avatar from "@/components/avatar";
import { getProfile, updateProfile, updateUser } from "@/lib/api/auth";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [userId, setUserId] = useState("");
  const [profileId, setProfileId] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState("");

  const [status, setStatus] = useState(true);
  const [memberSince, setMemberSince] = useState("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const inputClass =
    "mt-1 w-full bg-background border border-border-muted rounded-lg px-4 py-2.5 " +
    "transition-colors duration-150 " +
    "hover:border-primary/60 " +
    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary " +
    "disabled:opacity-70";

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      if (!res) return;

      const profile = res.data.profile;

      setUserId(profile.user.user_id);
      setProfileId(profile.user_profile_id ?? "");

      setFullname(profile.user.fullname);
      setEmail(profile.user.email);
      setAvatar(profile.avatar ?? null);
      setBio(profile.bio ?? "");
      setStatus(Boolean(profile.user.status));

      if (profile.createdAt) {
        setMemberSince(
          new Date(profile.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          }),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await Promise.all([
        updateUser(userId, { fullname, email }),
        updateProfile(profileId, { bio, avatar: avatar ?? "" }),
      ]);

      setIsEditing(false);
      alert("Profile updated");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setIsEditing(false);
    void loadProfile();
  };

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto">
        <p>Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="space-y-6 max-w-3xl mx-auto">
      {/* HEADER (NO EDIT HERE ANYMORE) */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-background">
          Profile
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Manage your personal information
        </p>
      </div>

      {/* CARD */}
      <div className="bg-surface border border-border-muted rounded-xl p-5 space-y-6">
        {/* AVATAR ROW + EDIT BUTTON (FIXED POSITION) */}
        <div className="flex items-center justify-between">
          {/* LEFT: AVATAR */}
          <div className="flex items-center gap-5">
            <div
              className="relative cursor-pointer"
              onClick={() => isEditing && fileRef.current?.click()}
            >
              <Avatar
                avatar={avatar}
                name={fullname}
                size={10}
                rounded="full"
                clickable
              />

              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 rounded-full transition">
                  <FaCamera className="text-white" />
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <div className="text-sm">
              <p className="font-medium">{fullname}</p>
              <p className="text-text-secondary text-xs">{email}</p>
            </div>
          </div>

          {/* RIGHT: EDIT BUTTON (NOW CORRECT POSITION) */}
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border-muted rounded-lg hover:bg-surface-container transition"
          >
            <FaEdit />
            {isEditing ? "Close" : "Edit"}
          </button>
        </div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={fullname}
            disabled={!isEditing}
            onChange={(e) => setFullname(e.target.value)}
            className={inputClass}
          />

          <input
            value={email}
            disabled={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* BIO */}
        <div>
          <label className="block text-sm font-medium text-on-background mb-2">
            Bio
          </label>

          <textarea
            rows={4}
            value={bio}
            disabled={!isEditing}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell readers a little about yourself..."
            className={
              inputClass +
              " resize-none leading-relaxed text-sm placeholder:text-text-secondary/60"
            }
          />
        </div>

        {/* STATUS */}
        <div className="flex justify-between text-xs text-text-secondary">
          <span>
            Status:{" "}
            <b className="text-status-success">
              {status ? "Active" : "Inactive"}
            </b>
          </span>

          <span>Member since {memberSince}</span>
        </div>

        {/* ACTIONS */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-3 border-t border-border-muted">
            <button
              onClick={handleDiscard}
              className="px-4 py-2 border border-border-muted rounded-lg hover:bg-surface-container"
            >
              Discard
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-primary text-on-primary rounded-lg disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSettings;
