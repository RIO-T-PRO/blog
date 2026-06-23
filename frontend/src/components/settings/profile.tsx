// ProfileSettings.tsx
import { useState, useEffect, useRef } from "react";
import {
  FaSave,
  FaGlobe,
  FaTrash,
  FaComment,
  FaHeart,
  FaCamera,
} from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";

// ---------- Mock data ----------
const mockSavedArticles = [
  {
    id: 1,
    title: "The Future of Digital Solitude",
    excerpt:
      "Exploring how intentional disconnection might become the ultimate luxury...",
    category: "Technology",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzrh5IRnZW89kfmjC0IIAKLdyGZIVF9WyrKcCnHRHFiCgg2C0_Tyaz-6rXInjWmursspm9jwgZd0-aR_6SBkjY22P6AdMLfdo9rn1SjtzqrKMZjghSoqqgpWL6he3YQ-VXfe4BjhrwZdYisM7iTBvxBAAq6kNslbmAVMhBq87Er7Y0wGoABQIgwl1GSBGcuSm7JXNg4oSOV3zUAEs6_MQ3VIe89jLqYobn4ea8oPP2DFEGUSClFZ-yy6M8sZXZMgyziNJDk0Av1zXi",
  },
  {
    id: 2,
    title: "Why Constraints Fuel Better Storytelling",
    excerpt:
      "An analysis of how artificial boundaries produce more innovative narratives.",
    category: "Design",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANLXdHDuYuIgH-taofUHWYRw10q_qdgpnmFYeNMIHlyNgStfkO73ikgBhEgk_jSv1SBelxSQ0a2mveOwlhVQ1csONVbkUf-NqTy042JWjTcTzLJ6cu1lJITdFRDK-epTH_MeHQVWBmB-YKe0KIYeltAX2gCrHykS6ehdD3vDSsZ9AI5Fhl6P31aLIO9gFXwQDGkGaUBv0G1h1vD9WDfC3MMIyTjPql0fzuXQ4nMNbik0daQvpb1blFofIhpGu18x82kzsSv0Ju8N9G",
  },
];

const mockActivity = [
  {
    id: 1,
    type: "comment",
    action: "Commented on",
    subject: "Designing for the Long Tail",
    date: "2 days ago",
    snippet: "This perspective on edge cases is incredibly relevant...",
  },
  {
    id: 2,
    type: "like",
    action: "Liked an article by",
    subject: "Elena Rostova",
    date: "1 week ago",
    articleTitle: "The Future of Digital Solitude",
  },
];

const ProfileSettings = () => {
  const { user, profile, updateProfile, loading } = useAuth();
  const isWriterOrAdmin =
    user?.roles.includes("writer") || user?.roles.includes("admin");

  const [form, setForm] = useState({
    name: profile?.username ?? user?.email?.split("@")[0] ?? "",
    email: user?.email ?? "",
    bio: profile?.bio ?? "",
    website: profile?.website ?? "",
    avatarUrl: profile?.avatarUrl ?? "",
  });

  // Keep form in sync with latest context data (e.g. after update)
  useEffect(() => {
    setForm({
      name: profile?.username ?? user?.email?.split("@")[0] ?? "",
      email: user?.email ?? "",
      bio: profile?.bio ?? "",
      website: profile?.website ?? "",
      avatarUrl: profile?.avatarUrl ?? "",
    });
  }, [profile, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        username: form.name,
        bio: form.bio,
        website: form.website,
        avatarUrl: form.avatarUrl,
      });
      // Optionally show success notification
    } catch (error) {
      console.error("Failed to update profile", error);
      // Optionally show error notification
    }
  };

  // Auto-resize bio textarea
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const el = bioRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize();
  }, [form.bio]);

  const interests = ["Technology", "Society", "Design", "Process", "Strategy"];

  return (
    <div className="space-y-12">
      {/* Account Details */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Account Details
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
          {/* Avatar */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Avatar
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container-high overflow-hidden border-2 border-outline-variant shrink-0">
                {form.avatarUrl ? (
                  <img
                    src={form.avatarUrl}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                    <FaCamera className="text-2xl" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  name="avatarUrl"
                  value={form.avatarUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
                />
                <p className="text-caption text-on-surface-variant mt-1">
                  Paste a direct image URL (JPEG, PNG, etc.)
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
            />
          </div>

          {/* Auto-resizing Bio */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
              Bio
            </label>
            <textarea
              ref={bioRef}
              name="bio"
              value={form.bio}
              onChange={(e) => {
                handleChange(e);
                autoResize();
              }}
              rows={1}
              placeholder="Tell readers a little about yourself..."
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors overflow-hidden resize-none"
            />
          </div>

          {isWriterOrAdmin && (
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                Website
              </label>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary-fixed focus:border-primary-fixed text-body-md font-body-md text-on-surface transition-colors"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-6 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <FaSave className="text-sm" /> Save Changes
              </>
            )}
          </button>
        </form>
      </section>

      {/* Reading Interests */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Reading Interests
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 bg-surface-container text-on-surface-variant font-caption text-caption uppercase tracking-wider rounded-lg border border-outline-variant"
            >
              {interest}
            </span>
          ))}
          <button className="px-3 py-1.5 bg-surface-container-lowest text-primary font-caption text-caption uppercase tracking-wider rounded-lg border border-dashed border-primary hover:bg-primary-fixed transition-colors">
            + Add Interest
          </button>
        </div>
      </section>

      {/* Saved for Later */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Saved for Later
          </h2>
          <a
            href="/dashboard/saved"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Manage All
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {mockSavedArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col md:flex-row gap-4 p-4 border border-outline-variant rounded-xl bg-surface-container-lowest hover:border-outline transition-all duration-200"
            >
              <div className="w-full md:w-48 h-48 md:h-32 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center grow py-2 relative">
                <button className="absolute top-2 right-2 text-on-surface-variant hover:text-error transition-colors">
                  <FaTrash className="text-[20px]" />
                </button>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-surface-container text-on-surface-variant font-caption text-caption uppercase tracking-wider rounded">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-headline-md text-body-lg md:text-headline-md text-on-surface mb-2">
                  {article.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 pr-8">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Recent Activity
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {mockActivity.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption">
                {item.type === "comment" ? (
                  <FaComment className="text-[16px]" />
                ) : (
                  <FaHeart className="text-[16px]" />
                )}
                {item.action}{" "}
                <span className="font-semibold text-on-surface">
                  {item.subject}
                </span>
                <span className="ml-auto">{item.date}</span>
              </div>
              {item.snippet && (
                <p className="font-body-md text-body-md text-on-surface">
                  “{item.snippet}”
                </p>
              )}
              {item.articleTitle && (
                <h4 className="font-body-md text-body-md text-on-surface font-semibold">
                  {item.articleTitle}
                </h4>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Admin quick links */}
      {user?.roles.includes("admin") && (
        <section>
          <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Administration
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <a
              href="/dashboard/users"
              className="p-4 rounded-lg border border-outline-variant bg-surface-container-lowest hover:border-primary-container transition-colors"
            >
              <span className="font-semibold">User Management</span>
              <p className="text-sm text-on-surface-variant mt-1">
                Manage user accounts and roles
              </p>
            </a>
            <a
              href="/dashboard/role-applications"
              className="p-4 rounded-lg border border-outline-variant bg-surface-container-lowest hover:border-primary-container transition-colors"
            >
              <span className="font-semibold">Role Applications</span>
              <p className="text-sm text-on-surface-variant mt-1">
                Review pending writer/editor requests
              </p>
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfileSettings;
