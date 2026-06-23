import { type ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  action?: ReactNode;
}

const SectionHeading = ({ title, action }: SectionHeadingProps) => {
  return (
    <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
      <h2 className="text-2xl font-semibold text-on-surface">{title}</h2>

      {action}
    </div>
  );
};

export default SectionHeading;
