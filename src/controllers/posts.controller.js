const PostsModel = require('../models/posts.model');
const AutoresModel = require('../models/autores.model');

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
    if (!posts) {
      return res.status(404).json({ message: 'No existe post con esa id' });
    }
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el post' });
  }
};

const getPostsByAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const autor = await AutoresModel.selectAutorById(autorId);
    if (!autor) {
      return res.status(404).json({ message: 'No existe autor con esa id' });
    }
    const posts = await PostsModel.selectPostsByAutor(autorId);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Este autor no tiene posts' });
    }
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
    const post = await PostsModel.selectPostsById(postId);
    if (!post) {
      return res.status(404).json({ message: 'No existe post con esa id' });
    }
    await PostsModel.updatePost(data, postId);
    const updatedPost = await PostsModel.selectPostsById(postId);
    res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostsModel.selectPostsById(postId);
    if (!post) {
      return res.status(404).json({ message: 'No existe post con esa id' });
    }
    await PostsModel.deletePost(postId);

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error al borrar el post' });
  }
};

module.exports = { getAllPosts, getPostsById, getPostsByAutor, createPost, updatePost, deletePost };
