import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

const IconButton = ({ icon, className = "", ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg p-2 text-on-surface transition-colors hover:bg-surface-high ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
