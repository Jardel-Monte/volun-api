const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.createLogin);
router.get('/', loginController.getLogins);
router.get('/:id', loginController.getLoginById);
router.put('/:id', loginController.updateLogin);
router.delete('/:id', loginController.deleteLogin);

module.exports = router;