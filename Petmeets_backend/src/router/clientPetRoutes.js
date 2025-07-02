const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientPetController');

router.post('/', clientController.registerClientAndPet); // POST /clients
router.get('/dashboard', clientController.listClientsWithPets);   // GET /clients
router.get('/', clientController.listClientsWithPets);   // GET /clients
router.delete('/:id', clientController.deleteClient); // Delete client
router.put('/:id', clientController.updateClient); //editar client

module.exports = router;
