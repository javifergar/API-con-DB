const PostsModel = require('../models/posts.model');

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostsModel.selectPosts();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los posts' });
  }
};
const getPostsById = async (req, res) => {
  try {
    const { postId } = req.params;
    const posts = await PostsModel.selectPostsById(postId);
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el post' });
  }
};
const getPostsByAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const posts = await PostsModel.selectPostsByAutor(autorId);
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el post' });
  }
};
const createPost = async (req, res) => {
  try {
    const data = req.body;
    const { insertId } = await PostsModel.insertPost(data);
    const post = await PostsModel.selectPostsById(insertId);
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el post' });
  }
};
const updatePost = async (req, res) => {
  try {
    const data = req.body;
    const { postId } = req.params;
    await PostsModel.updatePost(data, postId);
    const post = await PostsModel.selectPostsById(postId);
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualiar el post' });
  }
};
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostsModel.selectPostsById(postId);
    await PostsModel.deletePost(postId);

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error al borrar el post' });
  }
};

module.exports = { getAllPosts, getPostsById, getPostsByAutor, createPost, updatePost, deletePost };
