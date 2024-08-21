const express = require('express');
const router = express.Router();
const eventoHistoricoController = require('../controllers/eventoHistoricoController');

router.post('/', eventoHistoricoController.createEventoHistorico);
router.get('/', eventoHistoricoController.getEventosHistorico);
router.get('/:id', eventoHistoricoController.getEventoHistoricoById);
router.put('/:id', eventoHistoricoController.updateEventoHistorico);
router.delete('/:id', eventoHistoricoController.deleteEventoHistorico);

module.exports = router;

