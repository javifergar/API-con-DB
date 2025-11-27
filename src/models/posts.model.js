const db = require('../config/db');

const selectPosts = async () => {
  const [result] = await db.query('select * from posts');
  return result;
};

module.exports = { selectPosts };
