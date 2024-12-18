const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

router.post('/', eventosController.createEvento);
router.get('/', eventosController.getEventos);
router.get('/:id', eventosController.getEventoById);
router.put('/:id', eventosController.updateEvento);
router.delete('/:id', eventosController.deleteEvento);
router.get('/ong/:ong_id', eventosController.getEventosByOngId);

module.exports = router;

