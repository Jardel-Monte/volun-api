const express = require('express');
const router = express.Router();
const organizacaoController = require('../controllers/organizacaoController');

router.post('/', organizacaoController.createOrganizacao);
router.get('/', organizacaoController.getOrganizacoes);
router.get('/:id', organizacaoController.getOrganizacaoById);
router.put('/:id', organizacaoController.updateOrganizacao);
router.delete('/:id', organizacaoController.deleteOrganizacao);

module.exports = router;

