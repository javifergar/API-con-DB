const db = require('../config/db');

const selectAutor = async () => {
  const [result] = await db.query('select * from autores');
  return result;
};

const selectAutorById = async (autorId) => {
  const [result] = await db.query('select * from autores where id_autor = ?', [autorId]);
  if (result.length === 0) return null;
  return result[0];
};

const insertAutor = async ({ nombre, email, imagen }) => {
  const [result] = await db.query('insert into autores (nombre, email, imagen) values (?,?,?)', [nombre, email, imagen]);
  return result;
};

const updateAutor = async ({ nombre, email, imagen }, autorId) => {
  const [result] = await db.query('update autores set nombre = ?, email = ?, imagen = ? where id_autor = ?', [nombre, email, imagen, autorId]);
  return result;
};

const deleteAutor = async (autorId) => {
  const [result] = await db.query('delete from autores where id_autor = ?', [autorId]);
  return result;
};

module.exports = { selectAutor, selectAutorById, insertAutor, updateAutor, deleteAutor };
