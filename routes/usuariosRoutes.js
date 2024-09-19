const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/:uid/info', usuariosController.addUsuarioInfo);
router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
