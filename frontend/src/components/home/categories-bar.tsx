import Container from "../ui/container";

export const articleFilters = ["All", "Latest", "Oldest"] as const;

export type ArticleFilter = (typeof articleFilters)[number];

type CategoriesBarProps = {
  selectedFilter: ArticleFilter;
  onFilterChange: (filter: ArticleFilter) => void;
};

const CategoriesBar = ({
  selectedFilter,
  onFilterChange,
}: CategoriesBarProps) => {
  return (
    <section className="mt-12">
      <Container>
        <div className="flex flex-wrap items-center gap-3">
          {articleFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-xl border px-5 py-2 font-ui text-sm font-medium tracking-wide transition-all duration-200 ${
                selectedFilter === filter
                  ? "border-primary bg-primary text-white"
                  : "border-border-muted bg-surface text-text-secondary hover:border-outline-variant hover:text-on-surface"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesBar;
