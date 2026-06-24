export type CommentUser = {
  id: string;
  name: string;
  profile: {
    username: string;
    avatarUrl: string;
  } | null;
};

export type Comment = {
  id: string;
  articleId: string;
  userId: string;
  content: string;
  parentId: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  replies?: Comment[];
};
