import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCreate } from "./CommentCreate";
import { CommentList, Comment } from "./CommentsList";

interface PostListProps {
  render: boolean;
  setRender: Function
}
interface Post {
  id: string;
  title: string;
  comments: Comment[]
}
export const PostList = ({ render,setRender }: PostListProps) => {
  const [posts, setPosts] = useState({});
  const getPosts = async () => {
    const { data } = await axios.get("http://localhost:4002/posts");
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, [render]);

  const renderedPosts = (Object.values(posts) as Post[]).map((post) => {
    const {id, title, comments} = post
    return (
      <div
        key={id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{title}</h3>
          <br />
          <CommentList postId={post.id} render={render} comments={comments}/>
          <CommentCreate postId={post.id} render={render} setRender={setRender}/>
        </div>
      </div>
    );
  });
  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};
