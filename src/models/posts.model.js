const db = require('../config/db');

const selectPosts = async () => {
  const [result] = await db.query('select * from posts join autores on posts.id_autor = autores.id_autor');
  return result;
};

const selectPostsById = async (postId) => {
  const [result] = await db.query('select * from posts join autores on posts.id_autor = autores.id_autor where posts.id_post = ?', [postId]);
  if (result.length === 0) return null;
  return result[0];
};

const selectPostsByAutor = async (autorId) => {
  const [result] = await db.query('select * from posts inner join autores on posts.id_autor = autores.id_autor where autores.id_autor = ?', [autorId]);
  if (result.length === 0) return null;
  return result;
};

const insertPost = async ({ titulo, descripcion, categoria, id_autor }) => {
  const [result] = await db.query('insert into posts (titulo, descripcion, categoria, id_autor) values (?,?,?,?)', [titulo, descripcion, categoria, id_autor]);
  return result;
};

const updatePost = async ({ titulo, descripcion, categoria }, postId) => {
  const [result] = await db.query('update posts set titulo = ?, descripcion = ?, categoria = ? where id_post = ?', [titulo, descripcion, categoria, postId]);
  return result;
};

const deletePost = async (postId) => {
  const [result] = await db.query('delete from posts where id_post = ?', [postId]);
  return result;
};

module.exports = { selectPosts, selectPostsById, selectPostsByAutor, insertPost, updatePost, deletePost };
