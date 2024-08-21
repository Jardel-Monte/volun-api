const express = require('express');
const router = express.Router();
const advertenciasController = require('../controllers/advertenciasController');

router.post('/', advertenciasController.createAdvertencia);
router.get('/', advertenciasController.getAdvertencias);
router.get('/:id', advertenciasController.getAdvertenciaById);
router.put('/:id', advertenciasController.updateAdvertencia);
router.delete('/:id', advertenciasController.deleteAdvertencia);

module.exports = router;
