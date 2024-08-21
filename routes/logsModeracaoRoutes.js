const express = require('express');
const router = express.Router();
const logsModeracaoController = require('../controllers/logsModeracaoController');

router.post('/', logsModeracaoController.createLogModeracao);
router.get('/', logsModeracaoController.getLogsModeracao);
router.get('/:id', logsModeracaoController.getLogModeracaoById);
router.put('/:id', logsModeracaoController.updateLogModeracao);
router.delete('/:id', logsModeracaoController.deleteLogModeracao);

module.exports = router;

