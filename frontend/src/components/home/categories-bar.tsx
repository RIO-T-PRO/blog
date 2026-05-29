import { categories } from "@/lib/data";
import Container from "../ui/container";
import { useState } from "react";

const CategoriesBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section className="mt-12">
      <Container>
        <div className="overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex w-max gap-3">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full border border-border-muted ${categories[index] === selectedCategory ? "bg-primary text-white hover:text-zinc-300" : "bg-surface text-text-secondary"} px-6 py-2 font-ui text-sm font-medium tracking-wide  transition-colors hover:border-outline-variant hover:text-on-surface`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesBar;
