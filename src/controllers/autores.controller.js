const AutoresModel = require('../models/autores.model');
const PostsModel = require('../models/posts.model');

const getAllAutores = async (req, res) => {
  try {
    const autor = await AutoresModel.selectAutor();
    res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los autor' });
  }
};
const getAutoresById = async (req, res) => {
  try {
    const { autorId } = req.params;
    const autor = await AutoresModel.selectAutorById(autorId);
    res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el autor' });
  }
};
const insertAutor = async (req, res) => {
  try {
    const data = req.body;
    const { insertId } = await AutoresModel.insertAutor(data);
    const autor = await AutoresModel.selectAutorById(insertId);
    res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el autor' });
  }
};
const updateAutor = async (req, res) => {
  try {
    const data = req.body;
    const { autorId } = req.params;
    await AutoresModel.updateAutor(data, autorId);
    const autor = await AutoresModel.selectAutorById(autorId);
    res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualiar el autor' });
  }
};
const deleteAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const autor = await AutoresModel.selectAutorById(autorId);
    const deletedPosts = await PostsModel.selectPostsByAutor(autorId);

    if (deletedPosts.length !== 0) return res.status(409).json({ message: 'No puedes borrar un autor con posts creados' });
    await AutoresModel.deleteAutor(autorId);
    res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al borrar el autor' });
  }
};

const deleteAllAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const autor = await AutoresModel.selectAutorById(autorId);
    const deletedPosts = await PostsModel.selectPostsByAutor(autorId);

    if (deletedPosts.length !== 0) PostsModel.deleteAllPosts(autorId);
    await AutoresModel.deleteAutor(autorId);
    res.json({ autor, message: 'Posts eliminados:', deletedPosts });
  } catch (error) {
    return res.status(500).json({ message: 'Error al borrar el autor' });
  }
};

module.exports = { getAllAutores, getAutoresById, insertAutor, updateAutor, deleteAutor, deleteAllAutor };
