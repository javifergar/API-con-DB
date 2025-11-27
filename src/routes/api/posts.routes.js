const { getAllPosts, getPostsById, getPostsByAutor, createPost, updatePost, deletePost } = require('../../controllers/posts.controller');

const router = require('express').Router();

router.get('/', getAllPosts);
router.get('/:postId', getPostsById);
router.get('/autor/:autorId', getPostsByAutor);
router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);

module.exports = router;
