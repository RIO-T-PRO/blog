import { useParams } from "react-router-dom";
import ArticleDetail from "@/components/article/article-detail";
import { CommentProvider } from "@/lib/context/comment";
import CommentSection from "../comment/comment-section";

const DashboardArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();

  if (!articleId) {
    return (
      <div className="text-center py-20 text-error">Invalid article ID</div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-8 py-8">
      <ArticleDetail articleId={articleId} />
      <hr className="border-t border-outline-variant my-12" />
      <CommentProvider articleId={articleId}>
        <CommentSection />
      </CommentProvider>
    </div>
  );
};

export default DashboardArticleDetail;
