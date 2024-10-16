const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');

router.post('/', comentariosController.createComentario);
router.get('/', comentariosController.getComentarios);
router.get('/:id', comentariosController.getComentarioById);
router.put('/:id', comentariosController.updateComentario);
router.delete('/:id', comentariosController.deleteComentario);

module.exports = router;

