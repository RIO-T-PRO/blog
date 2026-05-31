type WriterStatsProps = {
  label: string;
  value: string;
};

const WriterStats = ({ label, value }: WriterStatsProps) => {
  return (
    <div className="rounded-2xl border border-border-muted bg-white/70 p-5 backdrop-blur-sm">
      <p className="text-sm text-text-secondary">{label}</p>

      <h3 className="mt-2 font-display text-4xl text-on-surface">{value}</h3>
    </div>
  );
};

export default WriterStats;
