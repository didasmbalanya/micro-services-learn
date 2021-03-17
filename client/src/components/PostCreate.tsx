import axios from "axios";
import React, { useState } from "react";

interface PostCreateProps {
  setRender: Function;
  render: boolean;
}

export const PostCreate = ({ setRender, render }: PostCreateProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { title });

    setRender(!render);
    setTitle("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={title}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
