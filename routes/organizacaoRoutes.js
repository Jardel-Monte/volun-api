const express = require('express');
const router = express.Router();
const organizacaoController = require('../controllers/organizacaoController');

router.post('/', organizacaoController.createOrganizacao);
router.get('/', organizacaoController.getOrganizacoes);
router.get('/:id', organizacaoController.getOrganizacaoById);
router.put('/:id', organizacaoController.updateOrganizacao);
router.delete('/:id', organizacaoController.deleteOrganizacao);
router.get('/criador/:criador_id', organizacaoController.getOrganizacaoByCriadorId);


module.exports = router;

