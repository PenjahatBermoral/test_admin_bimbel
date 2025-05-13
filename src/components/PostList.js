import React from 'react';

function PostList({ posts, handleUpdatePost, handleDeletePost }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleUpdatePost(post.id)}>Update</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
