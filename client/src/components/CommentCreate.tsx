import axios from "axios";
import React, { useState } from "react";
interface CommentCreateInterface {
  postId: string;
  render: boolean;
  setRender: Function;
}
export const CommentCreate = ({
  postId,
  render,
  setRender,
}: CommentCreateInterface) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setTimeout(() => {
      setRender(!render);
    }, 3000);

    setContent("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Comment</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={content}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
