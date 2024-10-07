const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/', enderecoController.createEndereco);
router.get('/', enderecoController.getEnderecos);
router.get('/:id', enderecoController.getEnderecoById);
router.put('/:id', enderecoController.updateEndereco);
router.delete('/:id', enderecoController.deleteEndereco);
router.get('/usuario/:usuario_id', enderecoController.getEnderecoByUsuarioId);
router.get('/org/:org_id', enderecoController.getEnderecoByOrgId);

module.exports = router;

