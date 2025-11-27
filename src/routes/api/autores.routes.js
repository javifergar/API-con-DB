const { getAllAutores, getAutoresById, insertAutor, updateAutor, deleteAutor, deleteAllAutor } = require('../../controllers/autores.controller');

const router = require('express').Router();

router.get('/', getAllAutores);
router.get('/:autorId', getAutoresById);
router.post('/', insertAutor);
router.put('/:autorId', updateAutor);
router.delete('/:autorId', deleteAutor);
router.delete('/all/:autorId', deleteAllAutor);

module.exports = router;
