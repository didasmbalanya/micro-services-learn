import React, { useState } from "react";
import { PostCreate } from "./components/PostCreate";
import { PostList } from "./components/PostList";

export const App = () => {
  const [render, setRender] = useState(false);
  return (
    <div>
      <h1>Create Post</h1>
      <PostCreate setRender={setRender} render={render} />
      <hr />
      <h1>Posts</h1>
      <PostList render={render} setRender={setRender}/>
    </div>
  );
};
