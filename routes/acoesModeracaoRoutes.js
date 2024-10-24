const express = require('express');
const router = express.Router();
const acoesModeracaoController = require('../controllers/acoesModeracaoController');

router.post('/', acoesModeracaoController.createAcaoModeracao);
router.get('/', acoesModeracaoController.getAcoesModeracao);
router.get('/:id', acoesModeracaoController.getAcaoModeracaoById);
router.get('/mod/:moderador_id', acoesModeracaoController.getAcoesByModeradorId);
router.put('/:id', acoesModeracaoController.updateAcaoModeracao);
router.delete('/:id', acoesModeracaoController.deleteAcaoModeracao);

module.exports = router;


