const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientPetController');

router.post('/', clientController.registerClientAndPet); // POST /clients
router.get('/dashboard', clientController.listClientsWithPets);   // GET /clients
router.get('/', clientController.listClientsWithPets);   // GET /clients

module.exports = router;
