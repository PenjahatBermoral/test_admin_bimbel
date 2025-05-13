import React from 'react';

function PostForm({ newPost, setNewPost, handleCreatePost }) {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        className="form-control"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <button onClick={handleCreatePost} className="btn btn-primary">Create Post</button>
    </div>
  );
}

export default PostForm;
