import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../../features/posts/postSlice';
import './postlist.css'

export default function PostList() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
