const express = require('express');
const router = express.Router();
const eventoHistoricoController = require('../controllers/eventoHistoricoController');

// Rotas CRUD padrão
router.post('/', eventoHistoricoController.createEventosHistorico);
router.get('/', eventoHistoricoController.getAllEventosHistorico);
router.get('/:id', eventoHistoricoController.getEventosHistoricoById);
router.put('/:id', eventoHistoricoController.updateEventosHistorico);
router.delete('/:id', eventoHistoricoController.deleteEventosHistorico);
router.get('/usuario/:usuario_id', eventoHistoricoController.getEventosHistoricoByUsuarioId);
router.get('/org/:ong_id', eventoHistoricoController.getEventosHistoricoByOrgId);

module.exports = router;


