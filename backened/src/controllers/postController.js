const Post = require('../models/post'); // lowercase 'p' for model filename 

// Create a new post
exports.createPost = async (req, res) => {
  try {
    console.log('Create post request received:', req.body);
    console.log('User from token:', req.user);
    
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Make sure we have a valid user ID from the token
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    const post = await Post.create({
      title,
      content,
      user: req.user.id, // from JWT middleware
    });

    console.log('Post created successfully:', post);
    res.status(201).json({ post });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'fullname email'); // also return author info
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'fullname email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Ensure user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Ensure user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
