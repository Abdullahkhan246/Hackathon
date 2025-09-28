import React, { useState, useEffect, useCallback } from 'react';
import './leaderboard.css';

// Mock data generator for leaderboard (same as Home.jsx but sorted by votes)
const generateLeaderboardPosts = (count) => {
  const posts = [];
  const mediaTypes = ['image', 'video', 'text'];
  const sampleImages = [
    'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
  ];
  const sampleVideos = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  ];

  // Better avatar images
  const avatarImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  ];

  const userNames = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emma Wilson',
    'David Brown', 'Lisa Anderson', 'Tom Taylor', 'Amy Garcia'
  ];

  const descriptions = [
    'Software Developer', 'UI/UX Designer', 'Product Manager', 'Data Scientist',
    'Marketing Specialist', 'Content Creator', 'Photographer', 'Artist'
  ];

  // Realistic social media post descriptions
  const postDescriptions = [
    "Just finished an amazing project! 🚀 The team worked so hard and the results are incredible. So proud of what we accomplished together! #teamwork #success",
    "Coffee break with my best friend ☕️ Sometimes you need these little moments to recharge and catch up on life. Grateful for good friends!",
    "Working from home today and loving the flexibility! 💻 Home office setup is finally complete. Productivity level: 100% 📈",
    "Just completed my morning workout! 💪 Feeling energized and ready to tackle the day. Remember, consistency is key! #fitness #motivation",
    "Beautiful sunset from my balcony tonight 🌅 Nature never fails to amaze me. Taking a moment to appreciate the simple things in life.",
    "Had an amazing dinner with family tonight 🍽️ Nothing beats home-cooked meals and quality time with loved ones. These moments are precious!",
    "Just finished reading an incredible book! 📚 Highly recommend it to anyone interested in personal development. Knowledge is power!",
    "Working on a new side project that I'm really excited about! 💡 Sometimes the best ideas come when you least expect them. #creativity",
    "Just got back from an amazing vacation! ✈️ Traveling always gives me a fresh perspective on life. Can't wait to plan the next adventure!",
    "Celebrating a small win today! 🎉 Every step forward counts, no matter how small. Grateful for progress and growth!",
    "Just finished a challenging workout! 🏋️‍♀️ Pushed myself harder than ever and it feels amazing. Your only limit is your mind!",
    "Working late tonight but feeling motivated! 🌙 Sometimes the best work happens when the world is quiet. Passion drives everything!",
    "Just had an amazing brainstorming session with my team! 💭 Great ideas are born when creative minds come together. Love my work!",
    "Trying out a new recipe tonight! 👨‍🍳 Cooking is my therapy. There's something magical about creating something delicious from scratch.",
    "Just completed a 5K run! 🏃‍♂️ Running clears my mind and gives me energy for the day. Small steps lead to big achievements!",
    "Working on my portfolio and feeling proud of my progress! 📸 Every project teaches me something new. Growth mindset is everything!",
    "Just finished a great book club meeting! 📖 Discussing ideas with like-minded people is so enriching. Learning never stops!",
    "Had an amazing day exploring the city! 🏙️ Sometimes you need to be a tourist in your own town. New discoveries everywhere!",
    "Just completed a coding challenge! 💻 Problem-solving is like a puzzle, and I love putting the pieces together. #programming",
    "Working on my garden today! 🌱 There's something therapeutic about nurturing plants. Nature teaches us patience and growth."
  ];

  for (let i = 0; i < count; i++) {
    const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
    posts.push({
      id: i + 1,
      user: {
        name: userNames[i % userNames.length],
        avatar: avatarImages[i % avatarImages.length],
        description: descriptions[i % descriptions.length]
      },
      title: `Post Title ${i + 1}`,
      content: postDescriptions[i % postDescriptions.length],
      media: mediaType === 'image' ? sampleImages[Math.floor(Math.random() * sampleImages.length)] : 
             mediaType === 'video' ? sampleVideos[Math.floor(Math.random() * sampleVideos.length)] : null,
      mediaType: mediaType,
      upvotes: Math.floor(Math.random() * 200) + 50, // Higher votes for leaderboard
      downvotes: Math.floor(Math.random() * 30),
      likes: Math.floor(Math.random() * 100) + 20,
      dislikes: Math.floor(Math.random() * 15),
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 30) + 5,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  // Sort by total score (upvotes - downvotes) for leaderboard
  return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
};

export default function LeaderBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userVotes, setUserVotes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});

  // Load leaderboard posts
  useEffect(() => {
    loadLeaderboardPosts();
  }, []);

  const loadLeaderboardPosts = useCallback(async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const leaderboardPosts = generateLeaderboardPosts(10); // Top 10 posts
    setPosts(leaderboardPosts);
    setLoading(false);
  }, []);

  const handleVote = (postId, type) => {
    // Update post votes directly - no removing votes, just adding points
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let upvotes = post.upvotes;
        let downvotes = post.downvotes;
        
        if (type === 'upvote') {
          upvotes += 5; // Add 5 points for upvote
        } else if (type === 'downvote') {
          downvotes += 2; // Add 2 points for downvote (subtract from total score)
        }
        
        return { ...post, upvotes, downvotes };
      }
      return post;
    }));
  };

  const handleLike = (postId) => {
    setUserLikes(prev => {
      const isLiked = prev[postId];
      return { ...prev, [postId]: !isLiked };
    });
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = userLikes[postId];
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleDislike = (postId) => {
    setUserLikes(prev => {
      const isDisliked = prev[postId + '_dislike'];
      return { ...prev, [postId + '_dislike']: !isDisliked };
    });
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isDisliked = userLikes[postId + '_dislike'];
        return {
          ...post,
          dislikes: isDisliked ? post.dislikes - 1 : post.dislikes + 1
        };
      }
      return post;
    }));
  };

  const handleShare = (postId) => {
    if (navigator.share) {
      navigator.share({
        title: `Post ${postId}`,
        text: 'Check out this post!',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentSubmit = (postId) => {
    const commentText = commentTexts[postId]?.trim();
    if (!commentText) return;

    // Update comment count
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));

    // Clear the input
    setCommentTexts(prev => ({
      ...prev,
      [postId]: ''
    }));

    // Close the comments section
    setShowComments(prev => ({
      ...prev,
      [postId]: false
    }));

    console.log(`Comment added to post ${postId}: ${commentText}`);
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts(prev => ({
      ...prev,
      [postId]: text
    }));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Leading posts of today</h1>
      </div>
      
      <div className="leaderboard-posts">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div key={post.id} className="leaderboard-post-card">
              {/* Ranking Badge */}
              <div className="ranking-badge">
                #{index + 1}
              </div>
              
              {/* Post Header */}
              <div className="post-header">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="user-avatar"
                />
                <div className="user-info">
                  <h4 className="user-name">{post.user.name}</h4>
                  <p className="user-desc">{post.user.description}</p>
                  <span className="post-time">{formatTimeAgo(post.timestamp)}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="post-content">
                <h2 className="post-title">{post.content}</h2>
                
                {/* Media */}
                {post.media && (
                  <div className="post-media">
                    {post.mediaType === 'image' ? (
                      <img
                        src={post.media}
                        alt="post"
                        className="post-image"
                      />
                    ) : post.mediaType === 'video' ? (
                      <video
                        src={post.media}
                        controls
                        className="post-video"
                      />
                    ) : null}
                  </div>
                )}
              </div>

              {/* Voting Section */}
              <div className="voting-section">
                <button
                  className={`vote-btn upvote ${userVotes[post.id] === 'upvote' ? 'active' : ''}`}
                  onClick={() => handleVote(post.id, 'upvote')}
                >
                  ⬆ <span>{post.upvotes}</span>
                </button>
                <button
                  className={`vote-btn downvote ${userVotes[post.id] === 'downvote' ? 'active' : ''}`}
                  onClick={() => handleVote(post.id, 'downvote')}
                >
                  ⬇ <span>{post.downvotes}</span>
                </button>
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <button
                  className={`action-btn like ${userLikes[post.id] ? 'active' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  👍 <span>{post.likes}</span>
                </button>
                <button
                  className={`action-btn dislike ${userLikes[post.id + '_dislike'] ? 'active' : ''}`}
                  onClick={() => handleDislike(post.id)}
                >
                  👎 <span>{post.dislikes}</span>
                </button>
                <button
                  className="action-btn comment"
                  onClick={() => toggleComments(post.id)}
                >
                  💬 <span>{post.comments}</span>
                </button>
                <button
                  className="action-btn share"
                  onClick={() => handleShare(post.id)}
                >
                  🔗 <span>{post.shares}</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="comments-section">
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="comment-field"
                      value={commentTexts[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCommentSubmit(post.id);
                        }
                      }}
                    />
                    <button 
                      className="comment-submit"
                      onClick={() => handleCommentSubmit(post.id)}
                    >
                      Post
                    </button>
                  </div>
                  <div className="comments-list">
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
