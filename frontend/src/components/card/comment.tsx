import CommentCard from "./comment-card";

const comments = [
  {
    name: "Julianne Dorsey",
    status: "Pending",
    post: "The Art of Slow Living",
    comment:
      "This editorial really spoke to me. I've been trying to reduce my screen time.",
  },
  {
    name: "Markus Vane",
    status: "Flagged",
    post: "Future of Digital Media",
    comment: "This perspective ignores the reality of market dynamics.",
  },
  {
    name: "FastCryptoBot",
    status: "Spam",
    post: "Why We Write",
    comment: "Earn $5000 a week from home today.",
  },
];

export default function CommentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-headline-md text-4xl">Comment Moderation</h2>

        <p className="mt-2 text-text-secondary">
          Review community conversations and moderation reports.
        </p>
      </div>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <CommentCard key={index} {...comment} />
        ))}
      </div>
    </div>
  );
}
