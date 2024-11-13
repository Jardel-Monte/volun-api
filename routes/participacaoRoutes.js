const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');

router.post('/', participacaoController.createParticipacao);
router.get('/', participacaoController.getParticipacoes);
router.get('/usuario/:usuario_id', participacaoController.getParticipacoesByUsuario);
router.get('/evento/:eventos_id', participacaoController.getParticipacoesByEvento);
router.get('/status/:status', participacaoController.getParticipacoesByStatus);

module.exports = router;
