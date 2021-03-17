import React from "react";

interface PostListProps {
  postId: string;
  render: boolean;
  comments: Comment[];
}
export interface Comment {
  id: string;
  content: string;
  postId: string;
  status: string;
}
export const CommentList = ({ render, postId, comments }: PostListProps) => {
  const renderedComments = comments.map((comment: Comment) => {
    let content;
    if (comment.status === "approved") content = comment.content;
    else if (comment.status === "pending")
      content = "Comment pending moderation";
    else {
      content = "Comment rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};
