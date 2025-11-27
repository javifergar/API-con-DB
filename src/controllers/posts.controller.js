const PostsModel = require('../models/posts.model');

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostsModel.selectPosts();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los posts' });
  }
};
const getPostsById = async (req, res) => {};
const getPostsByAutor = async (req, res) => {};
const insertPost = async (req, res) => {};
const updatePost = async (req, res) => {};
const deletePost = async (req, res) => {};

module.exports = { getAllPosts, getPostsById, getPostsByAutor, insertPost, updatePost, deletePost };
