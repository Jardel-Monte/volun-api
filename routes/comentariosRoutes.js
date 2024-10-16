const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentariosController');

router.post('/', comentarioController.createComentario);
router.get('/', comentarioController.getComentarios);
router.get('/:id', comentarioController.getComentarioById);
router.put('/:id', comentarioController.updateComentario);
router.delete('/:id', comentarioController.deleteComentario);

module.exports = router;