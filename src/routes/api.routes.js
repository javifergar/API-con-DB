const router = require('express').Router();

const autores = require('./api/autores.routes');
const posts = require('./api/posts.routes');

router.use('/autores', autores);
router.use('/posts', posts);

module.exports = router;
