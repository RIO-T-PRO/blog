import { FaCheck, FaEyeSlash, FaPen, FaEllipsis } from "react-icons/fa6";

type Props = {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
};

const PostCard = ({ id, title, author, category, status }: Props) => {
  return (
    <div className="rounded-xl border border-border-muted bg-surface p-6 shadow-sm transition-all hover:border-outline-variant">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              {status}
            </span>

            <span className="text-xs text-text-secondary">Article #{id}</span>
          </div>

          <h3 className="font-headline-md text-2xl text-on-background">
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-secondary">
            <span>{author}</span>
            <span>{category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border-muted p-3 text-status-success hover:bg-status-success/10">
            <FaCheck />
          </button>

          <button className="rounded-lg border border-border-muted p-3 text-primary hover:bg-primary/10">
            <FaPen />
          </button>

          <button className="rounded-lg border border-border-muted p-3 text-error hover:bg-error/10">
            <FaEyeSlash />
          </button>

          <button className="rounded-lg p-3 text-text-secondary hover:bg-surface-variant">
            <FaEllipsis />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
