const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/create', loginController.createUser);
router.get('/:uid', loginController.getUserByUID);
router.put('/:uid', loginController.updateUser);
router.delete('/:uid', loginController.deleteUser);

module.exports = router;