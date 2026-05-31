import { FaArrowTrendUp, FaPen, FaRegTrashCan } from "react-icons/fa6";

type StoryCardProps = {
  title: string;
  category: string;
  status: string;
  reads: string;
  date: string;
  image: string;
};

const statusStyles: Record<string, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-orange-100 text-orange-700",
  Scheduled: "bg-blue-100 text-blue-700",
};

const StoryCard = ({
  title,
  category,
  status,
  reads,
  date,
  image,
}: StoryCardProps) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border-muted bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col lg:flex-row">
        <div className="h-60 overflow-hidden lg:h-auto lg:w-72">
          <img
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 font-ui text-xs font-semibold ${statusStyles[status]}`}
              >
                {status}
              </span>

              <span className="text-sm text-text-secondary">{date}</span>
            </div>

            <h3 className="font-display text-3xl leading-tight text-on-surface">
              {title}
            </h3>

            <p className="mt-3 text-sm text-text-secondary">
              {category} • {reads} reads
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-ui text-sm font-medium text-white transition-all hover:bg-primary-container">
              <FaPen className="text-xs" />
              Edit
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-border-muted px-4 py-3 font-ui text-sm font-medium text-on-surface transition-all hover:bg-surface-container">
              <FaArrowTrendUp className="text-xs" />
              Analytics
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-ui text-sm font-medium text-red-600 transition-all hover:bg-red-50">
              <FaRegTrashCan className="text-xs" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
