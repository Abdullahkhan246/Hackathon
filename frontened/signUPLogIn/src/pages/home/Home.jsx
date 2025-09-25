import React from 'react';
import './home.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Enjoy Media</div>
        <div className="nav-links">
          <a href="#">Leaderboard</a>
          <a href="#">Create Post</a>
          <a href="#">Profile</a>
        </div>
      </nav>

      {/* Post */}
      <div className="post-card">
        <div className="post-header">
          <img
            src="https://via.placeholder.com/40"
            alt="user"
            className="user-avatar"
          />
          <div>
            <h4>User Name</h4>
            <p className="user-desc">A short description about the user goes here.</p>
          </div>
        </div>

        <h2 className="post-title">This is the Title of the Post</h2>

        <div className="post-body">
          {/* Upvote */}
          <div className="vote-btn upvote">
            ⬆
            <span>Upvote</span>
          </div>

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            alt="post"
            className="post-image"
          />

          {/* Downvote */}
          <div className="vote-btn downvote">
            ⬇
            <span>Downvote</span>
          </div>
        </div>

        <div className="post-footer">
          <div className="actions">
            <span>👍 Like</span>
            <span>👎 Dislike</span>
            <span>💬 Comment</span>
          </div>
          <div className="actions">
            <span>✏ Edit</span>
            <span>🗑 Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
