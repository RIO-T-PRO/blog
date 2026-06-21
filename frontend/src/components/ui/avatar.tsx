const ACCENT_COLORS = [
  "#E8A838",
  "#5B8DEF",
  "#3DBDA7",
  "#E87B5B",
  "#9B7FE8",
] as const;

export const accentFor = (id?: string) => {
  if (!id?.trim()) return ACCENT_COLORS[0];

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
};

const initials = (name?: string, email?: string) => {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (
        (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "")
      ).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }

  if (email?.trim()) return email.slice(0, 2).toUpperCase();
  return "?";
};

type AvatarSize = 7 | 8 | 9 | 10 | 11 | 12;
type AvatarRounded = "full" | "xl" | "2xl";

interface AvatarProps {
  name?: string;
  email?: string;
  avatar?: string | null;
  id?: string;
  size?: AvatarSize;
  rounded?: AvatarRounded;
  className?: string;
  clickable?: boolean;
}

const dimensions: Record<AvatarSize, string> = {
  7: "h-7 w-7",
  8: "h-8 w-8",
  9: "h-9 w-9",
  10: "h-10 w-10",
  11: "h-11 w-11",
  12: "h-12 w-12",
};

const fontSizes: Record<AvatarSize, string> = {
  7: "text-[10px]",
  8: "text-xs",
  9: "text-xs",
  10: "text-sm",
  11: "text-sm",
  12: "text-base",
};

const radius: Record<AvatarRounded, string> = {
  full: "rounded-full",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export const Avatar = ({
  name,
  email,
  avatar,
  id,
  size = 9,
  rounded = "full",
  className = "",
  clickable = false,
}: AvatarProps) => {
  const color = accentFor(id ?? name ?? email);

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={name ?? email ?? "User avatar"}
      className={[
        "relative shrink-0 overflow-hidden",
        "border border-border-muted/70",
        "bg-surface shadow-sm",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        "active:scale-[0.98]",
        dimensions[size],
        radius[rounded],
        clickable ? "cursor-pointer hover:shadow-md" : "",
        className,
      ].join(" ")}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name ?? "Avatar"}
          loading="lazy"
          className={[
            "h-full w-full object-cover",
            "transition-transform duration-300",
            clickable ? "hover:scale-[1.05]" : "",
          ].join(" ")}
        />
      ) : (
        <div
          className={[
            "flex h-full w-full items-center justify-center",
            "font-semibold uppercase text-white",
            fontSizes[size],
          ].join(" ")}
          style={{
            background: `radial-gradient(circle at top left, ${color}, ${color}cc)`,
          }}
        >
          {initials(name, email)}
        </div>
      )}

      {/* STRONGER HOVER FEEDBACK */}
      {clickable && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition" />
      )}
    </div>
  );
};

export default Avatar;
