import { articles } from "@/types/articles";
import { Container } from "../layout/container";
import SectionHeading from "../layout/section-heading";

const LatestReadingSection = () => {
  return (
    <section className="py-10">
      <Container>
        <SectionHeading title="Latest Reading" />

        <div className="mt-8 flex flex-col space-y-6">
          {articles.map((a) => (
            <div key={a.id} className="border-b border-outline-variant pb-6">
              <p className="text-sm font-semibold text-primary">{a.category}</p>

              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="text-on-surface-variant">{a.excerpt}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestReadingSection;
