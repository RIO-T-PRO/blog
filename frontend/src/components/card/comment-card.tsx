import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";

type Props = {
  name: string;
  status: string;
  post: string;
  comment: string;
};

const CommentCard = ({ name, status, post, comment }: Props) => {
  return (
    <div className="rounded-xl border border-border-muted bg-surface p-6 shadow-sm transition-all hover:border-outline-variant">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-on-surface">{name}</h3>

          <p className="text-xs uppercase tracking-widest text-text-secondary">
            {status}
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          {status}
        </span>
      </div>

      <p className="mb-2 text-xs uppercase tracking-widest text-accent-teal">
        Post: {post}
      </p>

      <p className="italic leading-relaxed text-on-surface-variant">
        “{comment}”
      </p>

      <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-border-muted pt-4">
        <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-status-success hover:bg-status-success/10">
          <FaCheckCircle />
          Approve
        </button>

        <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-primary hover:bg-primary/10">
          <FaFlag />
          Spam
        </button>

        <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-error hover:bg-error/10">
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
