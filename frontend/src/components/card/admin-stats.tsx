type Props = {
  label: string;
  value: string;
};

const StatCard = ({ label, value }: Props) => {
  return (
    <div className="rounded-2xl border border-border-muted bg-surface p-6 shadow-sm">
      <p className="text-sm uppercase tracking-widest text-text-secondary">
        {label}
      </p>

      <h3 className="mt-3 font-headline-md text-4xl text-on-background">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;
