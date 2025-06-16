const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, userController.getAllUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;