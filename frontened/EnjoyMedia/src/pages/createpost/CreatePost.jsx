import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../features/posts/postSlice';
import './createpost.css'

export default function CreatePost() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(formData));
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

