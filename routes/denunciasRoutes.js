const express = require('express');
const router = express.Router();
const denunciaController = require('../controllers/denunciasController');

router.post('/', denunciaController.criarDenuncia);
router.get('/', denunciaController.obterDenuncias);
router.get('/:id', denunciaController.obterDenunciaPorId);
router.delete('/:id', denunciaController.deletarDenuncia);

module.exports = router;


