const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');

router.post('/', participacaoController.createParticipacao);
router.get('/', participacaoController.getParticipacoes);
router.get('/usuario/:usuario_id', participacaoController.getParticipacoesByUsuario);
router.get('/evento/:evento_id', participacaoController.getParticipacoesByEvento);
router.get('/status/:status', participacaoController.getParticipacoesByStatus);
router.put('/:id', participacaoController.updateParticipacao);
router.delete('/:id', participacaoController.deleteParticipacao);

module.exports = router;
