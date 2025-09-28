const router = require('express').Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddlware');

// Public: Get all posts
router.get('/', getPosts);

// Public: Get single post
router.get('/:id', getPostById);

// Protected: Create new post
router.post('/', verifyToken, createPost);

// Protected: Update post
router.put('/:id', verifyToken, updatePost);

// Protected: Delete post
router.delete('/:id', verifyToken, deletePost);

module.exports = router;
