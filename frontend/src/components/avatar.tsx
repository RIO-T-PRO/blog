const ACCENT_COLORS = [
  "#E8A838",
  "#5B8DEF",
  "#3DBDA7",
  "#E87B5B",
  "#9B7FE8",
] as const;

type AvatarSize = 7 | 8 | 9 | 10 | 11 | 12;

type AvatarRounded = "full" | "xl" | "2xl";

// eslint-disable-next-line react-refresh/only-export-components
export const accentFor = (id?: string) => {
  if (!id?.trim()) {
    return ACCENT_COLORS[0];
  }

  const hash = [...id].reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
};

const initials = (name?: string, email?: string) => {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);

    // FIRST + LAST INITIAL
    if (parts.length >= 2) {
      return `${parts[0][0] ?? ""}${
        parts[parts.length - 1][0] ?? ""
      }`.toUpperCase();
    }

    // SINGLE NAME
    return parts[0].slice(0, 2).toUpperCase();
  }

  if (email?.trim()) {
    return email.trim().slice(0, 2).toUpperCase();
  }

  return "?";
};

interface AvatarProps {
  name?: string;
  email?: string;
  avatar?: string | null;
  id?: string;
  size?: AvatarSize;
  rounded?: AvatarRounded;
  className?: string;
  textSize?: string;
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
  7: "text-[9px]",
  8: "text-[10px]",
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
  rounded = "xl",
  className = "",
  textSize,
  clickable = false,
}: AvatarProps) => {
  const color = accentFor(id ?? name ?? email);

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={name ?? email ?? "User avatar"}
      className={[
        "group relative shrink-0 overflow-hidden",
        "border border-border-muted/60 bg-surface",
        "transition-all duration-300",
        dimensions[size],
        radius[rounded],

        clickable
          ? "cursor-pointer hover:border-primary/30 hover:shadow-sm"
          : "",

        className,
      ].join(" ")}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name ?? "Avatar"}
          loading="lazy"
          className={[
            "h-full w-full object-cover transition-transform duration-500",
            clickable ? "group-hover:scale-[1.03]" : "",
          ].join(" ")}
        />
      ) : (
        <div
          className={[
            "flex h-full w-full items-center justify-center",
            "font-ui font-semibold uppercase text-white",
            textSize ?? fontSizes[size],
          ].join(" ")}
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          }}
        >
          {initials(name, email)}
        </div>
      )}

      {clickable && (
        <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />
      )}
    </div>
  );
};

export default Avatar;
